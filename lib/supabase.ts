import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadContent = async (
  userId: string,
  title: string,
  text: string
) => {
  const wordCount = text.split(/\s+/).length;
  
  const { data, error } = await supabase
    .from('content')
    .insert([
      {
        user_id: userId,
        title,
        text,
        word_count: wordCount,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

export const fetchUserContent = async (userId: string) => {
  const { data, error } = await supabase
    .from('content')
    .select('*, metadata(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const extractMetadata = (text: string) => {
  // Simple extraction logic (can be enhanced with Hugging Face later)
  
  // Extract sentences that could be quotes (10-25 words)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const quotes = sentences
    .filter((s) => s.trim().split(/\s+/).length >= 10 && s.trim().split(/\s+/).length <= 25)
    .slice(0, 3)
    .map((s) => s.trim());

  // Extract main ideas (sentences with power words)
  const powerWords = ['never', 'always', 'only', 'exactly', 'must', 'should', 'crucial', 'essential'];
  const bullets = sentences
    .filter((s) => powerWords.some((w) => s.toLowerCase().includes(w)))
    .slice(0, 3)
    .map((s) => s.trim());

  // Extract statistics (numbers and percentages)
  const stats = text.match(/\d+%|[\d,]+\s+(?:out of|of|per)/gi) || [];

  // Auto-tag based on keywords
  const keywords: Record<string, string[]> = {
    'coding': ['react', 'javascript', 'node', 'python', 'api', 'database'],
    'fitness': ['calories', 'workout', 'gym', 'exercise', 'strength', 'cardio'],
    'marketing': ['seo', 'content', 'traffic', 'conversion', 'audience', 'engagement'],
    'productivity': ['time', 'efficient', 'workflow', 'focus', 'system', 'routine'],
    'business': ['revenue', 'growth', 'startup', 'funding', 'scale', 'customer'],
  };

  const topics = new Set<string>();
  Object.entries(keywords).forEach(([topic, words]) => {
    if (words.some((w) => text.toLowerCase().includes(w))) {
      topics.add(topic);
    }
  });

  return {
    quotes: quotes.slice(0, 3),
    bullets: bullets.slice(0, 3),
    stats: stats.slice(0, 3),
    topics: Array.from(topics),
  };
};
