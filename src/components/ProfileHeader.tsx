import Image from "next/image";
import { Kaushan_Script } from "next/font/google";

// 이름에만 쓰는 손글씨 폰트: 붓으로 힘 있게 흘려 쓴 느낌의 영문 스크립트체
const nameFont = Kaushan_Script({ weight: "400", subsets: ["latin"], display: "swap" });

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 원형 프로필 사진: 흰 테두리 + 아래로 떨어지는 부드러운 그림자로 입체감을 줍니다 */}
      <div className="rounded-full bg-white/70 p-[3px] shadow-[0_18px_40px_-12px_rgba(160,90,50,0.45)] ring-1 ring-white/80 backdrop-blur dark:bg-white/10 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] dark:ring-white/15">
        <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32">
          <Image
            src={image}
            alt={`${name} 프로필 사진`}
            fill
            priority
            sizes="128px"
            className="object-cover"
          />
          {/* 위쪽에 아주 옅은 빛을 얹어 둥근 느낌을 살립니다 */}
          <div aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent" />
        </div>
      </div>

      <h1
        className={`${nameFont.className} mt-6 text-[2.75rem] leading-tight text-stone-900 dark:text-stone-50 sm:text-5xl`}
      >
        {name}
      </h1>
      <p className="mt-2 text-[1.05rem] font-medium text-stone-500 dark:text-stone-400 sm:text-lg">{bio}</p>
    </header>
  );
}
