"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"

import { brandSans, inter } from "@/lib/fonts"

interface ConversationBullet {
  title: string
  content: string
}

interface ConversationSection {
  heading: string
  bullets: ConversationBullet[]
}

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
    title: "Probable causes: forming tube contamination",
    content:
      "Oil or seasoning buildup on the forming tube can produce uneven drag and tracking or slip problems (Page 28).",
  },
  {
    title: "Probable causes: bad splice",
    content:
      "A poor splice that is not straight or not fully taped can jam or slip when passing the forming tube (Page 20).",
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
  {
    title: "Corrective action: clean pull belts and registration sensor lens",
    content:
      "Remove debris and film residue from belts and clean the photo-eye lens (Page 20).",
  },
  {
    title: "Corrective action: clean forming tube / replace worn belts",
    content:
      "Clean oil or seasoning from the forming tube and replace worn pull belts if necessary (Page 28).",
  },
  {
    title: "Corrective action: check and redo splice",
    content:
      "Cut and splice correctly using splicing tape; ensure splice is straight and taped across both edges (Page 20).",
  },
  {
    title: "Procedure reminders for roll changeover",
    content:
      "Safely cut expiring film, load new roll, use splicing tape, clear the Film End error, and verify the splice passes cleanly before resuming production (Page 20).",
  },
]

const nextStepsBullets = [
  {
    title: "Stop the machine",
    content: "Work safely with lockout or tagout as required.",
  },
  {
    title: "Visually inspect and re-center the film roll",
    content:
      "Use Home Screen Act Diameter and Film Slippage to confirm improvement while re-centering the roll on the spindle (Page 32, Page 35).",
  },
  {
    title: "Clean the pull belts and photo-eye lens",
    content:
      "Inspect belts for wear or glazing and replace belts if worn (Page 20, Page 28).",
  },
  {
    title: "Clean the forming tube",
    content:
      "Remove oil or seasoning residue that can cause uneven drag (Page 28).",
  },
  {
    title: "Adjust film tension / dancer arm settings",
    content:
      "Re-run at low speed to check tracking after the adjustment (Page 20).",
  },
  {
    title: "Check the splice",
    content:
      "Verify straightness and full edge taping, redo the splice if needed, and confirm it passes the forming tube cleanly (Page 20).",
  },
  {
    title: "Monitor Film Slippage and Act Diameter",
    content:
      "Watch the Home Screen while testing and run several pouches at production speed once the machine is stable (Page 32, Page 35).",
  },
  {
    title: "If the problem persists",
    content:
      "Replace suspect pull belts, document the maintenance action, and contact service if slippage continues after these steps.",
  },
]

const introText =
  "Film slippage (film slipping) is usually caused by film tension, worn or dirty pull components, misaligned rolls, or bad splices. The manual documents the fault indicators on the Home Screen and gives specific causes and corrective actions you should run through before calling service."
const outroText =
  "If you want, tell me what you see on the Home Screen Film Slippage value and whether belts or the forming tube look dirty. I can give a prioritized checklist tuned to your symptoms."

const conversationSections: ConversationSection[] = [
  {
    heading: "Manufacturer's Solution",
    bullets: manufacturerBullets,
  },
  {
    heading: "Next Steps",
    bullets: nextStepsBullets,
  },
]

const STREAM_STEP_MS = 28
const STREAM_RESET_MS = 2600
const INTRO_PAUSE_FRAMES = 8
const HEADING_PAUSE_FRAMES = 7
const BULLET_PAUSE_FRAMES = 6
const FLOWCHART_HOLD_FRAMES = 18
const OUTRO_PAUSE_FRAMES = 10

interface StreamFrame {
  introCount: number
  sectionHeadingCounts: number[]
  sectionBulletsVisible: number[]
  sectionBulletWordCounts: number[][]
  showFlowchartImage: boolean
  outroCount: number
}

