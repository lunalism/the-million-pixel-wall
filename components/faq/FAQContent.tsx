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
                    <div className="flex flex-col gap-2 text-sm text-primary font-medium">
                        <div className="flex items-center gap-2">
                            <MailIcon className="w-4 h-4" />
                            <a href="mailto:chrisholic22@gmail.com" className="underline hover:no-underline">
                                chrisholic22@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.829 6.302c1.579.02 2.64.65 3.099 1.798l-6.899 4.262 2.033-6.06c.576-.014 1.096-.014 1.767 0zm6.312 1.902c.003.08.003.162.003.244 0 2.5-.947 4.776-2.66 6.51a9.155 9.155 0 0 1-6.396 2.64c-1.415 0-2.75-.333-3.93-.92a6.487 6.487 0 0 0 4.782-1.35 3.216 3.216 0 0 1-3-.221 3.224 3.224 0 0 1-1.419-2.104c.494.088.95.088 1.39-.052a3.218 3.218 0 0 1-2.55-3.158v-.04c.43.24.94.38 1.47.39a3.217 3.217 0 0 1-1-4.29 9.137 9.137 0 0 0 6.63 3.36 3.625 3.625 0 0 1-.088-.735 3.218 3.218 0 0 1 5.57-2.2 6.35 6.35 0 0 0 2.04-.777 3.214 3.214 0 0 1-1.41 1.776 6.338 6.338 0 0 0 1.85-.5 6.41 6.41 0 0 1-1.61 1.672z"/></svg>
                            <a href="https://x.com/lunaticholic" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                                @lunaticholic
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2.002c-5.525 0-10 4.475-10 10s4.475 10 10 10 10-4.475 10-10-4.475-10-10-10zm0 18.389c-4.636 0-8.39-3.754-8.39-8.39s3.754-8.39 8.39-8.39 8.39 3.754 8.39 8.39-3.754 8.39-8.39 8.39zm.001-13.2a4.81 4.81 0 1 0 0 9.619 4.81 4.81 0 0 0 0-9.619zm0 7.957a3.147 3.147 0 1 1 0-6.295 3.147 3.147 0 0 1 0 6.295z"/></svg>
                            <a href="https://instagram.com/lunalism" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                                @lunalism
                            </a>
                        </div>
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
