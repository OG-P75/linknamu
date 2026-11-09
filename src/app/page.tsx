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
  name: "OG-P75",
  bio: "세상을 이롭게 하는 아이디어",
  image: "/pf.png", // public 폴더의 내 프로필 사진
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
    id: "blog", // 클릭 수 집계용 이름표라 그대로 둡니다 (화면에는 Email로 보임)
    title: "Email",
    url: "mailto:paranslol@gmail.com",
    label: "@",
    color: "bg-amber-200 dark:bg-amber-300",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh justify-center overflow-hidden px-6 pb-16 pt-20 sm:pt-24">
      {/* 배경 장식: 흐릿한 빛 번짐 (유리 카드가 더 유리처럼 보이게 해 줍니다) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-6rem] h-72 w-72 rounded-full bg-rose-200/40 blur-3xl dark:bg-rose-900/15"
      />

      {/* 오른쪽 위: 다크모드 버튼 */}
      <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      <section className="relative w-full max-w-[26rem]">
        {/* 위쪽: 원형 프로필 사진 + 이름 + 한 줄 소개 */}
        <ProfileHeader {...dummyProfile} />

        {/* 아래쪽: 링크 카드 (세로) */}
        <div className="mt-12">
          <LinkList links={dummyLinks} />
        </div>
      </section>
    </main>
  );
}
