"use client";

import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { Bold, Heading1, Italic, List, ListOrdered, Redo2, RemoveFormatting, Undo2 } from "lucide-react";

interface ToolbarButtonProps {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

function ToolbarButton({ label, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-c-brown transition-colors hover:bg-c-yellow-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow"
    >
      {children}
    </button>
  );
}

export function EditorToolbar() {
  const [editor] = useLexicalComposerContext();

  const setHeading = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) $setBlocksType(selection, () => $createHeadingNode("h1"));
    });
  };

  const setParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) $setBlocksType(selection, () => $createParagraphNode());
    });
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };

  return (
    <div
      role="toolbar"
      aria-label="Document formatting"
      className="sticky top-0 z-10 flex min-h-12 items-center gap-1 overflow-x-auto border-b border-c-brown/10 bg-white px-2 py-1"
    >
      <ToolbarButton label="Undo" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-c-brown/10" aria-hidden="true" />
      <ToolbarButton label="Heading" onClick={setHeading}>
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Bold" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Bullet list" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Paragraph" onClick={setParagraph}>
        <RemoveFormatting className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}
