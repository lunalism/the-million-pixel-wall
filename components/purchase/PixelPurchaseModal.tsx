"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
}

type ImageSource = "file" | "url";

export function PixelPurchaseModal({ open, onClose, selectedPixel }: PixelPurchaseModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSource, setImageSource] = useState<ImageSource>("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (imageSource === "file" && file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (imageSource === "url" && imageUrl.trim()) {
      setPreviewUrl(imageUrl.trim());
    } else {
      setPreviewUrl(null);
    }
  }, [file, imageUrl, imageSource]);

  useEffect(() => {
    if (open) {
      // 모달이 새로 열릴 때마다 초기화
      setName("");
      setMessage("");
      setFile(null);
      setImageUrl("");
      setImageSource("file");
      setPreviewUrl(null);
      setSubmitted(false);
    }
  }, [open]);

  if (!selectedPixel) return null;

  const isNameValid = name.trim().length > 0;
  const isMessageValid = message.trim().length > 0;
  const isImageValid =
    (imageSource === "file" && file) || (imageSource === "url" && imageUrl.trim().length > 0);

  const isFormValid = isNameValid && isMessageValid && isImageValid;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!isFormValid) return;

    console.log({
      pixel: selectedPixel,
      name,
      message,
      file: imageSource === "file" ? file : null,
      imageUrl: imageSource === "url" ? imageUrl : null,
    });

    alert("준비 중입니다!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Buy Pixel at ({selectedPixel.x}, {selectedPixel.y})
          </DialogTitle>
          <DialogDescription>
            Leave your mark on the Million Pixel Wall.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name */}
          <div>
            <Label className="pb-2" htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              placeholder="Your name or brand"
              onChange={(e) => setName(e.target.value)}
            />
            {submitted && !isNameValid && (
              <p className="text-sm text-red-500 mt-1">Name is required.</p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label className="pb-2" htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              placeholder="Say something..."
              onChange={(e) => setMessage(e.target.value)}
            />
            {submitted && !isMessageValid && (
              <p className="text-sm text-red-500 mt-1">Message is required.</p>
            )}
          </div>

          {/* Image Type Selector */}
          <div>
            <Label>Image Input Type</Label>
            <div className="flex gap-2 mt-2">
              <Button
                variant={imageSource === "file" ? "default" : "outline"}
                onClick={() => setImageSource("file")}
                type="button"
              >
                Upload File
              </Button>
              <Button
                variant={imageSource === "url" ? "default" : "outline"}
                onClick={() => setImageSource("url")}
                type="button"
              >
                Use Image URL
              </Button>
            </div>
          </div>

          {/* File Upload or URL Input */}
          {imageSource === "file" && (
            <div>
              <Label className="pb-2" htmlFor="file">Upload Image</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {submitted && !file && (
                <p className="text-sm text-red-500 mt-1">Please upload an image file.</p>
              )}
            </div>
          )}

          {imageSource === "url" && (
            <div>
              <Label className="pb-2" htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                placeholder="https://example.com/image.png"
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {submitted && !imageUrl.trim() && (
                <p className="text-sm text-red-500 mt-1">Image URL is required.</p>
              )}
            </div>
          )}

          {/* Preview */}
          {previewUrl && (
            <div className="mt-2">
              <Label>Preview</Label>
              <img
                src={previewUrl}
                alt="preview"
                className="w-full max-h-48 object-contain border rounded"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid}>
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
