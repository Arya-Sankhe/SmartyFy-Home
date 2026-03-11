"use client"

import { Button } from "@/components/ui/button"

interface HeroProps {
  title: string
  ctaLabel?: string
  ctaHref?: string
}

export function Hero({
  title,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto w-full overflow-hidden
      h-screen
      bg-[linear-gradient(to_bottom,#fff,#ffffff_50%,#e8e8e8_88%)]  
      dark:bg-[linear-gradient(to_bottom,#000,#0000_30%,#898e8e_78%,#ffffff_99%_50%)] 
      rounded-b-xl"
    >
      {/* Grid BG */}
      <div
        className="absolute -z-10 inset-0 opacity-80 h-[600px] w-full 
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)]
        bg-[size:6rem_5rem] 
        [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Radial Accent — top of the circle sits at ~72% down the screen */}
      <div
        className="absolute left-1/2 top-[72%]
        h-[800px] w-[700px] md:w-[1200px] lg:w-[150%] lg:h-[1000px]
        -translate-x-1/2 rounded-[100%]
        bg-[radial-gradient(closest-side,#fff_82%,#000000)] 
        dark:bg-[radial-gradient(closest-side,#000_82%,#ffffff)] 
        animate-fade-up"
      />

      {/* Content: title + button, in upper ~55% of screen */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-8 pt-[15vh] gap-10">
        <h1
          className="animate-fade-in text-balance font-sans
          bg-gradient-to-br from-black from-30% to-black/40 
          bg-clip-text text-5xl font-bold leading-none tracking-tighter 
          text-transparent sm:text-6xl md:text-7xl lg:text-8xl 
          dark:from-white dark:to-white/40"
        >
          {title}
        </h1>

        {ctaLabel && (
          <Button
            className="w-fit md:w-52 font-sans tracking-tighter text-center text-lg"
            render={<a href={ctaHref} />}
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </section>
  )
}
