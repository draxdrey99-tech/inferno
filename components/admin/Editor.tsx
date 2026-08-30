'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { marked } from 'marked';

const BTN =
  'rounded px-2.5 py-1.5 text-[0.8125rem] font-medium text-bone/70 transition-colors hover:bg-white/8 hover:text-bone';
const BTN_ON = 'bg-flame/15 text-flame';

function Tb({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={`${BTN} ${active ? BTN_ON : ''}`}
    >
      {children}
    </button>
  );
}

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const [mode, setMode] = useState<'rich' | 'source'>('rich');
  const [source, setSource] = useState(value);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    // Required in Next: TipTap must not render during SSR.
    immediatelyRender: false,
    extensions: [
      // H1 is reserved for the post title, so the editor starts at H2.
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({
        HTMLAttributes: { loading: 'lazy', decoding: 'async' },
      }),
      Placeholder.configure({
        placeholder: 'Write the post… or switch to Source and paste Markdown.',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose-inferno min-h-[28rem] max-w-none focus:outline-none',
      },
    },
  });

  // Re-sync when the parent loads a different post into the editor.
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false });
      setSource(value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('Link URL', prev || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = '';
      if (!file || !editor) return;

      // Alt text is mandatory: an image with no alt is invisible to search
      // engines and to anyone using a screen reader.
      const alt = window.prompt(
        'Alt text (required) — describe the image for search engines and screen readers:'
      );
      if (!alt || alt.trim().length < 3) {
        window.alert('Alt text is required (at least 3 characters).');
        return;
      }

      try {
        setUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        editor.chain().focus().setImage({ src: data.url, alt: alt.trim() }).run();
      } catch (err) {
        window.alert(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [editor]
  );

  function applySource() {
    const text = source.trim();
    // Anything that doesn't open with a tag is treated as Markdown, which is
    // what you want when pasting from a doc or an AI draft.
    const html = /^\s*</.test(text) ? text : (marked.parse(text) as string);
    editor?.commands.setContent(html, { emitUpdate: false });
    onChange(html);
    setMode('rich');
  }

  if (!editor) {
    return (
      <div className="rounded-lg border border-white/10 bg-ink p-6 text-[0.875rem] text-mute">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-ink">
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 px-3 py-2">
        <Tb onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <strong>B</strong>
        </Tb>
        <Tb onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <em>I</em>
        </Tb>
        <span className="mx-1 h-4 w-px bg-white/12" />
        <Tb onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
          H2
        </Tb>
        <Tb onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
          H3
        </Tb>
        <span className="mx-1 h-4 w-px bg-white/12" />
        <Tb onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          • List
        </Tb>
        <Tb onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
          1. List
        </Tb>
        <Tb onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
          Quote
        </Tb>
        <Tb onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
          Code
        </Tb>
        <span className="mx-1 h-4 w-px bg-white/12" />
        <Tb onClick={setLink} active={editor.isActive('link')} title="Add link">
          Link
        </Tb>
        <Tb onClick={() => fileRef.current?.click()} title="Insert image">
          {uploading ? 'Uploading…' : 'Image'}
        </Tb>
        <Tb onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
          —
        </Tb>

        <div className="ml-auto flex items-center gap-1">
          <Tb
            onClick={() => {
              if (mode === 'rich') setSource(editor.getHTML());
              setMode(mode === 'rich' ? 'source' : 'rich');
            }}
            active={mode === 'source'}
            title="Toggle HTML / Markdown source"
          >
            {mode === 'rich' ? 'Source' : 'Rich text'}
          </Tb>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={addImage}
          className="hidden"
        />
      </div>

      {mode === 'rich' ? (
        <div className="px-5 py-6">
          <EditorContent editor={editor} />
        </div>
      ) : (
        <div className="p-4">
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            className="h-[28rem] w-full resize-y rounded border border-white/10 bg-ink-soft p-4 font-mono text-[0.8125rem] leading-relaxed text-bone outline-none focus:border-flame"
            placeholder="Paste HTML or Markdown here, then press Apply."
          />
          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={applySource} className="btn btn-flame px-5 py-2 text-[0.8125rem]">
              Apply
            </button>
            <p className="text-[0.8125rem] text-mute">
              Markdown is auto-converted. HTML is sanitised on save.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
