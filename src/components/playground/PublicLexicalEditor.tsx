"use client";

import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import type { EditorState } from "lexical";
import { useCallback } from "react";

import { EditorToolbar } from "./EditorToolbar";

// Mirrors the SHARED_TYPOGRAPHY theme in the frontend app's editor
// (c-gold accents mapped to c-yellow — the marketing palette has no gold token).
const editorTheme = {
  root: "min-h-[480px] px-5 py-4 font-sans leading-relaxed text-c-brown outline-none",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline decoration-c-brown/40 underline-offset-2",
    code: "rounded border border-c-brown/10 bg-c-brown/[0.06] px-1.5 py-0.5 font-mono text-[0.9em] text-c-brown",
  },
  heading: {
    h1: "mb-3 mt-8 text-[2.25rem] font-bold leading-[1.15] tracking-tight text-c-brown",
    h2: "mb-2 mt-7 text-2xl font-bold leading-snug tracking-tight text-c-brown",
    h3: "mb-1.5 mt-5 text-lg font-semibold leading-snug tracking-tight text-c-brown",
  },
  paragraph: "my-3 leading-relaxed text-c-brown/90",
  quote:
    "my-5 rounded-r-md border-l-[3px] border-c-yellow/50 bg-c-yellow/[0.06] py-2.5 pl-5 pr-4 italic text-c-brown/80",
  link: "text-c-yellow underline decoration-c-yellow/40 underline-offset-2 transition-colors hover:decoration-c-yellow",
  hr: "my-6 border-c-brown/15",
  list: {
    ul: "my-3 list-disc pl-6 marker:text-c-brown/40",
    ol: "my-3 list-decimal pl-6 marker:text-c-brown/50",
    listitem: "my-1 pl-1.5 leading-relaxed",
    nested: { listitem: "list-none" },
  },
  table: "my-5 w-full border-collapse",
  tableCell: "border border-c-brown/20 p-2.5 align-top font-normal outline-none",
  tableCellHeader: "border border-c-brown/20 bg-c-yellow-light p-2.5 font-semibold",
  tableRow: "",
};

interface PublicLexicalEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export function PublicLexicalEditor({ initialContent, onChange }: PublicLexicalEditorProps) {
  const handleChange = useCallback(
    (editorState: EditorState) => onChange(JSON.stringify(editorState.toJSON())),
    [onChange],
  );

  return (
    <LexicalComposer
      initialConfig={{
        namespace: "ContournaPublicEditor",
        theme: editorTheme,
        editorState: initialContent,
        nodes: [
          HeadingNode,
          QuoteNode,
          ListNode,
          ListItemNode,
          LinkNode,
          CodeNode,
          TableNode,
          TableRowNode,
          TableCellNode,
          HorizontalRuleNode,
        ],
        onError: (error: Error) => {
          throw error;
        },
      }}
    >
      <div className="relative min-h-[530px] bg-white">
        <EditorToolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable aria-label="Document content" />}
          placeholder={
            <div className="pointer-events-none absolute left-5 top-16 text-sm text-c-grey-light">
              Start editing your draft...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <TablePlugin />
        <TabIndentationPlugin />
        <MarkdownShortcutPlugin />
        <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
      </div>
    </LexicalComposer>
  );
}
