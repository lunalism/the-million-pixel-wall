"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Image from "next/image";
import type { Pixel } from "@/app/admin/pixels/columns";

interface EditPixelModalProps {
  open: boolean;
  onClose: () => void;
  pixel: Pixel | null;
  onPixelUpdated: () => void;
}

export function EditPixelModal({ open, onClose, pixel, onPixelUpdated }: EditPixelModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pixel) {
      setName(pixel.name);
      setMessage(pixel.message);
      setImageUrl(pixel.image_url);
    }
  }, [pixel]);

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
      onPixelUpdated();
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
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
          </div>

          {imageUrl && (
            <div className="relative mt-2 w-full h-48 border rounded overflow-hidden">
              <Image src={imageUrl} alt="Preview" fill className="object-contain" sizes="(max-width: 640px) 100vw, 50vw"/>
            </div>
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
