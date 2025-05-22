// app/admin/page.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pixel } from "@/app/admin/pixels/columns";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, ImageIcon, Flag, SquareStack } from "lucide-react";

export default function AdminDashboardPage() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPixels = async () => {
      const { data, error } = await supabase.from("pixels").select("*");
      if (!error && data) {
        setPixels(data);
      }
      setLoading(false);
    };

    fetchPixels();
  }, []);

  const total = pixels.length;
  const recent = pixels.slice(0, 5);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 픽셀 수</CardTitle>
            <SquareStack className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? <Loader2 className="animate-spin" /> : total}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최근 등록</CardTitle>
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? <Loader2 className="animate-spin" /> : recent.length}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">신고된 픽셀</CardTitle>
            <Flag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-muted-foreground">—</div>
          </CardContent>
        </Card>
      </div>

      {/* 최근 등록된 픽셀 썸네일 */}
      <div>
        <h2 className="text-lg font-semibold mb-3">🖼 최근 등록된 픽셀</h2>
        <div className="grid grid-cols-5 gap-2">
          {recent.map((pixel) => (
            <img
              key={pixel.id}
              src={pixel.image_url}
              alt="pixel"
              className="w-16 h-16 border object-cover rounded"
              title={`${pixel.name}: ${pixel.message}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
