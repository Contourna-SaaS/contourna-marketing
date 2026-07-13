import { describe, expect, test } from "vitest";

import { extractPlaygroundSections } from "../editorContent";

describe("extractPlaygroundSections", () => {
  test("extracts top-level H1 headings", () => {
    const content = JSON.stringify({
      root: {
        children: [
          { type: "heading", tag: "h1", children: [{ type: "text", text: "Purpose" }] },
          { type: "paragraph", children: [{ type: "text", text: "Details" }] },
          { type: "heading", tag: "h1", children: [{ type: "text", text: "Responsibilities" }] },
        ],
      },
    });

    expect(extractPlaygroundSections(content)).toEqual([
      { id: "section-h1-0", title: "Purpose" },
      { id: "section-h1-2", title: "Responsibilities" },
    ]);
  });

  test("returns an empty list for invalid content", () => {
    expect(extractPlaygroundSections("invalid-json")).toEqual([]);
  });
});
