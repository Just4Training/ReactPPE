// my-nextjs-app/src/app/components/RichTextEditor.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  contentType: 'richtext' | 'markdown' | 'html';
}

export default function RichTextEditor({ value, onChange, contentType }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // For richtext mode, we'll use a simple contentEditable div
  // For production, consider using libraries like:
  // - TipTap, Slate, Quill, or Draft.js for richtext
  // - react-markdown for markdown preview

  const renderEditor = () => {
    if (contentType === 'richtext') {
      return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex gap-2">
            <button
              onClick={() => document.execCommand('bold')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              onClick={() => document.execCommand('italic')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Italic"
            >
              <em>I</em>
            </button>
            <button
              onClick={() => document.execCommand('underline')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Underline"
            >
              <u>U</u>
            </button>
            <div className="w-px bg-gray-300 mx-2" />
            <button
              onClick={() => document.execCommand('formatBlock', false, 'h1')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              H1
            </button>
            <button
              onClick={() => document.execCommand('formatBlock', false, 'h2')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              H2
            </button>
            <button
              onClick={() => document.execCommand('formatBlock', false, 'p')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              P
            </button>
            <div className="w-px bg-gray-300 mx-2" />
            <button
              onClick={() => document.execCommand('insertUnorderedList')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              • List
            </button>
            <button
              onClick={() => document.execCommand('insertOrderedList')}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              1. List
            </button>
            <div className="w-px bg-gray-300 mx-2" />
            <button
              onClick={() => {
                const url = prompt('Enter URL:');
                if (url) document.execCommand('createLink', false, url);
              }}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              Link
            </button>
          </div>

          {/* Editor */}
          <div
            contentEditable
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            className="min-h-[400px] p-4 focus:outline-none prose prose-sm max-w-none"
            style={{ overflowY: 'auto' }}
          />
        </div>
      );
    }

    // For markdown and HTML, use Monaco Editor
    return (
      <div>
        <div className="flex border-b border-gray-300 mb-2">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-2 ${
              activeTab === 'edit'
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-600'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 ${
              activeTab === 'preview'
                ? 'border-b-2 border-blue-600 text-blue-600 font-medium'
                : 'text-gray-600'
            }`}
          >
            Preview
          </button>
        </div>

        {activeTab === 'edit' ? (
          <MonacoEditor
            height="500px"
            language={contentType === 'markdown' ? 'markdown' : 'html'}
            value={value}
            onChange={(val) => onChange(val || '')}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
              fontSize: 14,
            }}
          />
        ) : (
          <div className="border border-gray-300 rounded-lg p-4 min-h-[500px] overflow-auto bg-white">
            {contentType === 'markdown' ? (
              <div className="prose prose-sm max-w-none">
                {/* For production, use a proper markdown renderer like react-markdown */}
                <pre className="whitespace-pre-wrap">{value}</pre>
              </div>
            ) : (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return <div>{renderEditor()}</div>;
}