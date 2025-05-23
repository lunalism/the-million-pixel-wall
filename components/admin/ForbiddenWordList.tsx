// components/admin/ForbiddenWordList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface WordItem {
    word: string;
    category: string;
}

interface ForbiddenWordListProps {
    words: WordItem[];
    onDelete: (word: string) => void;
}

export function ForbiddenWordList({ words, onDelete }: ForbiddenWordListProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = Array.from(new Set(words.map((w) => w.category)));

    const filtered =
        selectedCategory === "all"
        ? words
        : words.filter((w) => w.category === selectedCategory);

    return (
        <div className="space-y-4">
            <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex flex-wrap">
                <TabsTrigger value="all">All</TabsTrigger>
                    {categories.map((cat) => (
                        <TabsTrigger key={cat} value={cat}>
                            {cat}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground">No results found.</p>
            ) : (
                <ul className="space-y-2">
                    {filtered.map((item) => (
                        <li
                        key={item.word}
                        className="flex justify-between items-center border rounded px-3 py-2"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{item.word}</span>
                                <Badge variant="outline" className="mt-1 w-fit text-xs">{item.category}</Badge>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => onDelete(item.word)}>
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
