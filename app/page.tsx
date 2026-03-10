import { ArrowRight, AudioLines, Eye, Languages, PlayCircle, Sparkles } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/ui/hero-1";

const featureCards = [
  {
    title: "Vision-first document retrieval",
    copy: "Index PDF pages as images so charts, tables, diagrams, and layout survive retrieval instead of being flattened into brittle OCR text.",
    icon: Eye,
  },
  {
    title: "Fast or deep reasoning on demand",
    copy: "Switch between lightweight speed mode and heavier high-accuracy mode without changing the document base underneath.",
    icon: Sparkles,
  },
  {
    title: "Multilingual chat and voice search",
    copy: "Ask questions in your native language, dictate with live transcription, and keep retrieval quality high through language-aware query rewriting.",
    icon: Languages,
  },
  {
    title: "Video and notes inside the same memory layer",
    copy: "Blend uploaded documents, curated videos, and personal notes so the assistant can surface the right source instead of a generic answer.",
    icon: PlayCircle,
  },
];

const workflow = [
  "Upload dense PDFs with charts, diagrams, and layout-heavy pages.",
  "Ask a question by text or voice in the language you naturally use.",
  "Review visual citations, related videos, and optional flowcharts while the answer streams.",
];

const proofPoints = [
  "Charts and tables stay meaningful because retrieval happens on rendered page images.",
  "Source pages arrive before the response is finished, which reduces trust friction.",
  "Procedural answers can become flowcharts automatically when the content warrants it.",
];

export default function Home() {
  return (
    <main className="pb-12">
      <SiteHeader />

      <Hero
        eyebrow="Machines With SuperIntelligence"
        title="Document intelligence that sees the page, not just the text."
        subtitle="SmartyFy AI turns dense PDFs into grounded answers with visual citations, multilingual chat, procedural flowcharts, and voice-first search that actually understands layouts."
        ctaLabel="Start With The Landing Page"
        ctaHref="#features"
      />

      <section id="proof" className="section-space">
        <div className="container-shell">
          <div className="grid gap-4 rounded-[2rem] border border-black/8 bg-[rgba(255,252,246,0.7)] p-5 shadow-[0_24px_60px_rgba(25,25,25,0.08)] backdrop-blur-xl md:grid-cols-3 md:p-7">
            {proofPoints.map((point) => (
              <article key={point} className="rounded-[1.5rem] border border-black/8 bg-white/72 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">Why it matters</p>
                <p className="mt-3 text-lg leading-7 tracking-tight text-black/80">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-space">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-black/45">Feature stack</p>
            <h2 className="display-title text-4xl font-semibold tracking-[-0.06em] text-black md:text-6xl">
              Built for PDFs that break normal RAG.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {featureCards.map(({ title, copy, icon: Icon }) => (
              <article
                key={title}
                className="group rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,249,239,0.88))] p-6 shadow-[0_20px_48px_rgba(25,25,25,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#191919] text-[#f6f0e4]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-black">{title}</h3>
                <p className="mt-3 text-base leading-7 text-black/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-black/8 bg-[#191919] p-7 text-[#f6f0e4] shadow-[0_26px_70px_rgba(25,25,25,0.18)]">
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">How it moves</p>
            <h2 className="display-title mt-3 text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
              From upload to answer in one visible chain.
            </h2>
            <div className="mt-8 space-y-4">
              {workflow.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b7d089] font-semibold text-[#191919]">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-base leading-7 text-white/72">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article className="rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-[0_18px_48px_rgba(25,25,25,0.08)]">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-black/45">
                <AudioLines className="h-4 w-4" />
                Voice input
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-black">
                Browser-recorded audio transcribes inline, then drops straight into the same retrieval flow.
              </p>
            </article>

            <article className="rounded-[2rem] border border-black/8 bg-[#b7d089] p-6 text-[#191919] shadow-[0_18px_48px_rgba(183,208,137,0.18)]">
              <p className="text-sm uppercase tracking-[0.18em] text-black/55">Multisource answers</p>
              <p className="mt-4 text-xl leading-8">
                PDFs, notes, and relevant videos can all support the same answer, which makes the landing page story concrete and differentiated.
              </p>
            </article>

            <article className="rounded-[2rem] border border-black/8 bg-[rgba(255,252,246,0.8)] p-6 shadow-[0_18px_48px_rgba(25,25,25,0.06)]">
              <p className="text-sm uppercase tracking-[0.18em] text-black/45">Flowchart layer</p>
              <p className="mt-4 text-xl leading-8 text-black/75">
                When the answer is procedural, SmartyFy AI can convert it into a flowchart instead of leaving users with a wall of text.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="cta" className="section-space pb-20">
        <div className="container-shell">
          <div className="rounded-[2.25rem] border border-black/8 bg-[linear-gradient(135deg,#191919_0%,#2f2b27_100%)] p-8 text-[#f6f0e4] shadow-[0_30px_80px_rgba(25,25,25,0.22)] md:p-10">
            <p className="text-sm uppercase tracking-[0.22em] text-white/45">Landing page base</p>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h2 className="display-title text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
                  Fresh scaffold, clear brand story, ready for the next section pass.
                </h2>
                <p className="mt-4 text-lg leading-8 text-white/70">
                  The page now has a Next.js foundation, shadcn-compatible structure, and a first-pass landing narrative aligned to the PRD.
                </p>
              </div>
              <Button asChild variant="secondary" size="lg" className="shrink-0">
                <a href="#hero">
                  Review the hero
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
