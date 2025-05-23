// components/admin/ForbiddenWordAddDialog.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
    onAdd: (data: { word: string; category: string; }) => void;
}

export function ForbiddenWordAddDialog({ onAdd }: Props) {
    const [open, setOpen] = useState(false);                            // 모달 열림 상태
    const [newWord, setNewWord] = useState("");                         // 입력된 단어
    const [category, setCategory] = useState("기타");                    // 카테고리 분류

    const handleAdd = () => {
        if (!newWord.trim()) return;                                    // 공백 방지
        onAdd({ word: newWord.trim(), category});                       // 부모에게 추가 요청
        setNewWord("");                                                 // 입력값 초기화
        setCategory("기타");                                             // 카테고리 초기화
        setOpen(false);                                                 // 모달 닫기
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
                
                <div className="space-y-4">
                    <Input value={newWord} onChange={(e) => setNewWord(e.target.value)} placeholder="Enter new word"/>

                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="욕설">욕설</SelectItem>
                            <SelectItem value="광고">광고</SelectItem>
                            <SelectItem value="외부링크">외부링크</SelectItem>
                            <SelectItem value="기타">기타</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <DialogFooter>
                    <Button onClick={handleAdd}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
