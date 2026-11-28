import { cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { SignupLink } from "../SignupLink";
import { buildSignupUrl, currentUtm, parseUtm } from "../signupLinks";

function visit(path: string) {
  window.history.replaceState(null, "", path);
}

afterEach(() => {
  cleanup();
  visit("/");
  window.sessionStorage.clear();
});

describe("buildSignupUrl", () => {
  it("names the spot the link sits in", () => {
    expect(buildSignupUrl("pricing-control")).toBe("https://app.contourna.com/signup?from=pricing-control");
  });

  it("adds UTM tags after from", () => {
    expect(buildSignupUrl("hero", { source: "linkedin", campaign: "spring launch" })).toBe(
      "https://app.contourna.com/signup?from=hero&utm_source=linkedin&utm_campaign=spring+launch",
    );
  });
});

describe("parseUtm", () => {
  it("keeps only the keys the app reads, trimmed and capped at 100 characters", () => {
    expect(parseUtm(`?utm_source=%20ads%20&utm_id=7&ref=x&utm_medium=&utm_term=${"a".repeat(150)}`)).toEqual({
      source: "ads",
      term: "a".repeat(100),
    });
  });
});

describe("currentUtm", () => {
  it("returns nothing when the visitor arrived without tags", () => {
    expect(currentUtm()).toEqual({});
  });

  it("keeps the landing page's tags after the visitor moves to a page without them", () => {
    visit("/?utm_source=test&utm_medium=email");
    expect(currentUtm()).toEqual({ source: "test", medium: "email" });

    visit("/pricing");
    expect(currentUtm()).toEqual({ source: "test", medium: "email" });
  });

  it("replaces stored tags when the visitor lands again with new ones", () => {
    visit("/?utm_source=first&utm_campaign=a");
    currentUtm();
    visit("/?utm_source=second");
    currentUtm();
    visit("/");
    expect(currentUtm()).toEqual({ source: "second" });
  });
});

describe("SignupLink", () => {
  it("links to sign-up with from only when there are no UTM tags", () => {
    render(<SignupLink from="closing">Start free trial</SignupLink>);
    expect(screen.getByRole("link", { name: "Start free trial" })).toHaveAttribute(
      "href",
      "https://app.contourna.com/signup?from=closing",
    );
  });

  it("passes the landing URL's UTM tags through", () => {
    visit("/?utm_source=test");
    render(<SignupLink from="header">Start free trial</SignupLink>);
    expect(screen.getByRole("link", { name: "Start free trial" })).toHaveAttribute(
      "href",
      "https://app.contourna.com/signup?from=header&utm_source=test",
    );
  });

  it("server-renders the from-only link so it works without JavaScript", () => {
    visit("/?utm_source=test");
    expect(renderToString(<SignupLink from="hero">Start free trial</SignupLink>)).toContain(
      'href="https://app.contourna.com/signup?from=hero"',
    );
  });
});
