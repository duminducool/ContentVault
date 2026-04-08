import { create } from 'zustand';

interface Content {
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

interface ContentStore {
  content: Content[];
  setContent: (content: Content[]) => void;
  addContent: (item: Content) => void;
  removeContent: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredContent: () => Content[];
}

export const useContentStore = create<ContentStore>((set, get) => ({
  content: [],
  setContent: (content) => set({ content }),
  addContent: (item) => set((state) => ({ content: [item, ...state.content] })),
  removeContent: (id) =>
    set((state) => ({
      content: state.content.filter((item) => item.id !== id),
    })),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  filteredContent: () => {
    const state = get();
    if (!state.searchTerm) return state.content;
    const term = state.searchTerm.toLowerCase();
    return state.content.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.text.toLowerCase().includes(term) ||
        item.topics?.some((topic) => topic.toLowerCase().includes(term))
    );
  },
}));
