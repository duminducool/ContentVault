'use client';

import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { useContentStore } from '@/lib/store';
import { extractMetadata } from '@/lib/supabase';

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addContent = useContentStore((state) => state.addContent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;

    setIsLoading(true);
    try {
      const metadata = extractMetadata(text);
      const wordCount = text.split(/\s+/).length;
      const newContent = {
        id: Date.now().toString(),
        title,
        text,
        wordCount,
        createdAt: new Date().toISOString(),
        ...metadata,
      };
      addContent(newContent);
      setTitle('');
      setText('');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-accent" />
        Add New Content
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Content Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-accent"
        />
        <textarea
          placeholder="Paste your content here (blog post, article, transcript, etc.)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-accent font-mono text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !title.trim() || !text.trim()}
          className="w-full py-2 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {isLoading ? 'Processing...' : 'Add to Vault'}
        </button>
      </form>
    </div>
  );
}
