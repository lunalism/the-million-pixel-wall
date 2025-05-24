// components/admin/EditPixelModal.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import type { Pixel } from "@/app/admin/pixels/columns";

interface EditPixelModalProps {
  open: boolean;
  onClose: () => void;
  pixel: Pixel | null;
  onPixelUpdated: () => void;
}

export function EditPixelModal({
  open,
  onClose,
  pixel,
  onPixelUpdated,
}: EditPixelModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 픽셀 데이터가 변경될 때마다 입력 초기화
  useEffect(() => {
    if (pixel) {
      setName(pixel.name);
      setMessage(pixel.message);
      setImageUrl(pixel.image_url);
    }
  }, [pixel]);

  // 픽셀 업데이트 핸들러
  const handleUpdate = async () => {
    if (!pixel) return;
    setLoading(true);

    const { error } = await supabase
      .from("pixels")
      .update({
        name,
        message,
        image_url: imageUrl,
      })
      .eq("id", pixel.id);

    setLoading(false);

    if (error) {
      console.error("❌ Update error:", error);
      toast.error("Failed to update pixel.");
    } else {
      toast.success("✅ Pixel updated successfully!");
      onPixelUpdated(); // 상위에서 목록 새로고침 등 처리
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Pixel</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 max-h-48 rounded border object-contain"
            />
          )}
        </div>

        <DialogFooter className="gap-2 justify-end">
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
