// components/admin/ForbiddenWordAddDialog.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Props {
    onAdd: (word: string) => void;
}

export function ForbiddenWordAddDialog({ onAdd }: Props) {
    const [open, setOpen] = useState(false);        // 모달 열림 상태
    const [newWord, setNewWord] = useState("");     // 입력된 단어

    const handleAdd = () => {
        if (!newWord.trim()) return;                 // 공백 방지
        onAdd(newWord.trim());                       // 부모에게 추가 요청
        setNewWord("");                              // 입력값 초기화
        setOpen(false);                              // 모달 닫기
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">+ Add Word</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Forbidden Word</DialogTitle>
                </DialogHeader>
                <Input value={newWord} onChange={(e) => setNewWord(e.target.value)} placeholder="Enter new word"/>
                <DialogFooter>
                    <Button onClick={handleAdd}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
