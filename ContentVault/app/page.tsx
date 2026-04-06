'use client';

import { useEffect } from 'react';
import UploadForm from '@/components/UploadForm';
import SearchBar from '@/components/SearchBar';
import ContentList from '@/components/ContentList';
import DashboardHeader from '@/components/DashboardHeader';
import { useContentStore } from '@/lib/store';

export default function Dashboard() {
  const content = useContentStore((state) => state.content);

  // Note: In production, you'd fetch from Supabase here
  // For now, this is a demo with local state

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-800/50 to-transparent border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-accent">ContentVault</h1>
            <div className="text-sm text-slate-400">
              {content.length} items stored
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Search */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <UploadForm />
              <div className="text-xs text-slate-500 space-y-2 bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <p className="font-semibold text-slate-400">💡 Pro Tips</p>
                <ul className="space-y-1">
                  <li>• Paste blog posts, transcripts, or articles</li>
                  <li>• AI auto-extracts quotes and ideas</li>
                  <li>• Search by keyword or topic</li>
                  <li>• Download content anytime</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Content List */}
          <div className="lg:col-span-2">
            <SearchBar />
            <ContentList />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-400">
          <p>ContentVault © 2026 • Organize, search, and repurpose your content</p>
        </div>
      </div>
    </div>
  );
}
