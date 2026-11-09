import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** null이면 클릭 수 집계가 꺼진 상태(DB 미연결)라 숫자를 숨깁니다. */
  count: number | null;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={`${link.title} 열기`}
      // 가로로 긴 유리(글래스) 카드: [색 동그라미] [이름]            [클릭 수]
      // 반투명 흰 배경 + 뒤를 흐리게(backdrop-blur) + 얇은 밝은 테두리 = 유리 느낌
      className="group flex w-full items-center gap-4 rounded-3xl border border-white/70 bg-white/45 px-4 py-3.5 shadow-[0_8px_24px_-12px_rgba(150,90,50,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-[0_14px_30px_-14px_rgba(150,90,50,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] dark:hover:bg-white/[0.1]"
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-stone-800 shadow-inner ring-1 ring-black/5 ${link.color}`}
      >
        {link.label}
      </span>
      <span className="flex-1 text-[1.02rem] font-semibold text-stone-800 dark:text-stone-100">{link.title}</span>
      {count !== null && (
        <span className="pr-1 text-xs tabular-nums text-stone-400 dark:text-stone-500">클릭 {count.toLocaleString()}회</span>
      )}
    </a>
  );
}
