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

          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(241,242,246,0.92))] p-3 shadow-[0_30px_90px_rgba(17,23,28,0.12)] backdrop-blur-xl sm:p-4">
            <div className="overflow-hidden rounded-[1.65rem] border border-white/70 bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
              <video
                src="/edited.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
