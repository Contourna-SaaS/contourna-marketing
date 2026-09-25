import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "dark" | "light";
}

export function BrandLogo({ variant = "dark" }: BrandLogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Contourna home">
      <Image
        src="/images/contourna-mark.svg"
        alt=""
        width={26}
        height={26}
        preload
      />
      <span
        className={`text-base font-semibold tracking-[0.02em] ${variant === "light" ? "text-white" : "text-c-ink"}`}
      >
        CONTOURNA
      </span>
    </Link>
  );
}
