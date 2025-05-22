// app/admin/pixels/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Pixel } from "./columns";

export default function AdminPixelPage() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧱 전체 픽셀 관리</h1>

      {loading ? (
        <p className="text-muted-foreground">불러오는 중...</p>
      ) : (
        <DataTable columns={columns} data={pixels} />
      )}
    </div>
  );
}
