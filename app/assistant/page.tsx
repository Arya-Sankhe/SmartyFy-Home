import Link from "next/link";
import { Bot, BrainCircuit, Languages, Mic } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const assistantCards = [
  {
    title: "Retrieval orchestration",
    copy: "Route between visual-document search, clarification, and direct chat without losing conversational context.",
    icon: BrainCircuit,
  },
  {
    title: "Multilingual layer",
    copy: "Translate for retrieval, answer in the user's original language, and preserve intent across follow-up questions.",
    icon: Languages,
  },
  {
    title: "Voice-first input",
    copy: "Capture spoken questions, transcribe them inline, and feed the same grounded response pipeline.",
    icon: Mic,
  },
];

export default function AssistantPage() {
  return (
    <main className="min-h-screen pb-16">
      <SiteHeader />

      <section className="container-shell pt-10">
        <div className="rounded-[2rem] border border-white/18 bg-white/10 p-8 text-white shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-[20px] md:p-10">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-white/60">
            <Bot className="h-4 w-4" />
            Assistant Workspace
          </div>
          <h1 className="display-title mt-4 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
            The assistant layer that turns documents into grounded conversations.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
            This route gives the navigation a real destination and sets up the product story for the
            future assistant experience inside the same glassmorphism system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="glass-outline">
              <Link href="/">Back to landing</Link>
            </Button>
            <Button asChild variant="glass">
              <Link href="/#features">Review core features</Link>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {assistantCards.map(({ title, copy, icon: Icon }) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-white/18 bg-white/10 p-6 text-white shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-[20px]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/14">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h2>
              <p className="mt-3 leading-7 text-white/68">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
