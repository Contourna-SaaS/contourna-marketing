import { appUrl } from "./primitives";

/** Where on the site a sign-up link sits. Saved on the account as its source. */
export type SignupSource =
  | "header"
  | "hero"
  | "import"
  | "forms"
  | "how-it-works"
  | "pricing-generate"
  | "pricing-control"
  | "closing"
  | "footer";

// The app's sign-up reads exactly these keys and trims each value to 100
// characters (contourna-frontend `features/Signup/signupAttribution.ts`).
const UTM_KEYS = ["source", "medium", "campaign", "term", "content"] as const;
const UTM_MAX_LENGTH = 100;
const STORAGE_KEY = "contourna.signupUtm";

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function buildSignupUrl(from: SignupSource, utm: Utm = {}): string {
  const utmSearch = toSearch(utm);
  return `${appUrl}/signup?from=${from}${utmSearch ? `&${utmSearch}` : ""}`;
}

export function parseUtm(search: string): Utm {
  const params = new URLSearchParams(search);
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(`utm_${key}`)?.trim();
    if (value) utm[key] = value.slice(0, UTM_MAX_LENGTH);
  }
  return utm;
}

function toSearch(utm: Utm): string {
  const params = new URLSearchParams();
  for (const key of UTM_KEYS) {
    const value = utm[key];
    if (value) params.set(`utm_${key}`, value);
  }
  return params.toString();
}

/**
 * UTM tags from the URL the visitor is on, or, once they've moved to a page
 * without them, the tags from the page they landed on this session.
 */
export function currentUtm(): Utm {
  const fromUrl = parseUtm(window.location.search);
  try {
    if (Object.keys(fromUrl).length) {
      window.sessionStorage.setItem(STORAGE_KEY, toSearch(fromUrl));
      return fromUrl;
    }
    return parseUtm(window.sessionStorage.getItem(STORAGE_KEY) ?? "");
  } catch {
    // Storage can be blocked; the landing page's own links still get the tags.
    return fromUrl;
  }
}
