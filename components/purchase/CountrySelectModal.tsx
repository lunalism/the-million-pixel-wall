// components/pixels/CountrySelectModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { KoreanPurchaseInfoModal } from "./KoreanPurchaseInfoModal";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";
import type { PixelData } from "@/types/pixel";

interface CountrySelectModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
  onPurchaseSuccess: (pixels: PixelData[]) => void;
  onProceed: () => void; // ✅ 새로 추가된 prop
}

export function CountrySelectModal({
  open,
  onClose,
  selectedPixel,
  onPurchaseSuccess,
  onProceed,
}: CountrySelectModalProps) {
  const [koreanModalOpen, setKoreanModalOpen] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const handleYes = () => {
    setKoreanModalOpen(true);
    onClose();
  };

  const handleNo = () => {
    setPurchaseModalOpen(true);
    onClose();
    onProceed();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you accessing from Korea?</DialogTitle>
            <DialogDescription>
              This helps us guide you to the appropriate pixel purchase method.
              Due to local PayPal restrictions, Korean users must proceed
              differently.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleYes}>
              🇰🇷 Yes, I&apos;m in Korea
            </Button>
            <Button onClick={handleNo}>🌐 No, I&apos;m not in Korea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🇰🇷 한국 사용자 안내 모달 */}
      <KoreanPurchaseInfoModal
        open={koreanModalOpen}
        onClose={() => setKoreanModalOpen(false)}
      />

      {/* 💳 일반 구매 모달 */}
      <PixelPurchaseModal
        open={purchaseModalOpen}
        onClose={() => setPurchaseModalOpen(false)}
        selectedPixel={selectedPixel}
        onPurchaseSuccess={onPurchaseSuccess}
      />
    </>
  );
}
