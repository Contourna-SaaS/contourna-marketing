export interface PlaygroundDocumentSection {
  id: string;
  title: string;
}

interface SerializedNode {
  type?: unknown;
  tag?: unknown;
  text?: unknown;
  children?: unknown;
}

export function extractPlaygroundSections(lexicalContent: string): PlaygroundDocumentSection[] {
  try {
    const parsed = JSON.parse(lexicalContent) as { root?: { children?: SerializedNode[] } };
    const nodes = parsed.root?.children;
    if (!Array.isArray(nodes)) return [];

    return nodes.flatMap((node, index) => {
      if (node.type !== "heading" || node.tag !== "h1") return [];
      const children = Array.isArray(node.children) ? (node.children as SerializedNode[]) : [];
      const title = children
        .map((child) => (typeof child.text === "string" ? child.text : ""))
        .join("")
        .trim();
      return [{ id: `section-h1-${index}`, title: title || `Untitled Section ${index + 1}` }];
    });
  } catch {
    return [];
  }
}

// The product editor has custom nodes that the public editor does not ship.
// Preserve their content using standard editable nodes rather than letting
// Lexical abort the entire preview on an unregistered node type.
export function preparePlaygroundEditorContent(content: string): string {
  const state = JSON.parse(content) as { root?: { children?: unknown[] } };
  if (!state.root || !Array.isArray(state.root.children)) {
    throw new Error("This draft could not be opened. Start over to generate another document.");
  }
  const text = (value: string) => ({
    type: "text", version: 1, detail: 0, format: 0, mode: "normal", style: "", text: value,
  });
  const paragraph = (value: string) => ({
    type: "paragraph", version: 1, direction: "ltr", format: "", indent: 0,
    children: [text(value)],
  });
  const convert = (value: unknown): unknown[] => {
    if (!value || typeof value !== "object") throw new Error("Invalid document node");
    const node = value as Record<string, unknown>;
    if (node.type === "diagram") {
      return [paragraph(String(node.caption || node.altText || "Diagram")), {
        type: "code", version: 1, direction: "ltr", format: "", indent: 0,
        language: "mermaid", children: [text(String(node.source || ""))],
      }];
    }
    if (node.type === "image") return [paragraph([node.altText || "Image", node.src].filter(Boolean).join(": "))];
    if (node.type === "mention") return [text(String(node.mentionName || "Team member"))];
    const children = Array.isArray(node.children) ? node.children.flatMap(convert) : undefined;
    if (node.type === "layout-container" || node.type === "layout-item") return children || [];
    return [{ ...node, ...(children ? { children } : {}) }];
  };
  return JSON.stringify({ ...state, root: { ...state.root, children: state.root.children.flatMap(convert) } });
}
