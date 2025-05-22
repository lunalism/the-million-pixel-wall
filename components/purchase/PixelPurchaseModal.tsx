// components/purchase/PixelPurchaseModal.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

import { useState } from "react";

interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
}

export function PixelPurchaseModal({ open, onClose, selectedPixel }: PixelPurchaseModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  if (!selectedPixel) return null;

  const handleSubmit = () => {
    console.log({
      pixel: selectedPixel,
      name,
      message,
      file,
    });

    // 추후: supabase 업로드 및 결제 로직
    alert("준비 중입니다!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy Pixel at ({selectedPixel.x}, {selectedPixel.y})</DialogTitle>
          <DialogDescription>
            Leave your mark on the Million Pixel Wall.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label className="pb-2" htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name or brand"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label className="pb-2" htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Say something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div>
            <Label className="pb-2" htmlFor="file">Upload Image</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Purchase
          </Button>
        </div>

        <DialogClose asChild>
          <button
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 transition"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
