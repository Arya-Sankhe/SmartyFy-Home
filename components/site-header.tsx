"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, LogOut, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Landing", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Proof", href: "/#proof" },
  { label: "Assistant", href: "/assistant" },
];

function getBreadcrumbs(pathname: string) {
  if (pathname === "/") {
    return [
      { label: "Home", href: "/" },
      { label: "Landing", href: "/" },
    ];
  }

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    crumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: currentPath,
    });
  }

  return crumbs;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between rounded-2xl border border-white/18 bg-white/10 p-4 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-[20px]">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="min-w-0" onClick={() => setIsOpen(false)}>
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent">
              SmartyFy
            </span>
          </Link>
          <span className="text-white/28">/</span>
          <span className="truncate text-xs font-medium uppercase tracking-[0.18em] text-white/62">
            Version 1
          </span>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="glass-outline" size="sm">
            <Link href="/assistant">
              <Sparkles className="h-4 w-4" />
              Assistant
            </Link>
          </Button>
          <Button
            type="button"
            variant="glass-ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              router.push("/");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Button
          type="button"
          variant="glass-ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mx-auto mt-3 flex max-w-4xl flex-wrap items-center gap-2 px-2 text-sm text-white/72">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <div key={crumb.href} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight className="h-4 w-4 text-white/36" /> : null}
              {isLast ? (
                <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-white">
                  {crumb.label}
                </span>
              ) : (
                <Link
              href={crumb.href}
              onClick={() => setIsOpen(false)}
              className="rounded-full px-1 py-1 text-white/70 transition-colors hover:text-white"
            >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "mx-auto mt-3 max-w-4xl overflow-hidden rounded-2xl border border-white/18 bg-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.15)] backdrop-blur-[20px] transition-[max-height,opacity,transform] duration-300 md:hidden",
          isOpen
            ? "max-h-[28rem] translate-y-0 p-4 opacity-100"
            : "max-h-0 -translate-y-2 p-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-sm font-medium text-white/82 transition-colors hover:bg-white/12 hover:text-white",
                pathname === item.href && "bg-white/14 text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 grid gap-2">
          <Button asChild variant="glass-outline" className="w-full">
            <Link href="/assistant" onClick={() => setIsOpen(false)}>
              <Sparkles className="h-4 w-4" />
              Assistant
            </Link>
          </Button>
          <Button
            type="button"
            variant="glass-ghost"
            className="w-full"
            onClick={() => {
              setIsOpen(false);
              router.push("/");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
