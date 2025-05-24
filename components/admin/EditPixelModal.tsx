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

// ✅ Pixel 타입 정의 확장 (폭과 높이 추가)
// interface Pixel {
//   id: string;
//   name: string;
//   message: string;
//   image_url: string;
//   width: number;
//   height: number;
// }

interface EditPixelModalProps {
  open: boolean;
  onClose: () => void;
  pixel: Pixel | null;
  onSave: (updated: Pixel) => void;
}

export function EditPixelModal({ open, onClose, pixel, onSave }: EditPixelModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ 픽셀 정보 초기화
  useEffect(() => {
    if (pixel) {
      setName(pixel.name);
      setMessage(pixel.message);
      setImageUrl(pixel.image_url);
      setWidth(pixel.width);
      setHeight(pixel.height);
    }
  }, [pixel]);

  // ✅ 수정 처리 함수
  const handleUpdate = async () => {
    if (!pixel) return;
    setLoading(true);

    const updatedPixel: Pixel = {
      ...pixel,
      name,
      message,
      image_url: imageUrl,
      width,
      height,
    };

    const { error } = await supabase
      .from("pixels")
      .update({ name, message, image_url: imageUrl, width, height })
      .eq("id", pixel.id);

    setLoading(false);

    if (error) {
      console.error("Update error:", error);
      toast.error("Failed to update pixel.");
    } else {
      toast.success("Pixel updated successfully!");
      onSave(updatedPixel);
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
            <Input id="image_url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="mt-2 max-h-48 rounded border object-contain"
            />
          )}

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                min={1}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                min={1}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
          </div>
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
