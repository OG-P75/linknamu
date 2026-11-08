// 프로필과 링크 정보는 이 파일 하나만 고치면 화면에 반영됩니다.

export type LinkItem = {
  /** 클릭 수 집계에 쓰는 고유 ID (영문 소문자, 숫자, -) */
  id: string;
  title: string;
  url: string;
  /** 원형 버튼 안에 표시할 짧은 글자 */
  label: string;
  /** 원형 버튼 배경색 (Tailwind 클래스) */
  color: string;
};

export const profile = {
  name: "OG - P75",
  bio: "세상을 더 이롭게 하는 아이디어",
  image: "/pf.png",
};

export const links: LinkItem[] = [
  {
    id: "instagram",
    title: "Instagram",
    url: "https://www.instagram.com/ogreenlol",
    label: "IG",
    color: "bg-rose-200 dark:bg-rose-300",
  },
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com/OG-P75",
    label: "GH",
    color: "bg-emerald-200 dark:bg-emerald-300",
  },
  {
    id: "blog",
    title: "Blog",
    url: "https://velog.io/",
    label: "B",
    color: "bg-amber-200 dark:bg-amber-300",
  },
];

export const linkIds = new Set(links.map((link) => link.id));
