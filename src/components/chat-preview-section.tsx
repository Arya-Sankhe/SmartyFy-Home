"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { brandSans, inter } from "@/lib/fonts"

const manufacturerBullets = [
  {
    title: "Film Slippage (displayed value)",
    content:
      "The Home Screen shows Film Slippage and Act Diameter so you can monitor slippage vs. set bag length (Page 32, Page 35).",
  },
  {
    title: "Probable causes: film roll misalignment",
    content:
      "If the roll is off-center it will track poorly and slip (Page 20).",
  },
  {
    title: "Probable causes: incorrect film tension / slipping pull belts",
    content:
      "Loose or slipping pull belts cause inconsistent pulling and bag length errors (Page 20).",
  },
  {
    title: "Probable causes: dirty/worn pull belts or registration sensor",
    content:
      "Contaminated pull belts or a dirty registration/photo-eye lens cause tracking errors and slippage (Page 20).",
  },
  {
    title: "Corrective action: re-center the film roll",
    content:
      "Re-center the roll on the spindle to correct misalignment (Page 20).",
  },
  {
    title: "Corrective action: adjust tension / dancer arm",
    content:
      "Increase or adjust film tension or modify the dancer arm settings to remove slack (Page 20).",
  },
]

const introText =
  "Film slippage (film slipping) is usually caused by film tension, worn or dirty pull components, misaligned rolls, or bad splices. The manual documents the fault indicators on the Home Screen and gives specific causes and corrective actions you should run through before calling service."
const headingText = "Manufacturer's Solution"

const STREAM_STEP_MS = 28
const STREAM_RESET_MS = 2600
const INTRO_PAUSE_FRAMES = 8
const HEADING_PAUSE_FRAMES = 7
const BULLET_PAUSE_FRAMES = 6

interface StreamFrame {
  introCount: number
  headingCount: number
  bulletsVisible: number
  bulletWordCounts: number[]
}

