import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 원형 프로필 사진 (rounded-full 이 사진을 동그랗게 자릅니다) */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-neutral-900 shadow-md dark:border-neutral-100 sm:h-32 sm:w-32">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          fill
          priority
          sizes="128px"
          className="object-cover"
        />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-wide sm:text-3xl">{name}</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 sm:text-base">{bio}</p>
    </header>
  );
}
