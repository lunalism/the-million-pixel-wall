// app/admin/forbidden-words/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ForbiddenWordList } from "@/components/admin/ForbiddenWordList";

export default function ForbiddenWordsPage() {
    const [words, setWords] = useState<string[]>([]); // 전체 금지어 리스트
    const [newWord, setNewWord] = useState("");       // 새 금지어 입력값
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [confirmOpen, setConfirmOpen] = useState(false); // 삭제 확인 모달 상태
    const [selectedWord, setSelectedWord] = useState<string | null>(null); // 삭제 대상 단어

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

    const addWord = async () => {
        if (!newWord.trim()) return;
        const { error } = await supabase.from("forbidden_words").insert({ word: newWord.trim() });
        if (error) {
        toast.error("Failed to add word.");
        } else {
        toast.success("Word added.");
        setNewWord("");
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
            <h1 className="text-2xl font-bold">Manage Forbidden Words</h1>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2 flex-1">
                <Input
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Enter new word"
                />
                <Button onClick={addWord}>Add</Button>
                </div>
                <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="sm:w-64"
                />
            </div>

            {/* 🔍 금지어 리스트 */}
            <ForbiddenWordList words={filteredWords} onDelete={confirmDelete} />

            {/* 삭제 확인 모달 */}
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete "{selectedWord}"?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteWord}>Delete</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
