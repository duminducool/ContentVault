# Deployment Guide

## Option 1: Deploy to Netlify (Easiest) ⭐

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial ContentVault commit"
git remote add origin https://github.com/YOUR_USERNAME/contentvault.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Authorize → Choose `contentvault` repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Click "Deploy"

### Step 3: Add Environment Variables
1. In Netlify dashboard → Site settings → Build & deploy → Environment
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase key
3. Click "Deploy site"

**Your app is now live! 🎉**

---

## Option 2: Deploy to Vercel

### Step 1: Push to GitHub (same as above)

### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repo
4. Add environment variables (same as above)
5. Click "Deploy"

**Done!** Your app is live at `your-project.vercel.app`

---

## Option 3: Deploy to Railway

### Step 1: Sign up at railway.app

### Step 2: Create new project
- Select "Deploy from GitHub"
- Choose your `contentvault` repo
- Add environment variables
- Railway auto-deploys!

---

## Post-Deployment

### Set up Supabase Database
1. Go to your Supabase project
2. Create tables:
```sql
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  title VARCHAR(255),
  text TEXT,
  word_count INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Enable RLS for security
4. Create policies to allow users to see only their content

### Custom Domain
- In Netlify/Vercel settings, add your custom domain
- Update DNS records
- Wait for SSL certificate (automatic)

---

That's it! You now have ContentVault live on the internet. 🚀
