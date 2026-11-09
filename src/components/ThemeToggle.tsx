"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-sm backdrop-blur-xl transition duration-300 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]"
    >
      {/* 첫 렌더에서는 아이콘을 비워 서버/클라이언트 불일치를 막습니다 */}
      <span aria-hidden>{dark === null ? "" : dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
