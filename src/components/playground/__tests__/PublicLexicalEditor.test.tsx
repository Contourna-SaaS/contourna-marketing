import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { PublicLexicalEditor } from "../PublicLexicalEditor";

function textNode(text: string) {
  return { detail: 0, format: 0, mode: "normal", style: "", text, type: "text", version: 1 };
}

const content = JSON.stringify({
  root: {
    children: [
      {
        children: [textNode("Purpose")],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "heading",
        version: 1,
        tag: "h1",
      },
      {
        children: [textNode("Keep the workplace safe.")],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

test("renders the backend Lexical contract in the public editor", () => {
  render(<PublicLexicalEditor initialContent={content} onChange={vi.fn()} />);
  const editor = screen.getByRole("textbox", { name: "Document content" });
  expect(editor).toHaveTextContent("Purpose");
  expect(editor).toHaveTextContent("Keep the workplace safe.");
  expect(screen.getByRole("toolbar", { name: "Document formatting" })).toBeInTheDocument();
});
