"use client";

import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, $isHeadingNode, type HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  type ElementFormatType,
  type TextFormatType,
} from "lexical";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

type BlockType = "paragraph" | HeadingTagType | "bullet" | "number";

interface ToolbarButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

function ToolbarButton({ label, onClick, isActive, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-yellow",
        isActive ? "bg-c-yellow-light text-c-brown" : "text-c-brown hover:bg-c-yellow-light",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px shrink-0 bg-c-brown/10" aria-hidden="true" />;
}

export function EditorToolbar() {
  const [editor] = useLexicalComposerContext();
  const [formats, setFormats] = useState({ bold: false, italic: false, underline: false });
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [alignment, setAlignment] = useState<ElementFormatType>("left");
  const [isLink, setIsLink] = useState(false);

  useEffect(
    () =>
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          setFormats({
            bold: selection.hasFormat("bold"),
            italic: selection.hasFormat("italic"),
            underline: selection.hasFormat("underline"),
          });

          const anchorNode = selection.anchor.getNode();
          const parent = anchorNode.getParent();
          setIsLink($isLinkNode(anchorNode) || $isLinkNode(parent));

          const element = anchorNode.getTopLevelElement();
          if ($isHeadingNode(element)) {
            setBlockType(element.getTag());
          } else if ($isListNode(element)) {
            setBlockType(element.getListType() === "number" ? "number" : "bullet");
          } else {
            setBlockType("paragraph");
          }
          setAlignment(element?.getFormatType() || "left");
        });
      }),
    [editor],
  );

  const formatText = (format: TextFormatType) => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);

  const setHeading = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () =>
          blockType === tag ? $createParagraphNode() : $createHeadingNode(tag),
        );
      }
    });
  };

  const setParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) $setBlocksType(selection, () => $createParagraphNode());
    });
    editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };

  const toggleList = (type: "bullet" | "number") => {
    if (blockType === type) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(
        type === "bullet" ? INSERT_UNORDERED_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
        undefined,
      );
    }
  };

  const toggleLink = () => {
    if (isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      return;
    }
    const url = window.prompt("Link URL");
    if (!url) return;
    const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, href);
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
      <Divider />
      <ToolbarButton label="Paragraph" onClick={setParagraph} isActive={blockType === "paragraph"}>
        <Pilcrow className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Heading 1" onClick={() => setHeading("h1")} isActive={blockType === "h1"}>
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Heading 2" onClick={() => setHeading("h2")} isActive={blockType === "h2"}>
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Heading 3" onClick={() => setHeading("h3")} isActive={blockType === "h3"}>
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
      <Divider />
      <ToolbarButton label="Bold" onClick={() => formatText("bold")} isActive={formats.bold}>
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Italic" onClick={() => formatText("italic")} isActive={formats.italic}>
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Underline" onClick={() => formatText("underline")} isActive={formats.underline}>
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Link" onClick={toggleLink} isActive={isLink}>
        <Link2 className="h-4 w-4" />
      </ToolbarButton>
      <Divider />
      <ToolbarButton label="Bullet list" onClick={() => toggleList("bullet")} isActive={blockType === "bullet"}>
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Numbered list" onClick={() => toggleList("number")} isActive={blockType === "number"}>
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>
      <Divider />
      <ToolbarButton label="Align left" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")} isActive={alignment === "left"}>
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Align center" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")} isActive={alignment === "center"}>
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label="Align right" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")} isActive={alignment === "right"}>
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}
