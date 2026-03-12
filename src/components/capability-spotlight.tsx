import { TextRotate } from "@/components/ui/text-rotate"
import { outfit } from "@/lib/fonts"

const rotatingTerms = [
  "Troubleshoots",
  "Maintains",
  "Operates",
  "Trains",
]

const widestTerm = rotatingTerms.reduce((widest, term) =>
  term.length > widest.length ? term : widest
)

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

          <div className="relative inline-grid min-h-[5.35rem] shrink-0 grid-cols-1 grid-rows-1 items-center overflow-hidden rounded-[1.7rem] border border-white/[0.55] bg-[linear-gradient(135deg,rgba(208,208,214,0.72),rgba(164,164,171,0.88))] px-5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_22px_44px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:min-h-[5.95rem] sm:px-6">
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.9rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02))]" />
            <div className="invisible col-start-1 row-start-1">
              <span
                className={`${outfit.className} block whitespace-nowrap px-[0.16em] text-[clamp(2.6rem,4.15vw,4.75rem)] font-[700] leading-none tracking-[-0.055em]`}
              >
                {widestTerm}
              </span>
            </div>

            <div className="relative col-start-1 row-start-1 overflow-y-hidden overflow-x-visible px-[0.16em]">
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
                mainClassName={`${outfit.className} h-[1.06em] items-center justify-center overflow-y-hidden overflow-x-visible whitespace-nowrap px-[0.04em] text-[clamp(2.6rem,4.15vw,4.75rem)] font-[700] leading-none tracking-[-0.055em] text-white`}
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
