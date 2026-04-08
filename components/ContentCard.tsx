'use client';

import { useState } from 'react';
import { Eye, Trash2, Copy, Download } from 'lucide-react';
import { useContentStore } from '@/lib/store';

interface ContentCardProps {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  createdAt: string;
  quotes?: string[];
  bullets?: string[];
  stats?: string[];
  topics?: string[];
}

export default function ContentCard({
  id,
  title,
  text,
  wordCount,
  createdAt,
  quotes = [],
  bullets = [],
  topics = [],
}: ContentCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const removeContent = useContentStore((state) => state.removeContent);

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-accent transition">
            {title}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {formattedDate} • {wordCount} words
          </p>
        </div>
      </div>

      {/* Topics/Tags */}
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
            >
              #{topic}
            </span>
          ))}
        </div>
      )}

      {/* Extracted Data Preview */}
      {(quotes.length > 0 || bullets.length > 0) && (
        <div className="bg-slate-900/50 rounded-lg p-3 mb-3 space-y-2">
          {quotes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-1">💡 Key Quotes</p>
              <p className="text-sm text-slate-300 italic line-clamp-2">
                "{quotes[0]}"
              </p>
            </div>
          )}
          {bullets.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-300 mb-1">📌 Main Ideas</p>
              <ul className="text-sm text-slate-300 space-y-1">
                {bullets.slice(0, 2).map((bullet, i) => (
                  <li key={i} className="line-clamp-1">
                    • {bullet}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Preview of content */}
      <p className="text-slate-300 text-sm mb-4 line-clamp-2">{text.substring(0, 150)}...</p>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition"
          title="Download as text"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => removeContent(id)}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-red-900/50 hover:bg-red-900 rounded-lg text-sm font-medium transition text-red-300"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Full Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
              {text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
