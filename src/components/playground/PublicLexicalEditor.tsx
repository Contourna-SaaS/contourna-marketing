"use client";

import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import type { EditorState } from "lexical";
import { useCallback } from "react";

import { EditorToolbar } from "./EditorToolbar";

const editorTheme = {
  root: "min-h-[480px] px-5 py-4 text-c-brown outline-none",
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline underline-offset-2",
    code: "rounded bg-c-brown/5 px-1 font-mono text-sm",
  },
  heading: {
    h1: "mb-3 mt-8 text-3xl font-bold leading-tight text-c-brown",
    h2: "mb-2 mt-7 text-2xl font-bold leading-snug text-c-brown",
    h3: "mb-2 mt-5 text-lg font-semibold text-c-brown",
  },
  paragraph: "my-3 leading-7 text-c-brown/90",
  quote: "my-5 border-l-4 border-c-yellow bg-c-yellow-light px-5 py-3 italic text-c-brown/80",
  link: "text-c-green underline underline-offset-2",
  list: {
    ul: "my-3 list-disc pl-6",
    ol: "my-3 list-decimal pl-6",
    listitem: "my-1 pl-1 leading-7",
    nested: { listitem: "list-none" },
  },
  table: "my-5 w-full border-collapse",
  tableCell: "border border-c-brown/20 p-2 align-top",
  tableCellHeader: "border border-c-brown/20 bg-c-yellow-light p-2 font-semibold",
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
        <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
      </div>
    </LexicalComposer>
  );
}