export function ChatPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)

  const introWords = useMemo(() => introText.split(" "), [])
  const outroWords = useMemo(() => outroText.split(" "), [])
  const sectionHeadingWords = useMemo(
    () => conversationSections.map((section) => section.heading.split(" ")),
    []
  )
  const sectionBulletWordLists = useMemo(
    () =>
      conversationSections.map((section) =>
        section.bullets.map((bullet) => bullet.content.split(" "))
      ),
    []
  )

  const timeline = useMemo<StreamFrame[]>(() => {
    const headingCounts = conversationSections.map(() => 0)
    const bulletsVisible = conversationSections.map(() => 0)
    const bulletWordCounts = sectionBulletWordLists.map((section) =>
      section.map(() => 0)
    )
    const frames: StreamFrame[] = []
    let introCount = 0
    let showFlowchartImage = false
    let outroCount = 0

    const pushFrame = () => {
      frames.push({
        introCount,
        sectionHeadingCounts: [...headingCounts],
        sectionBulletsVisible: [...bulletsVisible],
        sectionBulletWordCounts: bulletWordCounts.map((section) => [...section]),
        showFlowchartImage,
        outroCount,
      })
    }

    pushFrame()

    for (let index = 1; index <= introWords.length; index += 1) {
      introCount = index
      pushFrame()
    }

    for (let index = 0; index < INTRO_PAUSE_FRAMES; index += 1) {
      pushFrame()
    }

    conversationSections.forEach((section, sectionIndex) => {
      const headingWords = sectionHeadingWords[sectionIndex]

      for (let index = 1; index <= headingWords.length; index += 1) {
        headingCounts[sectionIndex] = index
        pushFrame()
      }

      for (let index = 0; index < HEADING_PAUSE_FRAMES; index += 1) {
        pushFrame()
      }

      sectionBulletWordLists[sectionIndex].forEach((bulletWords, bulletIndex) => {
        bulletsVisible[sectionIndex] = bulletIndex + 1

        for (let wordIndex = 1; wordIndex <= bulletWords.length; wordIndex += 1) {
          bulletWordCounts[sectionIndex][bulletIndex] = wordIndex
          pushFrame()
        }

        for (let pauseIndex = 0; pauseIndex < BULLET_PAUSE_FRAMES; pauseIndex += 1) {
          pushFrame()
        }
      })
    })

    showFlowchartImage = true
    for (let frameIndex = 0; frameIndex < FLOWCHART_HOLD_FRAMES; frameIndex += 1) {
      pushFrame()
    }

    for (let index = 1; index <= outroWords.length; index += 1) {
      outroCount = index
      pushFrame()
    }

    for (let index = 0; index < OUTRO_PAUSE_FRAMES; index += 1) {
      pushFrame()
    }

    const resetFrames = Math.max(1, Math.round(STREAM_RESET_MS / STREAM_STEP_MS))

    for (let index = 0; index < resetFrames; index += 1) {
      pushFrame()
    }

    return frames
  }, [introWords, outroWords, sectionBulletWordLists, sectionHeadingWords])

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

                    {conversationSections.map((section, sectionIndex) => {
                      const headingWords = sectionHeadingWords[sectionIndex]
                      const visibleBullets = frame.sectionBulletsVisible[sectionIndex]
                      const headingCount = frame.sectionHeadingCounts[sectionIndex]
                      const showSection = headingCount > 0 || visibleBullets > 0

                      if (!showSection) return null

                      return (
                        <div key={section.heading}>
                          <h3
                            className={`${inter.className} text-[1.08rem] font-[700] tracking-[-0.02em] text-[#17171c] sm:text-[1.14rem]`}
                          >
                            {headingWords.slice(0, headingCount).join(" ")}
                            {headingCount < headingWords.length && (
                              <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                            )}
                          </h3>

                          {visibleBullets > 0 && (
                            <ul className="mt-4 space-y-3 pl-5">
                              {section.bullets
                                .slice(0, visibleBullets)
                                .map((bullet, bulletIndex) => {
                                  const bulletWords =
                                    sectionBulletWordLists[sectionIndex][bulletIndex]
                                  const visibleWordCount =
                                    frame.sectionBulletWordCounts[sectionIndex][bulletIndex]

                                  return (
                                    <li key={bullet.title} className="pl-1">
                                      <span className="font-[700] text-[#17171c]">
                                        {bullet.title}
                                      </span>{" "}
                                      —{" "}
                                      {bulletWords.slice(0, visibleWordCount).join(" ")}
                                      {bulletIndex === visibleBullets - 1 &&
                                        visibleWordCount < bulletWords.length && (
                                          <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                                        )}
                                    </li>
                                  )
                                })}
                            </ul>
                          )}
                        </div>
                      )
                    })}

                    {frame.showFlowchartImage && (
                      <div className="overflow-hidden rounded-[1.35rem] border border-[#e2e4ea] bg-white shadow-[0_10px_30px_rgba(17,23,28,0.06)]">
                        <Image
                          src="/chat-flowchart.svg"
                          alt="Film slippage troubleshooting flowchart"
                          width={640}
                          height={1140}
                          className="h-auto w-full"
                          priority={false}
                        />
                      </div>
                    )}

                    {frame.outroCount > 0 && (
                      <p>
                        {outroWords.slice(0, frame.outroCount).join(" ")}
                        {frame.outroCount < outroWords.length && (
                          <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                        )}
                      </p>
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
