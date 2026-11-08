import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

declare global {
  // 개발 모드의 핫 리로드 중에도 연결을 재사용하기 위한 전역 캐시
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/** MONGODB_URI가 없으면 null을 반환해 DB 없이도 화면은 동작하게 합니다. */
export async function getClicksCollection() {
  if (!uri) return null;

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      global._mongoClientPromise = undefined;
      throw err;
    });
  }

  const client = await global._mongoClientPromise;
  return client.db(dbName).collection<{ _id: string; count: number }>("clicks");
}
