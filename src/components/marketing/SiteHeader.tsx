"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandLogo } from "@/components/BrandLogo";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/playground", label: "Playground" },
];

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.contourna.com";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-c-brown/10 bg-c-off-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <BrandLogo />
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-c-brown transition-colors hover:bg-c-yellow-light hover:text-c-amber"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`${appUrl.replace(/\/$/, "")}/login`}
            className="rounded-full px-4 py-2 text-sm font-medium text-c-brown transition-colors hover:bg-c-yellow-light hover:text-c-amber"
          >
            Log in
          </a>
          <a
            href={`${appUrl.replace(/\/$/, "")}/signup`}
            className="inline-flex h-10 items-center justify-center rounded-full bg-c-yellow px-5 text-sm font-semibold text-white transition-colors hover:bg-c-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow focus-visible:ring-offset-2"
          >
            Start free trial
          </a>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-c-brown md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {isOpen ? (
        <div className="border-t border-c-brown/10 bg-c-off-white px-5 py-5 md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-base font-medium text-c-brown"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`${appUrl.replace(/\/$/, "")}/signup`}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-full bg-c-yellow px-5 font-semibold text-white"
            >
              Start free trial
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
