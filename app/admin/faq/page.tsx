// app/admin/faq/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditFaqModal } from "@/components/admin/EditFAQModal";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    order: number;
}

export default function AdminFaqPage() {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<FaqItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchFaqs = async () => {
        const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("sort_order", { ascending: true });

        if (!error && data) setFaqs(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    return (
        <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">💬 FAQ Content</h1>

        {loading ? (
            <p className="text-muted-foreground">Loading...</p>
        ) : (
            <div className="space-y-4">
            {faqs.map((faq) => (
                <div
                key={faq.id}
                className="border p-4 rounded-md bg-white shadow-sm"
                >
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{faq.question}</h2>
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setSelected(faq);
                        setIsModalOpen(true);
                    }}
                    >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                </div>
                <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
                    {faq.answer}
                </p>
                </div>
            ))}
            </div>
        )}

        {/* ✏️ 수정 모달 */}
        <EditFaqModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            item={selected}
            onSave={fetchFaqs}
        />
        </div>
    );
}
