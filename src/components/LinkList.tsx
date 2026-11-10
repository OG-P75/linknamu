"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = { links: LinkItem[] };

/** 클릭 수를 다시 불러오는 간격 (10초) */
const REFRESH_MS = 10_000;

export default function LinkList({ links }: Props) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // DB에서 최신 클릭 수를 가져옵니다. (다른 기기에서 누른 클릭도 반영됨)
    const loadCounts = () => {
      fetch("/api/clicks", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (cancelled) return;
          setCounts(data.counts ?? {});
          setEnabled(Boolean(data.enabled));
        })
        .catch(() => {
          // 잠깐 네트워크가 끊겨도 마지막으로 보던 숫자는 그대로 둡니다.
        });
    };

    // 1) 페이지를 열 때 한 번
    loadCounts();

    // 2) 화면을 보고 있는 동안 10초마다
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") loadCounts();
    }, REFRESH_MS);

    // 3) 다른 앱/탭에 갔다가 돌아왔을 때 바로
    const onVisible = () => {
      if (document.visibilityState === "visible") loadCounts();
    };
    document.addEventListener("visibilitychange", onVisible);

    // 컴포넌트가 사라질 때 타이머와 이벤트를 정리합니다.
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const handleClick = (id: string) => {
    if (enabled) {
      setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    }
    // 새 탭으로 이동해도 요청이 끊기지 않도록 keepalive 사용
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    // 카드를 위에서 아래로 세로로 쌓습니다 (flex-col)
    <ul className="flex flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id} className="w-full">
          <LinkCard
            link={link}
            count={enabled ? (counts[link.id] ?? 0) : null}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
