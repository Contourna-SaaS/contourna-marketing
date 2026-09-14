// Run against a production build: npm run build && npm start -- --port 3101
// Usage: node scripts/check-playground-navigation.mjs http://localhost:3101
import { execFileSync } from "node:child_process";

const origin = process.argv[2] || "http://localhost:3101";
const session = `playground-navigation-${process.pid}`;
function browser(...args) {
  return execFileSync("npx", ["--yes", "agent-browser", "--session", session, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}
function assertPage(expression) {
  if (browser("eval", expression).trim() !== "true") {
    throw new Error(`Playground assertion failed: ${expression}`);
  }
}

try {
  browser("open", `${origin}/playground?step=choose&utm_source=navigation-test`);
  browser("find", "role", "radio", "click", "--name", "Policy Set clear expectations and principles for everyone in your organization.");
  browser("find", "role", "button", "click", "--name", "Continue");
  browser("wait", "--text", "Customize the example");
  assertPage('new URLSearchParams(location.search).get("step") === "customize"');
  browser("fill", "#playground-name", "Navigation regression policy");
  browser("find", "role", "button", "click", "--name", "Continue");
  browser("wait", "--text", "Review and generate");
  assertPage('document.body.innerText.includes("Navigation regression policy")');
  browser("back");
  browser("wait", "--text", "Customize the example");
  assertPage('document.querySelector("#playground-name").value === "Navigation regression policy"');
  browser("forward");
  browser("wait", "--text", "Review and generate");
  browser("find", "role", "button", "click", "--name", "Start over");
  browser("wait", "--text", "What would you like to create?");
  assertPage('document.querySelectorAll(\'[role="radio"][aria-checked="true"]\').length === 0');
  assertPage('new URLSearchParams(location.search).get("utm_source") === "navigation-test"');
  browser("open", `${origin}/playground?step=review`);
  browser("wait", "--text", "What would you like to create?");
  assertPage('new URLSearchParams(location.search).get("step") === "choose"');
  console.log("PASS: choose → details → review, browser history, edited values, reset, and direct links");
} finally {
  browser("close");
}
