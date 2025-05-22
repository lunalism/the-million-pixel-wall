"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// 신고 + 픽셀 조인된 데이터 타입 정의
type Report = {
  id: string;
  reason: string;
  created_at: string;
  pixels: {
    id: string;
    x: number;
    y: number;
    image_url: string;
    name: string;
  };
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      // 신고 목록 + 해당 픽셀 정보 조인해서 가져오기
      const { data, error } = await supabase
        .from("reports")
        .select("id, reason, created_at, pixels(id, x, y, image_url, name)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        // pixel이 배열로 들어오는 경우를 방지해 정상화
        const normalized = (data as any[]).map((item) => ({
          ...item,
          pixel: Array.isArray(item.pixel) ? item.pixel[0] : item.pixel,
        }));

        setReports(normalized as Report[]);
      } else {
        console.error("🚨 Error fetching reports:", error);
      }

      setLoading(false);
    };

    fetchReports();
  }, []);

  return (
    <div className="space-y-6">
      {/* 헤더 영역 */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Review reported pixels submitted by users.
        </p>
      </div>

      {/* 로딩 or 리스트 */}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="animate-spin h-4 w-4" />
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          🎉 No reports found. You're all good!
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>
                  🚩 Pixel at ({report.pixels.x}, {report.pixels.y})
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <img
                  src={report.pixels.image_url}
                  alt="pixel"
                  className="w-16 h-16 border rounded object-cover"
                />
                <div className="text-sm space-y-1">
                  <p><strong>이름:</strong> {report.pixels.name}</p>
                  <p><strong>신고 사유:</strong> {report.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
