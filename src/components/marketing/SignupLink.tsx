"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";

import { buildSignupUrl, currentUtm, type SignupSource } from "./signupLinks";

// UTM tags don't change while a page is open, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * Sign-up link tagged with where it sits. The server renders it with `from`
 * only, so it works without JavaScript; the browser then adds the visitor's
 * UTM tags.
 */
export function SignupLink({
  from,
  className,
  children,
}: {
  from: SignupSource;
  className?: string;
  children: ReactNode;
}) {
  const href = useSyncExternalStore(
    subscribe,
    () => buildSignupUrl(from, currentUtm()),
    () => buildSignupUrl(from),
  );

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
