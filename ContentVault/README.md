# ContentVault 🏔️

A personal knowledge & content management system for creators. Upload your content once, extract insights automatically, search intelligently, and repurpose across platforms.

## ✨ Features

- **Smart Upload** — Paste or upload blog posts, transcripts, articles
- **Auto-Extraction** — AI extracts key quotes, main ideas, statistics
- **Intelligent Search** — Find content by keyword, topic, or theme
- **Quick Export** — Download content as text or PDF
- **Dark Theme** — Beautiful, focused UI
- **Real-time** — Instant updates across all devices (with Supabase)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works great)

### Setup

1. **Clone/Download this project**
   ```bash
   cd ContentVault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Go to [supabase.com](https://supabase.com)
   - Create a free project
   - Copy your `Project URL` and `Anon Key`
   - Create `.env.local` file in root:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Go to `http://localhost:3000`
   - Start uploading content!

## 📁 Project Structure

```
ContentVault/
├── app/              # Next.js app directory
│   ├── page.tsx      # Main dashboard
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── UploadForm.tsx
│   ├── SearchBar.tsx
│   ├── ContentCard.tsx
│   ├── ContentList.tsx
│   └── DashboardHeader.tsx
├── lib/              # Utilities & helpers
│   ├── store.ts      # Zustand state management
│   └── supabase.ts   # Supabase client
└── public/           # Static assets
```

## 🎯 How It Works

1. **Upload Content** → Paste text or upload file
2. **AI Analysis** → Auto-extracts quotes, ideas, stats, topics
3. **Smart Indexing** → Saved to your vault (Supabase)
4. **Search & Find** → Full-text + semantic search
5. **Extract & Use** → Copy, download, or repurpose

## 💡 Roadmap

- [ ] Semantic search (Hugging Face embeddings)
- [ ] Supabase real-time sync
- [ ] Multi-user collaboration
- [ ] Email newsletter generation
- [ ] Social media post generation
- [ ] Dark/Light theme toggle
- [ ] Mobile app
- [ ] Marketplace for templates

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Netlify / Vercel

## 📝 License

MIT

## 🤝 Support

Issues? Questions? Create an issue or reach out!

---

**Built with ❤️ for creators who want to own their content.**
