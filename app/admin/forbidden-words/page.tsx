// app/admin/forbidden-words/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ForbiddenWordList } from "@/components/admin/ForbiddenWordList";
import { ForbiddenWordDeleteModal } from "@/components/admin/ForbiddenWordDeleteModal";
import { ForbiddenWordAddDialog } from "@/components/admin/ForbiddenWordAddDialog";

export default function ForbiddenWordsPage() {
    const [words, setWords] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        const { data, error } = await supabase.from("forbidden_words").select("word");
        
        if (error) {
            toast.error("Failed to load forbidden words.");
        } else {
            setWords(data.map((item) => item.word));
        }
    };

    const addWord = async ({ word, category }: { word: string; category: string }) => {
        const { error } = await supabase.from("forbidden_words").insert({ word, category });
        
        if (error) {
          toast.error("Failed to add word.");
        } else {
          toast.success("Word added.");
          fetchWords();
        }
    };

    const confirmDelete = (word: string) => {
        setSelectedWord(word);
        setConfirmOpen(true);
    };

    const deleteWord = async () => {
        if (!selectedWord) return;
        
        const { error } = await supabase.from("forbidden_words").delete().eq("word", selectedWord);
        
        if (error) {
            toast.error("Failed to delete word.");
        } else {
            toast.success("Word deleted successfully.");
            fetchWords();
        }
        
        setConfirmOpen(false);
        setSelectedWord(null);
    };

    const filteredWords = words.filter((word) => word.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="max-w-xl mx-auto space-y-6 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Forbidden Words</h1>
                <ForbiddenWordAddDialog onAdd={addWord} />
            </div>

            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />

            <ForbiddenWordList words={filteredWords} onDelete={confirmDelete} />

            <ForbiddenWordDeleteModal
                open={confirmOpen}
                word={selectedWord}
                onConfirm={deleteWord}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
}
