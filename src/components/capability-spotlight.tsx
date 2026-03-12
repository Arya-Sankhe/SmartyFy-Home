import { TextRotate } from "@/components/ui/text-rotate"

const rotatingTerms = [
  "manuals",
  "diagrams",
  "charts",
  "tables",
  "process docs",
  "team notes",
]

const featureHighlights = [
  {
    label: "Retrieval",
    value: "Vision-first page search",
  },
  {
    label: "Responses",
    value: "Streaming answers with citations",
  },
  {
    label: "Modes",
    value: "Fast mode and deep mode",
  },
]

export function CapabilitySpotlight() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%),radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.08),transparent_26%)]" />
      <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:5rem_5rem] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end">
          <div className="space-y-8">
            <p className="text-xs font-medium uppercase tracking-[0.36em] text-white/[0.45]">
              Visual document intelligence
            </p>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.26em] text-white/30">
                SmartyFy understands
              </p>

              <TextRotate
                texts={rotatingTerms}
                rotationInterval={2400}
                staggerDuration={0.014}
                staggerFrom="center"
                mainClassName="min-h-[1.15em] text-4xl font-semibold leading-none tracking-[-0.08em] sm:text-6xl md:text-7xl"
                splitLevelClassName="pr-[0.02em]"
                elementLevelClassName="bg-gradient-to-b from-white via-white to-white/45 bg-clip-text text-transparent"
              />
            </div>

            <p className="max-w-2xl text-base leading-7 text-white/[0.62] sm:text-lg">
              The product indexes page images instead of flattened OCR, so users
              can ask about layouts, charts, and exact visual context without
              losing what made the document useful in the first place.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-sm uppercase tracking-[0.28em] text-white/[0.35]">
                Why it lands
              </p>
              <span className="rounded-full border border-white/[0.12] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/[0.55]">
                Sources first
              </span>
            </div>

            <div className="space-y-4">
              {featureHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.35rem] border border-white/[0.08] bg-black/30 p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/[0.38]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/[0.78]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
