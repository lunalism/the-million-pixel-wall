// components/admin/ForbiddenWordList.tsx
"use client";

import { Button } from "@/components/ui/button";

interface ForbiddenWordListProps {
    words: string[];
    onDelete: (word: string) => void;
}

export function ForbiddenWordList({ words, onDelete }: ForbiddenWordListProps) {
    if (words.length === 0) {
        return <p className="text-sm text-muted-foreground">No results found.</p>;
    }

    return (
        <ul className="space-y-2">
            {words.map((word) => (
                <li key={word} className="flex justify-between items-center border rounded px-3 py-2">
                    <span>{word}</span>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(word)}>
                        Delete
                    </Button>
                </li>
            ))}
        </ul>
    );
}
