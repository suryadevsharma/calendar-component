import Image from 'next/image';

export function HeroImage() {
  return (
    <div className="relative w-full min-h-[16rem] md:min-h-screen md:h-full md:w-[45%] lg:w-[40%] xl:w-[35%] overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] shrink-0 self-stretch">
      <Image
        src="/hero_image_v2.png"
        alt="Calendar Hero"
        fill
        sizes="(max-width: 768px) 100vw, 45vw"
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden pointer-events-none" />
      <div className="absolute inset-0 md:bg-gradient-to-r md:from-black/10 md:via-transparent md:to-transparent pointer-events-none" />
    </div>
  );
}
