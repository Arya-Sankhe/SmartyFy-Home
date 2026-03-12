import { Outfit } from "next/font/google"

import { TextRotate } from "@/components/ui/text-rotate"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
})

const rotatingTerms = [
  "Troubleshoots",
  "Maintains",
  "Operates",
  "Trains",
]

export function CapabilitySpotlight() {
  return (
    <section
      id="capabilities"
      className="relative -mt-px overflow-hidden bg-white text-[#17171c]"
    >
      <div className="relative mx-auto flex min-h-[38vh] max-w-7xl items-center justify-center px-6 py-20 sm:px-8 md:min-h-[44vh] md:py-28">
        <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:flex-nowrap md:gap-6">
          <p
            className={`${outfit.className} whitespace-nowrap text-[clamp(2.7rem,4.5vw,5.4rem)] font-[800] leading-[0.92] tracking-[-0.07em] text-[#17171c]`}
          >
            Machine Intelligence That
          </p>

          <div className="relative flex min-h-[5.8rem] min-w-[18rem] items-center justify-center overflow-hidden rounded-[1.9rem] border border-white/[0.55] bg-[linear-gradient(135deg,rgba(202,202,208,0.78),rgba(160,160,168,0.9))] px-8 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_22px_44px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:min-h-[6.5rem] sm:min-w-[21rem] sm:px-10 md:min-w-[24rem] lg:min-w-[26rem]">
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.9rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02))]" />
            <div className="relative overflow-y-hidden overflow-x-visible px-[0.18em]">
              <TextRotate
                texts={rotatingTerms}
                rotationInterval={2200}
                splitBy="words"
                staggerDuration={0}
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-115%", opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.85,
                }}
                mainClassName={`${outfit.className} h-[1.06em] items-center justify-center overflow-y-hidden overflow-x-visible whitespace-nowrap px-[0.12em] text-[clamp(2.6rem,4.15vw,4.75rem)] font-[700] leading-none tracking-[-0.055em] text-white`}
                splitLevelClassName="w-full items-center justify-center px-[0.02em]"
                elementLevelClassName="inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
