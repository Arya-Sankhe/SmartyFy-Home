import { TextRotate } from "@/components/ui/text-rotate"

const rotatingTerms = [
  "manuals",
  "charts",
  "diagrams",
  "tables",
  "notes",
]

export function CapabilitySpotlight() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-[#efefef] text-[#17171c]"
    >
      <div className="relative mx-auto flex min-h-[38vh] max-w-6xl items-center justify-center px-6 py-20 sm:px-8 md:min-h-[44vh] md:py-28">
        <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:gap-7">
          <p className="text-balance text-[clamp(3rem,8vw,6.75rem)] font-light leading-none tracking-[-0.09em] text-[#17171c]">
            Ask about
          </p>

          <div className="flex min-h-[5.25rem] min-w-[8.5rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-[#d9d9d9] px-6 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_18px_40px_rgba(0,0,0,0.08)] sm:min-h-[6rem] sm:min-w-[10rem] sm:px-8">
            <div className="overflow-hidden">
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
                mainClassName="h-[1.08em] items-center justify-center overflow-hidden whitespace-nowrap text-[clamp(3rem,7.4vw,6.5rem)] font-light leading-none tracking-[-0.09em] text-[#17171c]"
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
