"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  FiBold, FiItalic, FiUnderline, FiType, FiList, FiMinus,
  FiCornerUpLeft, FiCornerUpRight, FiLink, FiImage,
} from "react-icons/fi";
import { FaListOl, FaQuoteRight } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Write something amazing...",
  className = "",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2] } }),
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 w-full h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 rounded-t-lg">
        {/* Toolbar buttons (bold, italic, etc) */}
        <ToolbarButton editor={editor} action="bold" icon={<FiBold />} />
        <ToolbarButton editor={editor} action="italic" icon={<FiItalic />} />
        <ToolbarButton editor={editor} action="underline" icon={<FiUnderline />} />
        <Divider />
        <ToolbarButton editor={editor} action="heading" icon={<FiType />} options={{ level: 2 }} />
        <ToolbarButton editor={editor} action="bulletList" icon={<FiList />} />
        <ToolbarButton editor={editor} action="orderedList" icon={<FaListOl />} />
        <Divider />
        <ToolbarButton editor={editor} action="blockquote" icon={<FaQuoteRight />} />
        <ToolbarButton editor={editor} action="codeBlock" icon={<BsCodeSlash />} />
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Horizontal Rule"
        >
          <FiMinus />
        </button>
        <Divider />
        <button
          onClick={setLink}
          className={`p-2 rounded-md ${editor.isActive("link")
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
          title="Link"
        >
          <FiLink />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Image"
        >
          <FiImage />
        </button>
        <Divider />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 ${!editor.can().undo() ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Undo"
        >
          <FiCornerUpLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 ${!editor.can().redo() ? "opacity-50 cursor-not-allowed" : ""}`}
          title="Redo"
        >
          <FiCornerUpRight />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className={`w-full min-h-[400px] p-4 focus:outline-none prose dark:prose-invert max-w-none ${className}`}
      />
    </div>
  );
}

function ToolbarButton({ editor, action, icon, options = {} }) {
  const isActive = editor.isActive(action, options);
  return (
    <button
      onClick={() => editor.chain().focus()[`toggle${capitalize(action)}`](options).run()}
      className={`p-2 rounded-md ${isActive
        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"}`}
      title={capitalize(action)}
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-1" />;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
