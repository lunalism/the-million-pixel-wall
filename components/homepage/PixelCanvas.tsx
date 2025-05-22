// components/homepage/PixelCanvas.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { PixelPurchaseModal } from "@/components/purchase/PixelPurchaseModal";

const GRID_SIZE = 1000;
const PIXEL_SIZE = 15;
const SCALE = 0.2;

export function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / SCALE;
    const offsetY = (e.clientY - rect.top) / SCALE;

    const pixelX = Math.floor(offsetX / PIXEL_SIZE);
    const pixelY = Math.floor(offsetY / PIXEL_SIZE);

    setSelectedPixel({ x: pixelX, y: pixelY });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 배경
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, GRID_SIZE * PIXEL_SIZE, GRID_SIZE * PIXEL_SIZE);

    // 격자
    ctx.strokeStyle = "#e5e7eb";
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        ctx.strokeRect(
          x * PIXEL_SIZE,
          y * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPixel(null);
  };

  return (
    <div className="flex justify-center py-10 overflow-auto">
      <div style={{ transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * PIXEL_SIZE}
          height={GRID_SIZE * PIXEL_SIZE}
          className="cursor-crosshair"
          onClick={handleCanvasClick}
        />
      </div>

      <PixelPurchaseModal
        open={isModalOpen}
        onClose={closeModal}
        selectedPixel={selectedPixel}
      />
    </div>
  );
}
