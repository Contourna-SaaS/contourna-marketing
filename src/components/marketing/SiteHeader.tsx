"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { BrandLogo } from "@/components/BrandLogo";

import { loginUrl, signupUrl } from "./primitives";

const navigation = [
  { href: "/#documents", label: "Documents" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#forms", label: "Forms" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/playground", label: "Playground" },
];

/**
 * Floating light pill. It sits over the dark hero and the light sections alike,
 * so pages using it leave ~6rem of top padding for it.
 */
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="scroll-progress fixed inset-x-0 top-0 h-0.5 bg-c-yellow" aria-hidden="true" />
      <div className={`mx-auto max-w-6xl border border-c-line bg-white ${isOpen ? "rounded-[1.75rem]" : "rounded-full"}`}>
        <div className="flex h-14 items-center justify-between pl-[18px] pr-3">
          <BrandLogo />
          <nav aria-label="Primary" className="hidden items-center md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-c-ink transition-colors hover:bg-c-yellow-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-1 md:flex">
            <a
              href={loginUrl}
              className="rounded-full px-4 py-2 text-sm font-medium text-c-ink transition-colors hover:bg-c-yellow-light"
            >
              Log in
            </a>
            <a
              href={signupUrl}
              className="inline-flex h-10 items-center justify-center rounded-full bg-c-yellow px-[18px] text-sm font-bold text-white transition-colors hover:bg-c-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow focus-visible:ring-offset-2"
            >
              Start free trial
            </a>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full text-c-brown transition-colors hover:bg-c-yellow-light md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        {isOpen ? (
          <nav aria-label="Mobile" className="flex flex-col gap-1 border-t border-c-brown/10 px-5 pb-5 pt-3 md:hidden">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-base font-medium text-c-brown hover:text-c-yellow"
              >
                {item.label}
              </Link>
            ))}
            <a href={loginUrl} className="py-3 text-base font-medium text-c-brown hover:text-c-yellow">
              Log in
            </a>
            <a
              href={signupUrl}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-c-yellow px-5 font-semibold text-white"
            >
              Start free trial
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
