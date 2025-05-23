// components/admin/ForbiddenWordList.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WordItem {
    word: string;
    category: string;
}

interface ForbiddenWordListProps {
    words: WordItem[];
    onDelete: (word: string) => void;
}

export function ForbiddenWordList({ words, onDelete }: ForbiddenWordListProps) {
    if (words.length === 0) {
        return <p className="text-sm text-muted-foreground">No results found.</p>;
    }

    return (
        <ul className="space-y-2">
            {words.map((item) => (
                <li key={item.word} className="flex justify-between items-center border rounded px-3 py-2">
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
    );
}
