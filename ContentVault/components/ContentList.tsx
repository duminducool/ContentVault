'use client';

import { useContentStore } from '@/lib/store';
import ContentCard from './ContentCard';
import { FileText } from 'lucide-react';

export default function ContentList() {
  const filteredContent = useContentStore((state) => state.filteredContent());

  if (filteredContent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="w-16 h-16 text-slate-600 mb-4" />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          No content yet
        </h3>
        <p className="text-slate-400 max-w-md">
          Upload your first content piece to get started. Your library will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">
          {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'}
        </h2>
        <p className="text-sm text-slate-400">
          {filteredContent.reduce((acc, item) => acc + item.wordCount, 0).toLocaleString()} total words
        </p>
      </div>
      {filteredContent.map((item) => (
        <ContentCard key={item.id} {...item} />
      ))}
    </div>
  );
}
