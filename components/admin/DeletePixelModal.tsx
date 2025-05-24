// components/admin/DeletePixelModal.tsx

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface DeletePixelModalProps {
  open: boolean;
  onClose: () => void;
  pixelId: string;
  onDelete: () => void; // ✅ 삭제 성공 후 호출할 콜백
}

export function DeletePixelModal({ open, onClose, pixelId, onDelete }: DeletePixelModalProps) {
    const [loading, setLoading] = useState(false);

    // ✅ 삭제 처리 함수
    const handleDelete = async () => {
        setLoading(true);
        const { error } = await supabase.from("pixels").delete().eq("id", pixelId);
        setLoading(false);

        if (error) {
            console.error("삭제 실패:", error);
            toast.error("Failed to delete pixel.");
        } else {
            toast.success("Pixel deleted successfully!");
            onDelete(); // ✅ 삭제 후 콜백 호출
            onClose(); // 모달 닫기
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    This action cannot be undone. The pixel and its content will be
                    permanently removed.
                </p>

                <DialogFooter className="justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
