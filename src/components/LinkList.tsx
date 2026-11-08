"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";

type Props = { links: LinkItem[] };

export default function LinkList({ links }: Props) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/clicks")
      .then((res) => res.json())
      .then((data) => {
        setCounts(data.counts ?? {});
        setEnabled(Boolean(data.enabled));
      })
      .catch(() => setEnabled(false));
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
    <ul className="flex flex-col gap-4">
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
