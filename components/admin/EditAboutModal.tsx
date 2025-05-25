// components/admin/EditAboutModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface AboutSeciotn {
  id: string;
  emoji: string;
  title: string;
  content: string;
}

interface EditAboutModalProps {
  open: boolean;
  onClose: () => void;
  item: AboutSeciotn | null;
  onSave: () => void;
}

export function EditAboutModal({ open, onClose, item, onSave }: EditAboutModalProps) {
    const [emoji, setEmoji] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            setEmoji(item.emoji);
            setTitle(item.title);
            setContent(item.content);
        }
    }, [item]);

    const handleSave = async () => {
        if (!item) return;
        setLoading(true);

        const { error } = await supabase
            .from("about")
            .update({ emoji, title, content })
            .eq("id", item.id);

        setLoading(false);

        if (error) {
            console.error("Update failed:", error);
            toast.error("❌ 업데이트에 실패했어요.");
        } else {
            toast.success("✅ 업데이트 완료!");
            onSave();
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit About Section</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div>
                        <Label className="pb-2" htmlFor="emoji">Emoji</Label>
                        <Input id="title" value={emoji} onChange={(e) => setEmoji(e.target.value)}/>
                    </div>
                    <div>
                        <Label className="pb-2" htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div>
                        <Label className="pb-2" htmlFor="content">Content</Label>
                        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
                    </div>
                </div>

                <DialogFooter className="gap-2 justify-end">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