export function ChatPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)

  const introWords = useMemo(() => introText.split(" "), [])
  const headingWords = useMemo(() => headingText.split(" "), [])
  const bulletWordLists = useMemo(
    () => manufacturerBullets.map((bullet) => bullet.content.split(" ")),
    []
  )

  const timeline = useMemo<StreamFrame[]>(() => {
    const zeroCounts = manufacturerBullets.map(() => 0)
    const frames: StreamFrame[] = [
      {
        introCount: 0,
        headingCount: 0,
        bulletsVisible: 0,
        bulletWordCounts: [...zeroCounts],
      },
    ]

    for (let index = 1; index <= introWords.length; index += 1) {
      frames.push({
        introCount: index,
        headingCount: 0,
        bulletsVisible: 0,
        bulletWordCounts: [...zeroCounts],
      })
    }

    for (let index = 0; index < INTRO_PAUSE_FRAMES; index += 1) {
      frames.push({
        introCount: introWords.length,
        headingCount: 0,
        bulletsVisible: 0,
        bulletWordCounts: [...zeroCounts],
      })
    }

    for (let index = 1; index <= headingWords.length; index += 1) {
      frames.push({
        introCount: introWords.length,
        headingCount: index,
        bulletsVisible: 0,
        bulletWordCounts: [...zeroCounts],
      })
    }

    for (let index = 0; index < HEADING_PAUSE_FRAMES; index += 1) {
      frames.push({
        introCount: introWords.length,
        headingCount: headingWords.length,
        bulletsVisible: 0,
        bulletWordCounts: [...zeroCounts],
      })
    }

    const completedCounts = [...zeroCounts]

    bulletWordLists.forEach((bulletWords, bulletIndex) => {
      for (let wordIndex = 1; wordIndex <= bulletWords.length; wordIndex += 1) {
        const nextCounts = [...completedCounts]
        nextCounts[bulletIndex] = wordIndex

        frames.push({
          introCount: introWords.length,
          headingCount: headingWords.length,
          bulletsVisible: bulletIndex + 1,
          bulletWordCounts: nextCounts,
        })
      }

      completedCounts[bulletIndex] = bulletWords.length

      for (let pauseIndex = 0; pauseIndex < BULLET_PAUSE_FRAMES; pauseIndex += 1) {
        frames.push({
          introCount: introWords.length,
          headingCount: headingWords.length,
          bulletsVisible: bulletIndex + 1,
          bulletWordCounts: [...completedCounts],
        })
      }
    })

    const resetFrames = Math.max(1, Math.round(STREAM_RESET_MS / STREAM_STEP_MS))

    for (let index = 0; index < resetFrames; index += 1) {
      frames.push({
        introCount: introWords.length,
        headingCount: headingWords.length,
        bulletsVisible: manufacturerBullets.length,
        bulletWordCounts: [...completedCounts],
      })
    }

    return frames
  }, [bulletWordLists, headingWords, introWords])

  const frame = timeline[currentFrame] ?? timeline[0]

  useEffect(() => {
    if (timeline.length <= 1) return

    const intervalId = window.setInterval(() => {
      setCurrentFrame((current) => (current + 1) % timeline.length)
    }, STREAM_STEP_MS)

    return () => window.clearInterval(intervalId)
  }, [timeline])

  useEffect(() => {
    if (!scrollRef.current) return

    if (currentFrame === 0) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "auto",
      })
      return
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [currentFrame])

  return (
    <section className="relative overflow-hidden bg-white text-[#17171c]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 md:py-28 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-center">
        <div className="space-y-3">
          <h2
            className={`${brandSans.className} text-balance text-[clamp(3.5rem,7.8vw,7rem)] font-[800] leading-[0.9] tracking-[-0.055em] text-[#17171c]`}
          >
            <span className="block">Stop Guessing.</span>
            <span className="mt-2 block bg-gradient-to-r from-[#17171c] via-[#3156d8] to-[#6c7cc0] bg-clip-text text-transparent">
              Let It Guide You.
            </span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute inset-x-8 inset-y-10 rounded-[2.2rem] bg-[radial-gradient(circle,rgba(58,89,198,0.16),transparent_68%)] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,242,246,0.92))] p-3 shadow-[0_30px_90px_rgba(17,23,28,0.12)] backdrop-blur-xl sm:p-4">
            <div className="overflow-hidden rounded-[1.65rem] border border-white/70 bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
              <div
                className={`${inter.className} flex h-[440px] flex-col bg-[#fbfbfc] sm:h-[520px]`}
              >
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
                >
                  <div className="mb-6 flex justify-end">
                    <div className="max-w-[72%] rounded-[1.2rem] bg-[#f2f2f3] px-4 py-3 text-[0.92rem] leading-7 text-[#17171c] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:text-[0.95rem]">
                      How do I fix film slipping?
                    </div>
                  </div>

                  <div className="space-y-5 text-[0.9rem] leading-7 text-[#20242d] sm:text-[0.96rem]">
                    <p>
                      {introWords.slice(0, frame.introCount).join(" ")}
                      {frame.introCount < introWords.length && (
                        <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                      )}
                    </p>

                    {(frame.headingCount > 0 || frame.bulletsVisible > 0) && (
                      <div>
                        <h3
                          className={`${inter.className} text-[1.08rem] font-[700] tracking-[-0.02em] text-[#17171c] sm:text-[1.14rem]`}
                        >
                          {headingWords.slice(0, frame.headingCount).join(" ")}
                          {frame.headingCount < headingWords.length && (
                            <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                          )}
                        </h3>

                        {frame.bulletsVisible > 0 && (
                          <ul className="mt-4 space-y-3 pl-5">
                            {manufacturerBullets
                              .slice(0, frame.bulletsVisible)
                              .map((bullet, index) => (
                                <li key={bullet.title} className="pl-1">
                                  <span className="font-[700] text-[#17171c]">
                                    {bullet.title}
                                  </span>{" "}
                                  —{" "}
                                  {bullet.content
                                    .split(" ")
                                    .slice(0, frame.bulletWordCounts[index])
                                    .join(" ")}
                                  {index === frame.bulletsVisible - 1 &&
                                    frame.bulletWordCounts[index] <
                                      bullet.content.split(" ").length && (
                                      <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                                    )}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
