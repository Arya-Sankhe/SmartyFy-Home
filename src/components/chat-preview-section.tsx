import { brandSans } from "@/lib/fonts"

const placeholderMessages = [
  {
    role: "Machine insight",
    content:
      "Detected a recurring spindle load spike during the last three cycles. Recommend checking tool wear before the next run.",
  },
  {
    role: "Operator question",
    content: "What should I inspect first to reduce the risk of downtime?",
    isUser: true,
  },
  {
    role: "Recommended action",
    content:
      "Start with bearing temperature and feed-rate drift. If both trend upward together, pause the cycle and inspect the tool head assembly.",
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
              Let It Tell You.
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
                  Chat window preview
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-[#eef4ff] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#3156d8]">
                <span className="h-2 w-2 rounded-full bg-[#64d98b]" />
                Placeholder
              </div>
            </div>

            <div className="space-y-3">
              {placeholderMessages.map((message) => (
                <div
                  key={message.role}
                  className={`rounded-[1.5rem] border px-4 py-4 sm:px-5 ${
                    message.isUser
                      ? "ml-6 border-[#d9deea] bg-[#f7f8fb]"
                      : "mr-6 border-[#e4e8f1] bg-white/85"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#7d8597]">
                    {message.role}
                  </p>
                  <p className="mt-3 text-base leading-8 text-[#2e3440] sm:text-[1.05rem]">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.3rem] border border-black/[0.05] bg-white/75 px-4 py-3 text-sm leading-7 text-[#656d7c]">
              Your live product chat window will replace this placeholder.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
