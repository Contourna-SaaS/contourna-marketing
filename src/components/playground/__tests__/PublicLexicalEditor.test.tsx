import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";

import { PublicLexicalEditor } from "../PublicLexicalEditor";

afterEach(cleanup);

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


test("opens generated diagrams and columns without losing their text", () => {
  const state = JSON.parse(content);
  state.root.children.push({
    type: "layout-container", version: 1, templateColumns: "1fr 1fr",
    children: [{ type: "layout-item", version: 1, children: [{
      type: "paragraph", version: 1, children: [textNode("Column instructions")],
    }] }],
  }, {
    type: "diagram", version: 1, syntax: "mermaid", diagramType: "flowchart",
    source: "flowchart TD\nA[Start] --> B[Check]", altText: "Safety workflow",
  });
  render(<PublicLexicalEditor initialContent={JSON.stringify(state)} onChange={vi.fn()} />);
  const editor = screen.getByRole("textbox", { name: "Document content" });
  expect(editor).toHaveTextContent("Column instructions");
  expect(editor).toHaveTextContent("Safety workflow");
  expect(editor).toHaveTextContent("A[Start] --> B[Check]");
});
