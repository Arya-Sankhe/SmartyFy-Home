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

interface ConversationScript {
  question: string
  introText: string
  sections: ConversationSection[]
  outroText: string
  flowchartSrc: string
}

const englishManufacturerBullets = [
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

const englishNextStepsBullets = [
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

const hindiManufacturerBullets = [
  {
    title: "Film Slippage (दिखाई गई value)",
    content:
      "Home Screen पर Film Slippage और Act Diameter दिखते हैं, इसलिए आप slippage और set bag length की तुलना मॉनिटर कर सकते हैं (Page 32, Page 35).",
  },
  {
    title: "संभावित कारण: फिल्म रोल misalignment",
    content:
      "अगर रोल off-center है, तो उसकी tracking खराब होगी और वह फिसलेगा (Page 20).",
  },
  {
    title: "संभावित कारण: गलत film tension / फिसलते pull belts",
    content:
      "ढीले या फिसलते pull belts असंगत pulling और bag length errors पैदा करते हैं (Page 20).",
  },
  {
    title: "संभावित कारण: गंदे/घिसे pull belts या registration sensor",
    content:
      "गंदे pull belts या गंदा registration/photo-eye lens tracking errors और slippage पैदा कर सकते हैं (Page 20).",
  },
  {
    title: "संभावित कारण: forming tube contamination",
    content:
      "Forming tube पर oil या seasoning का buildup uneven drag और tracking या slip problems पैदा कर सकता है (Page 28).",
  },
  {
    title: "संभावित कारण: खराब splice",
    content:
      "अगर splice सीधा नहीं है या ठीक से taped नहीं है, तो forming tube से गुजरते समय jam या slip हो सकता है (Page 20).",
  },
  {
    title: "सुधारात्मक कदम: फिल्म रोल को फिर से center करें",
    content:
      "Misalignment ठीक करने के लिए रोल को spindle पर फिर से center करें (Page 20).",
  },
  {
    title: "सुधारात्मक कदम: tension / dancer arm समायोजित करें",
    content:
      "Slack हटाने के लिए film tension बढ़ाएं या adjust करें, या dancer arm settings बदलें (Page 20).",
  },
  {
    title: "सुधारात्मक कदम: pull belts और registration sensor lens साफ करें",
    content:
      "Belts से debris और film residue हटाएं और photo-eye lens साफ करें (Page 20).",
  },
  {
    title: "सुधारात्मक कदम: forming tube साफ करें / घिसे belts बदलें",
    content:
      "Forming tube से oil या seasoning साफ करें और जरूरत हो तो घिसे pull belts बदलें (Page 28).",
  },
  {
    title: "सुधारात्मक कदम: splice जांचें और दोबारा करें",
    content:
      "Splicing tape का सही इस्तेमाल करके splice दोबारा करें; सुनिश्चित करें कि splice सीधा हो और दोनों किनारों पर taped हो (Page 20).",
  },
  {
    title: "रोल changeover के लिए प्रक्रिया याद रखें",
    content:
      "समाप्त हो रही film को सुरक्षित तरीके से काटें, नया roll लोड करें, splicing tape लगाएं, Film End error clear करें, और production शुरू करने से पहले splice के साफ गुजरने की पुष्टि करें (Page 20).",
  },
]

const hindiNextStepsBullets = [
  {
    title: "मशीन रोकें",
    content: "Lockout/tagout की जरूरत के अनुसार सुरक्षित तरीके से काम करें.",
  },
  {
    title: "फिल्म रोल को देखकर जांचें और फिर से center करें",
    content:
      "रोल को spindle पर center करते समय सुधार की पुष्टि के लिए Home Screen पर Act Diameter और Film Slippage देखें (Page 32, Page 35).",
  },
  {
    title: "Pull belts और photo-eye lens साफ करें",
    content:
      "Belts में wear या glazing देखें और अगर वे घिसे हों तो उन्हें बदलें (Page 20, Page 28).",
  },
  {
    title: "Forming tube साफ करें",
    content:
      "वह oil या seasoning residue हटाएं जो uneven drag पैदा कर सकता है (Page 28).",
  },
  {
    title: "Film tension / dancer arm settings adjust करें",
    content:
      "Adjustment के बाद tracking जांचने के लिए low speed पर दोबारा चलाएं (Page 20).",
  },
  {
    title: "Splice जांचें",
    content:
      "सीधापन और edge taping की पुष्टि करें, जरूरत पड़े तो splice दोबारा करें, और देखें कि वह forming tube से साफ गुजर रहा है (Page 20).",
  },
  {
    title: "Film Slippage और Act Diameter मॉनिटर करें",
    content:
      "Testing के दौरान Home Screen देखें और मशीन stable हो जाए तो production speed पर कई pouches चलाएं (Page 32, Page 35).",
  },
  {
    title: "अगर समस्या बनी रहती है",
    content:
      "संदिग्ध pull belts बदलें, maintenance action नोट करें, और इन steps के बाद भी slippage जारी रहे तो service से संपर्क करें.",
  },
]

const englishConversation: ConversationScript = {
  question: "How do I fix film slipping?",
  introText:
    "Film slippage (film slipping) is usually caused by film tension, worn or dirty pull components, misaligned rolls, or bad splices. The manual documents the fault indicators on the Home Screen and gives specific causes and corrective actions you should run through before calling service.",
  sections: [
    {
      heading: "Manufacturer's Solution",
      bullets: englishManufacturerBullets,
    },
    {
      heading: "Next Steps",
      bullets: englishNextStepsBullets,
    },
  ],
  outroText:
    "If you want, tell me the current Film Slippage value and what you see on the pull belts/forming tube and I'll suggest the most-likely next physical adjustment.",
  flowchartSrc: "/eng-flowchart.webp",
}

const hindiConversation: ConversationScript = {
  question: "फिल्म स्लिपिंग को कैसे ठीक करूं?",
  introText:
    "फिल्म स्लिपेज (फिल्म का फिसलना) आमतौर पर फिल्म टेंशन, घिसे या गंदे pull components, गलत एलाइन हुए रोल, या खराब splice की वजह से होता है। मैनुअल Home Screen पर दिखने वाले fault indicators समझाता है और service को कॉल करने से पहले जांचने के लिए खास कारण और corrective actions बताता है।",
  sections: [
    {
      heading: "निर्माता का समाधान",
      bullets: hindiManufacturerBullets,
    },
    {
      heading: "अगले कदम",
      bullets: hindiNextStepsBullets,
    },
  ],
  outroText:
    "अगर आप चाहें, तो मौजूदा Film Slippage value और pull belts/forming tube पर क्या दिख रहा है यह बताइए, मैं सबसे संभावित अगला physical adjustment सुझाऊंगा।",
  flowchartSrc: "/hindi-flowchart.webp",
}

const conversations: ConversationScript[] = [
  {
    ...englishConversation,
  },
  {
    ...hindiConversation,
  },
]

const STREAM_STEP_MS = 28
const STREAM_RESET_MS = 2600
const INTRO_PAUSE_FRAMES = 8
const HEADING_PAUSE_FRAMES = 7
const BULLET_PAUSE_FRAMES = 6
const FLOWCHART_HOLD_FRAMES = 18
const VIDEO_ELEMENT_HOLD_FRAMES = 18
const OUTRO_PAUSE_FRAMES = 10

interface ActiveConversationFrame {
  introCount: number
  sectionHeadingCounts: number[]
  sectionBulletsVisible: number[]
  sectionBulletWordCounts: number[][]
  showFlowchartImage: boolean
  showVideoElementImage: boolean
  outroCount: number
}

interface StreamFrame {
  activeConversationIndex: number
  activeConversationFrame: ActiveConversationFrame
}

export function ChatPreviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)

  const conversationWordData = useMemo(
    () =>
      conversations.map((conversation) => ({
        introWords: conversation.introText.split(" "),
        outroWords: conversation.outroText.split(" "),
        sectionHeadingWords: conversation.sections.map((section) =>
          section.heading.split(" ")
        ),
        sectionBulletWordLists: conversation.sections.map((section) =>
          section.bullets.map((bullet) => bullet.content.split(" "))
        ),
      })),
    []
  )

  const completedConversationFrames = useMemo<ActiveConversationFrame[]>(
    () =>
      conversations.map((conversation, conversationIndex) => {
        const wordData = conversationWordData[conversationIndex]

        return {
          introCount: wordData.introWords.length,
          sectionHeadingCounts: wordData.sectionHeadingWords.map(
            (headingWords) => headingWords.length
          ),
          sectionBulletsVisible: conversation.sections.map(
            (section) => section.bullets.length
          ),
          sectionBulletWordCounts: wordData.sectionBulletWordLists.map(
            (sectionBulletWords) =>
              sectionBulletWords.map((bulletWords) => bulletWords.length)
          ),
          showFlowchartImage: true,
          showVideoElementImage: true,
          outroCount: wordData.outroWords.length,
        }
      }),
    [conversationWordData]
  )

  const timeline = useMemo<StreamFrame[]>(() => {
    const cloneConversationFrame = (
      conversationFrame: ActiveConversationFrame
    ): ActiveConversationFrame => ({
      introCount: conversationFrame.introCount,
      sectionHeadingCounts: [...conversationFrame.sectionHeadingCounts],
      sectionBulletsVisible: [...conversationFrame.sectionBulletsVisible],
      sectionBulletWordCounts: conversationFrame.sectionBulletWordCounts.map(
        (sectionBulletWords) => [...sectionBulletWords]
      ),
      showFlowchartImage: conversationFrame.showFlowchartImage,
      showVideoElementImage: conversationFrame.showVideoElementImage,
      outroCount: conversationFrame.outroCount,
    })

    const frames: StreamFrame[] = []

    conversations.forEach((conversation, conversationIndex) => {
      const wordData = conversationWordData[conversationIndex]
      const activeConversationFrame: ActiveConversationFrame = {
        introCount: 0,
        sectionHeadingCounts: wordData.sectionHeadingWords.map(() => 0),
        sectionBulletsVisible: conversation.sections.map(() => 0),
        sectionBulletWordCounts: wordData.sectionBulletWordLists.map(
          (sectionBulletWords) => sectionBulletWords.map(() => 0)
        ),
        showFlowchartImage: false,
        showVideoElementImage: false,
        outroCount: 0,
      }

      const pushFrame = () => {
        frames.push({
          activeConversationIndex: conversationIndex,
          activeConversationFrame: cloneConversationFrame(activeConversationFrame),
        })
      }

      pushFrame()

      for (let index = 1; index <= wordData.introWords.length; index += 1) {
        activeConversationFrame.introCount = index
        pushFrame()
      }

      for (let index = 0; index < INTRO_PAUSE_FRAMES; index += 1) {
        pushFrame()
      }

      conversation.sections.forEach((section, sectionIndex) => {
        const headingWords = wordData.sectionHeadingWords[sectionIndex]

        for (let index = 1; index <= headingWords.length; index += 1) {
          activeConversationFrame.sectionHeadingCounts[sectionIndex] = index
          pushFrame()
        }

        for (let index = 0; index < HEADING_PAUSE_FRAMES; index += 1) {
          pushFrame()
        }

        wordData.sectionBulletWordLists[sectionIndex].forEach(
          (bulletWords, bulletIndex) => {
            activeConversationFrame.sectionBulletsVisible[sectionIndex] = bulletIndex + 1

            for (let wordIndex = 1; wordIndex <= bulletWords.length; wordIndex += 1) {
              activeConversationFrame.sectionBulletWordCounts[sectionIndex][bulletIndex] =
                wordIndex
              pushFrame()
            }

            for (
              let pauseIndex = 0;
              pauseIndex < BULLET_PAUSE_FRAMES;
              pauseIndex += 1
            ) {
              pushFrame()
            }
          }
        )
      })

      for (let index = 1; index <= wordData.outroWords.length; index += 1) {
        activeConversationFrame.outroCount = index
        pushFrame()
      }

      for (let index = 0; index < OUTRO_PAUSE_FRAMES; index += 1) {
        pushFrame()
      }

      activeConversationFrame.showFlowchartImage = true
      for (let frameIndex = 0; frameIndex < FLOWCHART_HOLD_FRAMES; frameIndex += 1) {
        pushFrame()
      }

      activeConversationFrame.showVideoElementImage = true
      for (let frameIndex = 0; frameIndex < VIDEO_ELEMENT_HOLD_FRAMES; frameIndex += 1) {
        pushFrame()
      }
    })

    const resetFrames = Math.max(1, Math.round(STREAM_RESET_MS / STREAM_STEP_MS))
    const lastFrame = frames[frames.length - 1]

    if (!lastFrame) return frames

    for (let index = 0; index < resetFrames; index += 1) {
      frames.push({
        activeConversationIndex: lastFrame.activeConversationIndex,
        activeConversationFrame: cloneConversationFrame(
          lastFrame.activeConversationFrame
        ),
      })
    }

    return frames
  }, [conversationWordData])

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
                  <div className="space-y-8">
                    {conversations.map((conversation, conversationIndex) => {
                      if (conversationIndex > frame.activeConversationIndex) {
                        return null
                      }

                      const wordData = conversationWordData[conversationIndex]
                      const isActiveConversation =
                        conversationIndex === frame.activeConversationIndex
                      const conversationFrame = isActiveConversation
                        ? frame.activeConversationFrame
                        : completedConversationFrames[conversationIndex]

                      return (
                        <div
                          key={conversation.question}
                          className={conversationIndex === 0 ? "space-y-5" : "space-y-5 pt-6"}
                        >
                          <div className="flex justify-end">
                            <div className="max-w-[72%] rounded-[1.2rem] bg-[#f2f2f3] px-4 py-3 text-[0.92rem] leading-7 text-[#17171c] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:text-[0.95rem]">
                              {conversation.question}
                            </div>
                          </div>

                          <div className="space-y-5 text-[0.9rem] leading-7 text-[#20242d] sm:text-[0.96rem]">
                            <p>
                              {wordData.introWords
                                .slice(0, conversationFrame.introCount)
                                .join(" ")}
                              {isActiveConversation &&
                                conversationFrame.introCount < wordData.introWords.length && (
                                  <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                                )}
                            </p>

                            {conversation.sections.map((section, sectionIndex) => {
                              const headingWords =
                                wordData.sectionHeadingWords[sectionIndex]
                              const visibleBullets =
                                conversationFrame.sectionBulletsVisible[sectionIndex]
                              const headingCount =
                                conversationFrame.sectionHeadingCounts[sectionIndex]
                              const showSection = headingCount > 0 || visibleBullets > 0

                              if (!showSection) return null

                              return (
                                <div key={section.heading}>
                                  <h3
                                    className={`${inter.className} text-[1.08rem] font-[700] tracking-[-0.02em] text-[#17171c] sm:text-[1.14rem]`}
                                  >
                                    {headingWords.slice(0, headingCount).join(" ")}
                                    {isActiveConversation &&
                                      headingCount < headingWords.length && (
                                        <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                                      )}
                                  </h3>

                                  {visibleBullets > 0 && (
                                    <ul className="mt-4 space-y-3 pl-5">
                                      {section.bullets
                                        .slice(0, visibleBullets)
                                        .map((bullet, bulletIndex) => {
                                          const bulletWords =
                                            wordData.sectionBulletWordLists[sectionIndex][
                                              bulletIndex
                                            ]
                                          const visibleWordCount =
                                            conversationFrame.sectionBulletWordCounts[
                                              sectionIndex
                                            ][bulletIndex]

                                          return (
                                            <li key={bullet.title} className="pl-1">
                                              <span className="font-[700] text-[#17171c]">
                                                {bullet.title}
                                              </span>{" "}
                                              —{" "}
                                              {bulletWords
                                                .slice(0, visibleWordCount)
                                                .join(" ")}
                                              {isActiveConversation &&
                                                bulletIndex === visibleBullets - 1 &&
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

                            {conversationFrame.outroCount > 0 && (
                              <p>
                                {wordData.outroWords
                                  .slice(0, conversationFrame.outroCount)
                                  .join(" ")}
                                {isActiveConversation &&
                                  conversationFrame.outroCount <
                                    wordData.outroWords.length && (
                                    <span className="ml-1 inline-block h-[1em] w-[0.08em] animate-pulse rounded-full bg-[#7a8090] align-[-0.12em]" />
                                  )}
                              </p>
                            )}

                            {conversationFrame.showFlowchartImage && (
                              <div className="overflow-hidden rounded-[1.35rem] border border-[#e2e4ea] bg-white shadow-[0_10px_30px_rgba(17,23,28,0.06)]">
                                <Image
                                  src={conversation.flowchartSrc}
                                  alt="Film slippage troubleshooting flowchart"
                                  width={640}
                                  height={1140}
                                  className="h-auto w-full"
                                  priority={false}
                                />
                              </div>
                            )}

                            {conversationFrame.showVideoElementImage && (
                              <div className="overflow-hidden rounded-[1.35rem] border border-[#e2e4ea] bg-white shadow-[0_10px_30px_rgba(17,23,28,0.06)]">
                                <Image
                                  src="/video-element.webp"
                                  alt="SmartyFy interface preview"
                                  width={640}
                                  height={1140}
                                  className="h-auto w-full"
                                  priority={false}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
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
