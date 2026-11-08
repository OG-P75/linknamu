import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { linkIds } from "@/data/profile";

export const dynamic = "force-dynamic";

/** 링크별 클릭 수 조회: { counts: { [id]: number }, enabled: boolean } */
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    if (!clicks) return NextResponse.json({ counts: {}, enabled: false });

    const docs = await clicks.find({ _id: { $in: Array.from(linkIds) } }).toArray();
    const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
    return NextResponse.json({ counts, enabled: true });
  } catch (err) {
    console.error("[clicks] GET failed", err);
    return NextResponse.json({ counts: {}, enabled: false }, { status: 500 });
  }
}

/** 클릭 1회 기록: body { id: string } */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    if (!clicks) return NextResponse.json({ ok: false, enabled: false });

    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ ok: true, count: doc?.count ?? 1 });
  } catch (err) {
    console.error("[clicks] POST failed", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
