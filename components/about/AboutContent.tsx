"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type About = {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  heading: string;
  content: string;
  order_index: number;
};

export function AboutContent() {
    const [sections, setSections] = useState<About[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
        const { data, error } = await supabase
            .from("about")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) {
            console.error("❌ Failed to load about sections:", error);
        } else {
            setSections(data);
        }

        setLoading(false);
        };

        fetchSections();
  }, []);

  const defaultValue = sections[0]?.slug || "";

  if (loading) {
    return <div className="text-muted-foreground px-4 py-8">Loading...</div>;
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-8 mt-12 pb-24">
        <h2 className="text-2xl font-bold mb-6">About This Project</h2>

        <Tabs defaultValue={defaultValue} className="w-full grid md:grid-cols-4 gap-8 items-start">
            {/* 탭 메뉴 */}
            <TabsList className="flex flex-col items-start space-y-6 col-span-1 bg-transparent mt-20">
            {sections.map((section) => (
                <TabsTrigger
                key={section.slug}
                value={section.slug}
                className="justify-start px-4 py-2 rounded-md hover:bg-muted data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                {section.emoji} {section.title}
                </TabsTrigger>
            ))}
            </TabsList>

            {/* 탭 컨텐츠 */}
            <div className="col-span-3">
            {sections.map((section) => (
                <TabsContent key={section.slug} value={section.slug}>
                    <h3 className="text-lg font-semibold mb-2">{section.heading}</h3>
                    <div
                        className="text-muted-foreground leading-relaxed space-y-2"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                </TabsContent>
            ))}
            </div>
        </Tabs>
    </section>
  );
}
