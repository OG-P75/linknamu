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
      // 가로로 긴 카드: [색 동그라미] [이름]            [클릭 수]
      className="flex w-full items-center gap-4 rounded-2xl border-[3px] border-neutral-900 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400 dark:border-neutral-100 dark:bg-neutral-800"
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 text-sm font-bold text-neutral-900 ${link.color}`}
      >
        {link.label}
      </span>
      <span className="flex-1 text-base font-semibold">{link.title}</span>
      {count !== null && (
        <span className="text-xs text-neutral-500 dark:text-neutral-400">클릭 {count.toLocaleString()}회</span>
      )}
    </a>
  );
}
