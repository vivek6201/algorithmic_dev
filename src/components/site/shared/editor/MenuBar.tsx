"use client";
import React, { useRef } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Pilcrow,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  FileJson,
  TableOfContents,
  Video,
  Youtube,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const addImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320) || 640,
        height: Math.max(180) || 480,
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, upload to a storage service
      // For demo purposes, we're creating an object URL
      const imageUrl = URL.createObjectURL(file);
      addImage(imageUrl);
      e.target.value = ""; // Reset input
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, upload to a storage service
      // For demo purposes, we're creating an object URL
      const videoUrl = URL.createObjectURL(file);
      // Insert video HTML
      editor
        .chain()
        .focus()
        .insertContent(
          `<video controls src="${videoUrl}" style="max-width: 100%"></video>`,
        )
        .run();
      e.target.value = ""; // Reset input
    }
  };

  const insertTableOfContents = () => {
    // Insert a marker for table of contents that will be processed when rendering
    editor
      .chain()
      .focus()
      .insertContent('<div class="table-of-contents-marker"></div>')
      .run();
  };

  const insertJsonBlock = () => {
    // Insert a pre-formatted JSON block
    editor
      .chain()
      .focus()
      .insertContent('<pre class="language-json">{}</pre>')
      .run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn("p-2 h-auto", editor.isActive("bold") ? "bg-muted" : "")}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("italic") ? "bg-muted" : "",
        )}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("heading", { level: 1 }) ? "bg-muted" : "",
        )}
        aria-label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("heading", { level: 2 }) ? "bg-muted" : "",
        )}
        aria-label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("bulletList") ? "bg-muted" : "",
        )}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("orderedList") ? "bg-muted" : "",
        )}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("paragraph") ? "bg-muted" : "",
        )}
        aria-label="Paragraph"
      >
        <Pilcrow className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          "p-2 h-auto",
          editor.isActive("codeBlock") ? "bg-muted" : "",
        )}
        aria-label="Code Block"
      >
        <Code className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={insertJsonBlock}
        className="p-2 h-auto"
        aria-label="JSON Block"
      >
        <FileJson className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addYoutubeVideo}
        className="p-2 h-auto"
        aria-label="Youtube Video"
      >
        <Youtube className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={insertTableOfContents}
        className="p-2 h-auto"
        aria-label="Table of Contents"
      >
        <TableOfContents className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 h-auto"
        aria-label="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 h-auto"
        aria-label="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "p-2 h-auto",
              editor.isActive("link") ? "bg-muted" : "",
            )}
            aria-label="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-2">
            <h4 className="font-medium">Insert Link</h4>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full p-2 border rounded"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    editor
                      .chain()
                      .focus()
                      .setLink({ href: target.value })
                      .run();
                    target.value = "";
                    document.body.click(); // Close popover
                  }
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => imageInputRef.current?.click()}
        className="p-2 h-auto"
        aria-label="Image"
      >
        <ImageIcon className="h-4 w-4" />
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => videoInputRef.current?.click()}
        className="p-2 h-auto"
        aria-label="Video"
      >
        <Video className="h-4 w-4" />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoUpload}
        />
      </Button>
    </div>
  );
};

export default MenuBar;
