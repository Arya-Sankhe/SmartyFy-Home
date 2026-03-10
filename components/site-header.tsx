"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Production", href: "/" },
  { label: "Maintenance", href: "/#workflow" },
  { label: "QC", href: "/#proof" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-5 pt-5 md:px-10 md:pt-6">
      <div className="mx-auto w-full rounded-[3.5rem] bg-[#b8b8b8] px-6 py-5 shadow-[0_22px_48px_rgba(0,0,0,0.08)] md:px-14 md:py-7">
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden items-center gap-14 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[1.15rem] font-semibold tracking-[-0.03em] text-white transition-opacity hover:opacity-80"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between md:hidden">
            <Link
              href="/"
              className="text-[2rem] font-bold tracking-[-0.05em] text-white"
              onClick={() => setIsOpen(false)}
            >
              SmartyFy
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/12 text-white hover:bg-white/18"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <Link
            href="/"
            className="hidden text-center text-[2.9rem] font-bold leading-none tracking-[-0.07em] text-white md:block"
          >
            SmartyFy
          </Link>

          <div className="hidden justify-end md:flex">
            <Button
              asChild
              className="h-auto rounded-full border border-[#56a8ff] bg-[#3391ff] px-11 py-4 text-[1.05rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_2px_0_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-[#2f87ee]"
            >
              <Link href="/#cta">Get Started</Link>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden transition-[max-height,margin,opacity] duration-300 md:hidden",
            isOpen ? "mt-5 max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-2 border-t border-white/18 pt-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-base font-semibold tracking-[-0.03em] text-white transition-colors hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 h-auto rounded-full border border-[#56a8ff] bg-[#3391ff] px-7 py-3 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_2px_0_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-[#2f87ee]"
            >
              <Link href="/#cta" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
