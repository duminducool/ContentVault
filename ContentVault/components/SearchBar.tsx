'use client';

import { Search, X } from 'lucide-react';
import { useContentStore } from '@/lib/store';

export default function SearchBar() {
  const searchTerm = useContentStore((state) => state.searchTerm);
  const setSearchTerm = useContentStore((state) => state.setSearchTerm);

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
      <input
        type="text"
        placeholder="Search by title, content, or topic..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-accent transition"
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-3 top-3 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
