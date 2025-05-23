// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ImageIcon, Flag, SquareStack } from "lucide-react";
import { Pixel } from "./pixels/columns";
import Image from "next/image";
import { ReportStats } from "@/components/admin/ReportStats";
import { PixelStats } from "@/components/admin/PixelStats";

export default function AdminOverviewPage() {
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
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Manage your wall at a glance.</p>
      </div>

      {/* 픽셀 통계 카드 */}
      <PixelStats total={total} recentCount={recent.length} loading={loading} />

      {/* 📊 신고 통계 카드 */}
      <ReportStats />

      {/* 최근 이미지 */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Pixels</h3>
        <div className="grid grid-cols-5 gap-2">
          {recent.map((pixel) => (
            <Image
              key={pixel.id}
              src={pixel.image_url}
              alt={pixel.name}
              title={`${pixel.name}: ${pixel.message}`}
              width={64}
              height={64}
              className="w-16 h-16 rounded border object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
