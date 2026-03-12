import { brandSans } from "@/lib/fonts"

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

          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,242,246,0.92))] p-4 shadow-[0_30px_90px_rgba(17,23,28,0.12)] backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between rounded-[1.35rem] border border-black/[0.04] bg-white/70 px-4 py-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#7d8597]">
                  Placeholder
                </p>
                <p
                  className={`${brandSans.className} mt-1 text-lg font-[700] tracking-[-0.03em] text-[#17171c]`}
                >
                  Media preview
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#eef4ff] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#3156d8]">
                <span className="h-2 w-2 rounded-full bg-[#64d98b]" />
                GIF / Video / Image
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.7rem] border border-[#dbe2f0] bg-[linear-gradient(160deg,rgba(249,250,253,0.98),rgba(226,232,245,0.92))] p-3 sm:p-4">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(49,86,216,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(49,86,216,0.06)_1px,transparent_1px)] [background-size:2rem_2rem] opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(49,86,216,0.2),transparent_30%),radial-gradient(circle_at_78%_28%,rgba(113,132,219,0.18),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(23,23,28,0.08),transparent_36%)]" />

              <div className="relative overflow-hidden rounded-[1.35rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.1))] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                <div className="aspect-[4/5]">
                  <div className="flex items-center justify-between border-b border-white/50 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[#64708a]">
                      Replacement target
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff8d5c]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffd058]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#64d98b]" />
                    </div>
                  </div>

                  <div className="relative flex h-full flex-col items-center justify-center px-8 py-10 text-center">
                    <div className="mb-5 flex h-18 w-18 items-center justify-center rounded-full border border-white/60 bg-white/65 shadow-[0_10px_35px_rgba(49,86,216,0.14)]">
                      <div className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-[#3156d8]" />
                    </div>

                    <p
                      className={`${brandSans.className} max-w-sm text-balance text-[clamp(1.7rem,3.3vw,2.6rem)] font-[700] leading-[0.95] tracking-[-0.04em] text-[#17171c]`}
                    >
                      Drop in your real product demo here
                    </p>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-[#626c80] sm:text-base">
                      GIF, product screenshot sequence, MP4, or embedded live
                      experience.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                      {["GIF", "MP4", "WebM", "Image"].map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-white/60 bg-white/65 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#55607b]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[1.3rem] border border-black/[0.05] bg-white/75 px-4 py-3 text-sm leading-7 text-[#656d7c]">
              Later we can swap this placeholder with your real chat UI, an
              autoplaying product GIF, a video element, or an embedded iframe.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
