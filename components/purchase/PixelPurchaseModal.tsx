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
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

// 이미지 입력 방식 타입
type ImageSource = "file" | "url";

// 컴포넌트 prop 타입 정의
interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
  onPurchaseSuccess: (pixels: any[]) => void;
}

export function PixelPurchaseModal({
  open,
  onClose,
  selectedPixel,
  onPurchaseSuccess,
}: PixelPurchaseModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSource, setImageSource] = useState<ImageSource>("file");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [overlapError, setOverlapError] = useState<string | null>(null);

  // 모달이 열릴 때 초기화
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
      setOverlapError(null);
    }
  }, [open]);

  // 미리보기 설정
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

  // 중복 체크
  useEffect(() => {
    const checkOverlap = async () => {
      if (!selectedPixel) return;

      const { data: existingPixels, error } = await supabase
        .from("pixels")
        .select("x, y, width, height");

      if (error) {
        console.error("중복 체크 오류:", error);
        setOverlapError("Failed to verify pixel availability.");
        return;
      }

      const requestedArea: { x: number; y: number }[] = [];
      for (let dx = 0; dx < width; dx++) {
        for (let dy = 0; dy < height; dy++) {
          requestedArea.push({ x: selectedPixel.x + dx, y: selectedPixel.y + dy });
        }
      }

      const isOverlapping = existingPixels?.some((p: any) => {
        for (let dx = 0; dx < p.width; dx++) {
          for (let dy = 0; dy < p.height; dy++) {
            if (requestedArea.some(r => r.x === p.x + dx && r.y === p.y + dy)) return true;
          }
        }
        return false;
      });

      setOverlapError(isOverlapping ? "Some pixels in the selected area are already taken." : null);
    };

    checkOverlap();
  }, [selectedPixel, width, height]);

  if (!selectedPixel) return null;
  const totalPixels = width * height;

  const isFormValid =
    name.trim() &&
    message.trim() &&
    totalPixels >= 1 &&
    (imageSource === "file" ? file : imageUrl.trim());

  // ✅ 이미지 크기 추출 함수
  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = src;
    });
  };

  // ✅ 썸네일 생성 함수 (64x64 PNG)
  const resizeImageToThumbnail = async (src: string): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas context not available"));

        ctx.drawImage(img, 0, 0, 64, 64);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Failed to create thumbnail blob"));
          resolve(blob);
        }, "image/png");
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("pixel-images").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pixel-images/${filePath}`;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!isFormValid || !selectedPixel || overlapError) return;

    // ✅ 이미지 업로드
    let finalImageUrl = imageUrl;
    if (imageSource === "file" && file) {
      const uploaded = await uploadImageToSupabase(file);
      if (!uploaded) return alert("Image upload failed");
      finalImageUrl = uploaded;
    }

    // ✅ 원본 이미지 크기 구하기
    const { width: originalWidth, height: originalHeight } = await getImageDimensions(finalImageUrl);

    // ✅ 썸네일 생성 및 업로드
    const thumbBlob = await resizeImageToThumbnail(finalImageUrl);
    const thumbFilePath = `thumb_${Date.now()}.png`;
    const { error: thumbError } = await supabase.storage
      .from("pixel-thumbnails")
      .upload(thumbFilePath, thumbBlob!);

    if (thumbError) {
      console.error("썸네일 업로드 오류:", thumbError);
      return alert("Failed to upload thumbnail.");
    }

    const thumbnailUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pixel-thumbnails/${thumbFilePath}`;

    // ✅ Supabase에 데이터 저장
    const { data, error } = await supabase
      .from("pixels")
      .insert([{
        x: selectedPixel.x,
        y: selectedPixel.y,
        name,
        message,
        image_url: finalImageUrl,
        width,
        height,
        original_width: originalWidth,
        original_height: originalHeight,
        thumbnail_url: thumbnailUrl,
      }])
      .select();

    if (error) {
      console.error("픽셀 저장 오류:", error);
      alert("Failed to save pixels!");
    } else {
      toast.success("🎉 Your pixels have been successfully purchased!");
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
          {/* 이름 */}
          <div>
            <Label className="pb-2" htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {submitted && !name.trim() && <p className="text-sm text-red-500 mt-1">Name is required.</p>}
          </div>

          {/* 메시지 */}
          <div>
            <Label className="pb-2" htmlFor="message">Message</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
            {submitted && !message.trim() && <p className="text-sm text-red-500 mt-1">Message is required.</p>}
          </div>

          {/* 이미지 입력 방식 선택 */}
          <div>
            <Label>Image Input Type</Label>
            <div className="flex gap-2 mt-2">
              <Button type="button" variant={imageSource === "file" ? "default" : "outline"} onClick={() => setImageSource("file")}>Upload File</Button>
              <Button type="button" variant={imageSource === "url" ? "default" : "outline"} onClick={() => setImageSource("url")}>Use URL</Button>
            </div>
          </div>

          {/* 이미지 업로드 */}
          {imageSource === "file" && (
            <div>
              <Label className="pb-2" htmlFor="file">Upload Image</Label>
              <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {submitted && !file && <p className="text-sm text-red-500 mt-1">Please upload a file.</p>}
            </div>
          )}

          {/* 이미지 URL 입력 */}
          {imageSource === "url" && (
            <div>
              <Label className="pb-2" htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              {submitted && !imageUrl.trim() && <p className="text-sm text-red-500 mt-1">Image URL is required.</p>}
            </div>
          )}

          {/* 미리보기 */}
          {previewUrl && (
            <div className="mt-2">
              <Label className="pb-2" >Preview</Label>
              <img src={previewUrl} alt="preview" className="w-full max-h-48 object-contain border rounded" />
            </div>
          )}

          {/* 크기 입력 */}
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

          {/* 중복 메시지 */}
          {overlapError && (
            <p className="text-sm text-red-500 -mt-2">{overlapError}</p>
          )}

          <div className="text-sm text-muted-foreground">
            Total: {width} × {height} = <strong>{totalPixels}</strong> pixels → <strong>${totalPixels}</strong>
          </div>
        </div>

        {/* 결제 버튼 */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <div className="w-full">
            <PayPalButtons
              style={{ layout: "horizontal", height: 36 }}
              forceReRender={[totalPixels, overlapError]}
              disabled={!!overlapError}
              createOrder={(data, actions) => {
                if (!actions.order) throw new Error("PayPal order actions not available");
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{ amount: { currency_code: "USD", value: totalPixels.toString() } }],
                });
              }}
              onApprove={async (data, actions) => {
                if (!actions?.order) return;
                await actions.order.capture();
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
