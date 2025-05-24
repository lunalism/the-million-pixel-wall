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
import { PayPalButtons } from "@paypal/react-paypal-js";

// 이미지 입력 방식 타입
type ImageSource = "file" | "url";

// 컴포넌트 prop 타입 정의
interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
  onPurchaseSuccess: (pixels: any[]) => void;
}

export function PixelPurchaseModal({ open, onClose, selectedPixel, onPurchaseSuccess }: PixelPurchaseModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSource, setImageSource] = useState<ImageSource>("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  useEffect(() => {
    if (open) {
      setName("");
      setMessage("");
      setFile(null);
      setImageUrl("");
      setImageSource("file");
      setPreviewUrl(null);
      setSubmitted(false);
      setWidth(1);
      setHeight(1);
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

  const totalPixels = width * height;

  const isFormValid =
    name.trim() &&
    message.trim() &&
    totalPixels >= 1 &&
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

    const pixelsToInsert = [
      {
        x: selectedPixel.x,
        y: selectedPixel.y,
        name,
        message,
        image_url: finalImageUrl,
        width,
        height,
      },
    ];

    const { data, error } = await supabase.from("pixels").insert(pixelsToInsert).select();

    if (error) {
      console.error("Save error:", error);
      alert("Failed to save pixels!");
    } else {
      onPurchaseSuccess(data);
      onClose();
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
          <div>
            <Label className="pb-2" htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {submitted && !name.trim() && <p className="text-sm text-red-500 mt-1">Name is required.</p>}
          </div>

          <div>
            <Label className="pb-2" htmlFor="message">Message</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            {submitted && !message.trim() && <p className="text-sm text-red-500 mt-1">Message is required.</p>}
          </div>

          <div>
            <Label>Image Input Type</Label>
            <div className="flex gap-2 mt-2">
              <Button type="button" variant={imageSource === "file" ? "default" : "outline"} onClick={() => setImageSource("file")}>Upload File</Button>
              <Button type="button" variant={imageSource === "url" ? "default" : "outline"} onClick={() => setImageSource("url")}>Use URL</Button>
            </div>
          </div>

          {imageSource === "file" && (
            <div>
              <Label className="pb-2" htmlFor="file">Upload Image</Label>
              <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {submitted && !file && <p className="text-sm text-red-500 mt-1">Please upload a file.</p>}
            </div>
          )}

          {imageSource === "url" && (
            <div>
              <Label className="pb-2" htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              {submitted && !imageUrl.trim() && <p className="text-sm text-red-500 mt-1">Image URL is required.</p>}
            </div>
          )}

          {previewUrl && (
            <div className="mt-2">
              <Label>Preview</Label>
              <img src={previewUrl} alt="preview" className="w-full max-h-48 object-contain border rounded" />
            </div>
          )}

          <div className="flex gap-4">
            <div className="w-1/2">
              <Label className="pb-2" htmlFor="width">Width (x)</Label>
              <Input id="width" type="number" min={1} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
            </div>
            <div className="w-1/2">
              <Label className="pb-2" htmlFor="height">Height (y)</Label>
              <Input id="height" type="number" min={1} value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Total: {width} × {height} = <strong>{totalPixels}</strong> pixels → <strong>${totalPixels}</strong>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <div className="w-full">
            <PayPalButtons
              style={{ layout: "horizontal", height: 36, borderRadius: 6 }}
              forceReRender={[totalPixels]}
              createOrder={(data, actions) => {
                if (!actions.order) throw new Error("PayPal order actions not available");
                return actions.order.create({
                  intent: "CAPTURE", // ✅ 이 줄 추가
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: totalPixels.toString(),
                      },
                    },
                  ],
                });
              }}
              
              onApprove={async (data, actions) => {
                if (!actions?.order) return;
                const details = await actions.order.capture();
                console.log("✅ Payment success:", details);
                await handleSubmit();
              }}
              onError={(err) => {
                console.error("❌ Payment error:", err);
                alert("Payment failed. Please try again.");
              }}
            />
          </div>
        </div>

        <DialogClose asChild>
          <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-900" aria-label="Close">
            <X size={16} />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
