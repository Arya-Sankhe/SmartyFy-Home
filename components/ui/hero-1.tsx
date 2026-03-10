"use client";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Hero({
  eyebrow = "Innovate Without Limits",
  title,
  subtitle,
  ctaLabel = "Explore Now",
  ctaHref = "#",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[calc(100vh-40px)] w-full flex-col items-center overflow-hidden rounded-b-[2.5rem] px-6 pt-28 text-center md:px-8"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#fffaf0_0%,rgba(255,250,240,0.6)_48%,rgba(183,208,137,0.22)_100%)]" />

      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-0 h-[640px] w-full bg-[linear-gradient(to_right,rgba(25,25,25,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(25,25,25,0.06)_1px,transparent_1px)] bg-[size:6rem_5rem] [mask-image:radial-gradient(ellipse_80%_55%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute left-1/2 top-[calc(100%-110px)] h-[540px] w-[760px] -translate-x-1/2 rounded-[100%] border border-[#b7d089] bg-[radial-gradient(closest-side,rgba(255,250,240,0.96)_78%,rgba(255,250,240,0)_100%)] blur-sm md:w-[1100px] lg:top-[calc(100%-150px)] lg:h-[760px] lg:w-[140%]" />
      </div>

      {eyebrow ? (
        <a href="#proof" className="group mb-8 animate-fade-in">
          <span className="inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm uppercase tracking-[0.18em] text-black/65 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
            {eyebrow}
            <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      ) : null}

      <h1 className="display-title animate-fade-in max-w-6xl bg-[linear-gradient(135deg,#171717_10%,rgba(23,23,23,0.58)_85%)] bg-clip-text py-6 text-5xl font-semibold leading-none tracking-[-0.07em] text-transparent opacity-0 sm:text-6xl md:text-7xl lg:text-[6.6rem]">
        {title}
      </h1>

      <p className="animate-fade-in mb-12 max-w-3xl text-balance text-lg tracking-tight text-black/65 opacity-0 [animation-delay:120ms] md:text-xl">
        {subtitle}
      </p>

      {ctaLabel ? (
        <div className="animate-fade-up flex justify-center opacity-0 [animation-delay:220ms]">
          <Button
            asChild
            size="lg"
            className="z-20 w-fit min-w-52 bg-black text-base tracking-tight text-[#f6f0e4]"
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>
      ) : null}

      <div className="relative mt-24 flex w-full justify-center px-2 pb-16">
        <div className="w-full max-w-6xl rounded-[2rem] border border-black/10 bg-[rgba(255,252,246,0.72)] p-4 shadow-[0_30px_80px_rgba(25,25,25,0.12)] backdrop-blur-xl md:p-6">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[1.5rem] border border-black/8 bg-[#171717] p-4 text-left text-[#f6f0e4] md:p-6">
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
                <span>Visual Retrieval Preview</span>
                <span>Fast + Deep Modes</span>
              </div>
              <div className="grid gap-3 md:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                  <div className="mb-3 h-40 rounded-[1rem] border border-dashed border-white/15 bg-[linear-gradient(140deg,rgba(183,208,137,0.18),rgba(183,208,137,0.02)),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
                  <p className="text-sm text-white/60">
                    Upload dense PDFs and keep the charts, tables, and layout intact.
                  </p>
                </div>
                <div className="space-y-3 rounded-[1.25rem] border border-white/10 bg-white/6 p-4">
                  <div className="rounded-[1rem] bg-[#f6f0e4] p-4 text-[#171717]">
                    <div className="mb-2 text-[0.7rem] uppercase tracking-[0.22em] text-black/45">
                      Grounded Answer
                    </div>
                    <p className="text-sm leading-6">
                      The procurement delays are concentrated in regions with manual invoice matching.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1rem] border border-white/10 p-3">
                      <div className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
                        Source Page
                      </div>
                      <div className="h-20 rounded-xl bg-[linear-gradient(135deg,rgba(217,143,67,0.42),rgba(217,143,67,0.06))]" />
                    </div>
                    <div className="rounded-[1rem] border border-white/10 p-3">
                      <div className="mb-1 text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
                        Auto Flowchart
                      </div>
                      <div className="h-20 rounded-xl bg-[linear-gradient(135deg,rgba(183,208,137,0.42),rgba(183,208,137,0.06))]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-black/8 bg-white/80 p-5 text-left shadow-[0_18px_40px_rgba(25,25,25,0.08)]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d98f43]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b7d089]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-black/45">Streaming First</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-black">
                  Sources appear before the answer finishes.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-black/8 bg-[#d98f43] p-5 text-left text-[#191919] shadow-[0_18px_40px_rgba(217,143,67,0.2)]">
                <p className="text-sm uppercase tracking-[0.2em] text-black/55">Multilingual + Voice</p>
                <p className="mt-2 text-lg leading-7">
                  Ask in your own language, speak naturally, and get answers back with the original intent preserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
