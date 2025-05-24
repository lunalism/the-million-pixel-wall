// app/admin/pixels/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { rawColumns } from "./columns";
import { DataTable } from "./data-table";
import type { Pixel } from "./columns"; // ✅ 타입만 필요하므로 type import
import { EditPixelModal } from "@/components/admin/EditPixelModal";
import { DeletePixelModal } from "@/components/admin/DeletePixelModal";

export default function AdminPixelPage() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPixel, setSelectedPixel] = useState<Pixel | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 📡 픽셀 데이터 가져오기
  const fetchPixels = async () => {
    const { data, error } = await supabase.from("pixels").select("*");
    if (error) {
      console.error("픽셀 데이터를 불러오는 중 오류 발생:", error);
    } else if (data) {
      setPixels(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPixels();
  }, []);

  // ✏️ 수정 처리 후 데이터 새로고침
  const handlePixelUpdated = () => {
    fetchPixels();
  };

  // 🗑️ 삭제 처리 후 데이터 새로고침
  const handlePixelDeleted = () => {
    setIsDeleteOpen(false);
    setSelectedPixel(null);
    fetchPixels();
  };

  const columns = rawColumns({
    onEdit: (pixel: Pixel) => {
      setSelectedPixel(pixel);
      setIsEditOpen(true);
    },
    onDelete: (pixel: Pixel) => {
      setSelectedPixel(pixel);
      setIsDeleteOpen(true);
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧱 전체 픽셀 관리</h1>

      {loading ? (
        <p className="text-muted-foreground">불러오는 중...</p>
      ) : (
        <DataTable columns={columns} data={pixels} />
      )}

      {/* 수정 모달 */}
      <EditPixelModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        pixel={selectedPixel}
        onPixelUpdated={handlePixelUpdated}
      />

      {/* 삭제 모달 */}
      <DeletePixelModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        pixelId={selectedPixel?.id || ""}
        onDelete={handlePixelDeleted}
      />
    </div>
  );
}
