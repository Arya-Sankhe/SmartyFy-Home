import { Mic, SendHorizontal } from "lucide-react"

import { brandSans } from "@/lib/fonts"

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

export function ChatPreviewSection() {
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
              <div className="flex h-[620px] flex-col bg-[#fbfbfc] sm:h-[700px]">
                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                  <div className="mb-8 flex justify-end">
                    <div className="max-w-[72%] rounded-[1.45rem] bg-[#f2f2f3] px-5 py-4 text-[1.02rem] leading-8 text-[#17171c] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      How do I fix film slipping?
                    </div>
                  </div>

                  <div className="space-y-6 text-[1.02rem] leading-8 text-[#20242d] sm:text-[1.08rem]">
                    <p>
                      Film slippage (film slipping) is usually caused by film
                      tension, worn or dirty pull components, misaligned rolls,
                      or bad splices. The manual documents the fault indicators
                      on the Home Screen and gives specific causes and
                      corrective actions you should run through before calling
                      service.
                    </p>

                    <div>
                      <h3
                        className={`${brandSans.className} text-[1.35rem] font-[700] tracking-[-0.03em] text-[#17171c]`}
                      >
                        Manufacturer&apos;s Solution
                      </h3>

                      <ul className="mt-5 space-y-4 pl-6">
                        {manufacturerBullets.map((bullet) => (
                          <li key={bullet.title} className="pl-1">
                            <span className="font-[700] text-[#17171c]">
                              {bullet.title}
                            </span>{" "}
                            — {bullet.content}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-black/[0.06] bg-white/92 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-center gap-3 rounded-full border border-black/[0.08] bg-[#fafafa] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
                    <Mic className="h-5 w-5 text-[#8d93a1]" strokeWidth={2.2} />
                    <span className="flex-1 text-base text-[#9aa0ab]">
                      Ask anything
                    </span>
                    <span className="rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-[0.96rem] text-[#5d6471]">
                      Fast
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d5d8dd] text-[#ffffff]">
                      <SendHorizontal className="h-5 w-5" strokeWidth={2.2} />
                    </div>
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
