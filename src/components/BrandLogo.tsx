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
        width={32}
        height={32}
        preload
      />
      <span
        className={`text-lg font-semibold ${variant === "light" ? "text-white" : "text-c-brown"}`}
      >
        CONTOURNA
      </span>
    </Link>
  );
}
