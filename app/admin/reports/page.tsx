"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("id, reason, created_at, pixels(id, x, y, image_url, name)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const normalized = (data as any[]).map((item) => ({
        ...item,
        pixel: Array.isArray(item.pixels) ? item.pixels[0] : item.pixels,
      }));
      setReports(normalized as Report[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDeletePixel = async (pixelId: string) => {
    const { error } = await supabase.from("pixels").delete().eq("id", pixelId);
    if (error) {
      console.error("❌ Error deleting pixel:", error);
      return;
    }

    // 삭제 후 목록 갱신
    fetchReports();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Review and manage reported pixels.</p>
      </div>

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
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>
                  🚩 Pixel at ({report.pixels.x}, {report.pixels.y})
                </CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePixel(report.pixels.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  삭제
                </Button>
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
