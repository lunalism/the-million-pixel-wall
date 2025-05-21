// components/purchase/PixelPurchaseModal.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
}

export function PixelPurchaseModal({ open, onClose, selectedPixel }: PixelPurchaseModalProps) {
  if (!selectedPixel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Pixel ({selectedPixel.x}, {selectedPixel.y})</DialogTitle>
        </DialogHeader>
        <p>This pixel can be yours forever.</p>
        {/* 이후 이미지 업로드, 링크 입력, 결제 버튼 등 추가 */}
      </DialogContent>
    </Dialog>
  );
}
