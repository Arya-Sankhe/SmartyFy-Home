"use client"

import { useEffect, useRef, useState } from "react"

import { TextRotate } from "@/components/ui/text-rotate"
import { brandSans } from "@/lib/fonts"

const rotatingTerms = [
  "Troubleshoots",
  "Maintains",
  "Operates",
  "Trains",
]

export function CapabilitySpotlight() {
  const measureRef = useRef<HTMLDivElement>(null)
  const shrinkTimeoutRef = useRef<number | null>(null)
  const [termWidths, setTermWidths] = useState<Record<string, number>>({})
  const [sizingIndex, setSizingIndex] = useState(0)

  useEffect(() => {
    const measureTerms = () => {
      if (!measureRef.current) return

      const widths = Array.from(
        measureRef.current.querySelectorAll<HTMLElement>("[data-term]")
      ).reduce<Record<string, number>>((result, node) => {
        const term = node.dataset.term

        if (term) {
          result[term] = Math.ceil(node.offsetWidth)
        }

        return result
      }, {})

      setTermWidths(widths)
    }

    measureTerms()
    window.addEventListener("resize", measureTerms)

    return () => {
      window.removeEventListener("resize", measureTerms)

      if (shrinkTimeoutRef.current) {
        window.clearTimeout(shrinkTimeoutRef.current)
      }
    }
  }, [])

  const handleNext = (index: number) => {
    const nextTerm = rotatingTerms[index]
    const currentTerm = rotatingTerms[sizingIndex]
    const nextWidth = termWidths[nextTerm] ?? 0
    const currentWidth = termWidths[currentTerm] ?? 0

    if (shrinkTimeoutRef.current) {
      window.clearTimeout(shrinkTimeoutRef.current)
    }

    if (nextWidth >= currentWidth) {
      setSizingIndex(index)
      return
    }

    shrinkTimeoutRef.current = window.setTimeout(() => {
      setSizingIndex(index)
    }, 380)
  }

  return (
    <section
      id="capabilities"
      className="relative -mt-px overflow-hidden bg-white text-[#17171c]"
    >
      <div className="relative mx-auto flex min-h-[38vh] max-w-7xl items-center justify-center px-6 py-20 sm:px-8 md:min-h-[44vh] md:py-28">
        <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:flex-nowrap md:gap-2">
          <p
            className={`${brandSans.className} whitespace-nowrap text-[clamp(2.7rem,4.5vw,5.4rem)] font-[800] leading-[0.92] tracking-[-0.04em] text-[#17171c]`}
          >
            Machine Intelligence That
          </p>

          <div className="relative inline-grid min-h-[5.15rem] shrink-0 grid-cols-1 grid-rows-1 items-center overflow-hidden rounded-[1.55rem] border border-white/[0.52] bg-[linear-gradient(135deg,rgba(208,208,214,0.72),rgba(164,164,171,0.88))] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_22px_44px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:min-h-[5.75rem] sm:px-4">
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.55rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08)_34%,rgba(255,255,255,0.02))]" />
            <div className="invisible col-start-1 row-start-1">
              <span
                className={`${brandSans.className} block whitespace-nowrap px-[0.12em] text-[clamp(2.6rem,4.15vw,4.75rem)] font-[800] leading-none tracking-[-0.025em]`}
              >
                {rotatingTerms[sizingIndex]}
              </span>
            </div>

            <div className="relative col-start-1 row-start-1 overflow-y-hidden overflow-x-visible px-[0.12em]">
              <TextRotate
                texts={rotatingTerms}
                onNext={handleNext}
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
                mainClassName={`${brandSans.className} h-[1.04em] items-center justify-center overflow-y-hidden overflow-x-visible whitespace-nowrap px-[0.03em] text-[clamp(2.6rem,4.15vw,4.75rem)] font-[800] leading-none tracking-[-0.025em] text-white`}
                splitLevelClassName="w-full items-center justify-center px-[0.02em]"
                elementLevelClassName="inline-block"
              />
            </div>
          </div>
        </div>

        <div
          ref={measureRef}
          className="pointer-events-none absolute left-0 top-0 -z-10 opacity-0"
          aria-hidden="true"
        >
          {rotatingTerms.map((term) => (
            <span
              key={term}
              data-term={term}
              className={`${brandSans.className} block whitespace-nowrap px-[0.12em] text-[clamp(2.6rem,4.15vw,4.75rem)] font-[800] leading-none tracking-[-0.025em]`}
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
