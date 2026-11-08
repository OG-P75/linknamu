import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";
import type { LinkItem } from "@/data/profile";

// ───────────────────────────────────────────────
// 화면 확인용 더미(가짜) 데이터입니다.
// 진짜 내용을 채울 때는 아래 값을 바꾸거나,
// src/data/profile.ts 에 저장해 둔 실제 값을 불러오도록 바꾸면 됩니다.
// ───────────────────────────────────────────────
const dummyProfile = {
  name: "홍길동",
  bio: "여기에 나를 소개하는 한 줄이 들어갑니다",
  image: "/profile.svg", // public 폴더의 임시 그림
};

// id는 클릭 수를 세는 이름표라서 github / instagram / blog 를 그대로 둡니다.
const dummyLinks: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com/",
    label: "GH",
    color: "bg-rose-200 dark:bg-rose-300",
  },
  {
    id: "instagram",
    title: "Instagram",
    url: "https://www.instagram.com/",
    label: "IG",
    color: "bg-emerald-200 dark:bg-emerald-300",
  },
  {
    id: "blog",
    title: "Blog",
    url: "https://example.com/",
    label: "B",
    color: "bg-amber-200 dark:bg-amber-300",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-8">
      {/* 와이어프레임의 둥근 테두리 카드 */}
      <section className="relative w-full max-w-sm rounded-[2.5rem] border-[3px] border-neutral-900 bg-white px-6 pb-12 pt-14 shadow-xl dark:border-neutral-100 dark:bg-neutral-900 sm:px-8">
        {/* 오른쪽 위: 다크모드 버튼 */}
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>

        {/* 위쪽: 원형 프로필 사진 + 이름 + 한 줄 소개 */}
        <ProfileHeader {...dummyProfile} />

        {/* 아래쪽: 링크 카드 3개 (세로) */}
        <div className="mt-10">
          <LinkList links={dummyLinks} />
        </div>
      </section>
    </main>
  );
}
