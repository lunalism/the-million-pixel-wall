// app/about/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AboutPage() {
  const { lang } = useLanguage();
  const supabase = createClientComponentClient();
  const [content, setContent] = useState<string | null>(null);

  // Supabase에서 다국어 콘텐츠 fetch
  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('about')
        .select('value')
        .eq('lang', lang)
        .single();

      if (error) {
        console.error('Supabase fetch error:', error);
        setContent('⚠️ Failed to load about content.');
        return;
      }

      setContent(data?.value ?? '📭 No content available.');
    };

    fetchContent();
  }, [lang, supabase]);

  return (
    <main className="min-h-screen bg-white py-20 px-6 flex justify-center items-start">
      <article className="prose prose-sm sm:prose lg:prose-lg max-w-3xl text-black">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p>Loading...</p>
        )}
      </article>
    </main>
  );
}
