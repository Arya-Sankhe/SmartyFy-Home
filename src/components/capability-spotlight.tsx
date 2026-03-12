import { TextRotate } from "@/components/ui/text-rotate"

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
      <div className="relative mx-auto flex min-h-[38vh] max-w-6xl items-center justify-center px-6 py-20 sm:px-8 md:min-h-[44vh] md:py-28">
        <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:gap-6">
          <p className="text-balance text-[clamp(2.75rem,6.8vw,6.1rem)] font-light leading-none tracking-[-0.09em] text-[#17171c]">
            Machine Intelligence That
          </p>

          <div className="flex min-h-[5.25rem] min-w-[14rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-[#9a9aa0] px-7 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_18px_40px_rgba(0,0,0,0.08)] sm:min-h-[6rem] sm:min-w-[16rem] sm:px-10 md:min-w-[18rem]">
            <div className="overflow-y-hidden overflow-x-visible px-[0.08em]">
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
                mainClassName="h-[1.08em] items-center justify-center overflow-y-hidden overflow-x-visible whitespace-nowrap px-[0.05em] text-[clamp(2.35rem,5.6vw,5rem)] font-light leading-none tracking-[-0.075em] text-white"
                splitLevelClassName="w-full items-center justify-center"
                elementLevelClassName="inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
