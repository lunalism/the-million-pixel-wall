// components/purchase/PixelPurchaseModal.tsx

"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type ImageSource = "file" | "url";

interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
  onPurchaseSuccess: (pixel: any) => void;
}

export function PixelPurchaseModal({ open, onClose, selectedPixel, onPurchaseSuccess }: PixelPurchaseModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSource, setImageSource] = useState<ImageSource>("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      // 🧼 모달 열릴 때마다 폼 초기화
      setName("");
      setMessage("");
      setFile(null);
      setImageUrl("");
      setImageSource("file");
      setPreviewUrl(null);
      setSubmitted(false);
    }
  }, [open]);

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

  if (!selectedPixel) return null;

  const isFormValid =
    name.trim() &&
    message.trim() &&
    (imageSource === "file" ? file : imageUrl.trim());

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("pixel-images")
      .upload(filePath, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pixel-images/${filePath}`;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!isFormValid || !selectedPixel) return;

    let finalImageUrl = imageUrl;
    if (imageSource === "file" && file) {
      const uploaded = await uploadImageToSupabase(file);
      if (!uploaded) return alert("Image upload failed");
      finalImageUrl = uploaded;
    }

    const { data, error } = await supabase
      .from("pixels")
      .insert({
        x: selectedPixel.x,
        y: selectedPixel.y,
        name,
        message,
        image_url: finalImageUrl,
      })
      .select()
      .single();

    if (error) {
      console.error("Save error:", error);
      alert("Failed to save pixel!");
    } else {
      onPurchaseSuccess(data); // ✅ 저장 성공 시 PixelGrid에 반영
      onClose(); // 모달 닫기
    }
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
          {/* 이름 */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {submitted && !name.trim() && (
              <p className="text-sm text-red-500 mt-1">Name is required.</p>
            )}
          </div>

          {/* 메시지 */}
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {submitted && !message.trim() && (
              <p className="text-sm text-red-500 mt-1">Message is required.</p>
            )}
          </div>

          {/* 이미지 입력 타입 선택 */}
          <div>
            <Label>Image Input Type</Label>
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant={imageSource === "file" ? "default" : "outline"}
                onClick={() => setImageSource("file")}
              >
                Upload File
              </Button>
              <Button
                type="button"
                variant={imageSource === "url" ? "default" : "outline"}
                onClick={() => setImageSource("url")}
              >
                Use URL
              </Button>
            </div>
          </div>

          {/* 파일 업로드 or URL */}
          {imageSource === "file" && (
            <div>
              <Label htmlFor="file">Upload Image</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {submitted && !file && (
                <p className="text-sm text-red-500 mt-1">Please upload a file.</p>
              )}
            </div>
          )}
          {imageSource === "url" && (
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {submitted && !imageUrl.trim() && (
                <p className="text-sm text-red-500 mt-1">Image URL is required.</p>
              )}
            </div>
          )}

          {/* 미리보기 */}
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
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
