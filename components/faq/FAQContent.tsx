// components/faq/FAQContent.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export function FAQContent() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Supabase에서 FAQ 데이터를 불러오는 함수
  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Failed to fetch FAQs:", error);
      } else {
        setFaqs(data || []);
      }
      setLoading(false);
    };

    fetchFaqs();
  }, []);

  return (
    <section className="max-w-screen-md mx-auto px-4 md:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading FAQs...</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
              <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </section>
  );
}
