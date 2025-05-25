// components/admin/EditFaqModal.tsx
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface EditFaqModalProps {
    open: boolean;
    onClose: () => void;
    item: FaqItem | null;
    onSave: () => void;
}

export function EditFaqModal({ open, onClose, item, onSave }: EditFaqModalProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            setQuestion(item.question);
            setAnswer(item.answer);
        }
    }, [item]);

    const handleUpdate = async () => {
        if (!item) return;
        setLoading(true);

        const { error } = await supabase
            .from("faq")
            .update({ question, answer })
            .eq("id", item.id);

        setLoading(false);

        if (error) {
            console.error("❌ FAQ update error:", error);
            toast.error("Failed to update FAQ.");
        } else {
            toast.success("FAQ updated successfully!");
            onSave();
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit FAQ</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div>
                        <label className="text-sm font-medium">Question</label>
                        <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Answer</label>
                        <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={loading}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
