// app/admin/pixels/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { columns as rawColumns } from "./columns";
import { DataTable } from "./data-table";
import { Pixel } from "./columns";
import { EditPixelModal } from "@/components/admin/EditPixelModal";

export default function AdminPixelPage() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 수정 모달 상태 관리
  const [selectedPixel, setSelectedPixel] = useState<Pixel | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const fetchPixels = async () => {
      const { data, error } = await supabase.from("pixels").select("*");

      if (error) {
        console.error("픽셀 데이터를 불러오는 중 오류 발생:", error);
      } else if (data) {
        setPixels(data);
      }

      setLoading(false);
    };

    fetchPixels();
  }, []);

  // ✅ 픽셀 수정 완료 후 데이터 갱신
  const handleUpdate = (updated: Pixel) => {
    setPixels((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setIsEditOpen(false);
  };

  const columns = rawColumns({ onEdit: (pixel: Pixel) => {
    setSelectedPixel(pixel);
    setIsEditOpen(true);
  }});

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧱 전체 픽셀 관리</h1>

      {loading ? (
        <p className="text-muted-foreground">불러오는 중...</p>
      ) : (
        <DataTable columns={columns} data={pixels} />
      )}

      {/* ✅ 수정 모달 연결 */}
      {selectedPixel && (
        <EditPixelModal
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          pixel={selectedPixel}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
