'use client';

import { useContentStore } from '@/lib/store';
import { BarChart3, Archive, Zap } from 'lucide-react';

export default function DashboardHeader() {
  const content = useContentStore((state) => state.content);
  const totalWords = content.reduce((acc, item) => acc + item.wordCount, 0);
  const totalQuotes = content.reduce((acc, item) => acc + (item.quotes?.length || 0), 0);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
          ContentVault
        </h1>
        <p className="text-slate-400">
          Your personal library for everything you create
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Archive className="w-5 h-5 text-accent" />
            <p className="text-sm text-slate-400">Total Content</p>
          </div>
          <p className="text-3xl font-bold text-white">{content.length}</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            <p className="text-sm text-slate-400">Total Words</p>
          </div>
          <p className="text-3xl font-bold text-white">{totalWords.toLocaleString()}</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-accent" />
            <p className="text-sm text-slate-400">Key Insights</p>
          </div>
          <p className="text-3xl font-bold text-white">{totalQuotes}</p>
        </div>
      </div>
    </div>
  );
}
