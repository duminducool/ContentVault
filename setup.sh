#!/bin/bash

# ContentVault Quick Start Script

echo "🚀 ContentVault - Quick Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Update .env.local with your Supabase credentials:"
    echo "   1. Go to https://supabase.com"
    echo "   2. Create a new project"
    echo "   3. Copy your Project URL and Anon Key"
    echo "   4. Paste them in .env.local"
    echo ""
fi

# Start dev server
echo "🎯 Starting development server..."
echo "📍 Your app will be available at http://localhost:3000"
echo ""

npm run dev
