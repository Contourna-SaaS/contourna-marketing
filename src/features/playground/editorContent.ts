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
