"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MailIcon } from "lucide-react";

type Faq = {
    id: string;
    question: string;
    answer: string;
};

export function FAQContent() {
    const [faqs, setFaqs] = useState<Faq[]>([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            const { data, error } = await supabase.from("faq").select("*").order("id");
            if (error) {
                console.error("Error fetching FAQs:", error);
            } else {
                setFaqs(data);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <section className="max-w-screen-xl mx-auto px-4 md:px-8 mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-[400px_1fr] gap-8 items-start">
                {/* 📬 연락처 섹션 */}
                <div className="bg-muted/50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Can&apos;t find your answer?</h3>
                    <p className="text-muted-foreground mb-4">
                        Feel free to reach out to us directly if your question isn&apos;t listed here.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <MailIcon className="w-4 h-4" />
                        <a href="mailto:hello@millionpixelwall.com" className="underline hover:no-underline">
                            chrisholic22@gmail.com
                        </a>
                    </div>
                </div>

                {/* 📖 FAQ 리스트 */}
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
