// components/pixels/PurchasedPixelModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type PurchasedPixelModalProps = {
  open: boolean;
  onClose: () => void;
  pixel: {
    id: string;
    x: number;
    y: number;
    name: string;
    message: string;
    image_url: string;
  };
};

export function PurchasedPixelModal({ open, onClose, pixel }: PurchasedPixelModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            픽셀 상세 정보
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-4">
            <Image src={pixel.image_url} alt={pixel.name} width={64} height={64} className="rounded border object-cover" />
            <div>
              <p><strong>위치:</strong> ({pixel.x}, {pixel.y})</p>
              <p><strong>이름:</strong> {pixel.name}</p>
              <p><strong>메시지:</strong> {pixel.message}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
          <Button variant="destructive" onClick={() => {
              // 여기서 신고 폼 모달로 전환하거나 상태 전환
              console.log("🚩 신고 시작");
            }}
          >
            🚩 신고하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
