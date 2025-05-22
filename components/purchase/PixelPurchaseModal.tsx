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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PixelPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  selectedPixel: { x: number; y: number } | null;
}

export function PixelPurchaseModal({ open, onClose, selectedPixel }: PixelPurchaseModalProps) {
  if (!selectedPixel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy This Pixel</DialogTitle>
          <DialogDescription>
            You selected pixel at <strong>({selectedPixel.x}, {selectedPixel.y})</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-sm text-gray-600">
          This will be your permanent place on the Million Pixel Wall.
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Next</Button>
        </div>

        {/* 'X' 버튼이 오른쪽 상단에 나타남 */}
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
