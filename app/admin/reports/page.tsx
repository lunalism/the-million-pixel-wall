"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

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
  const [targetPixelId, setTargetPixelId] = useState<string | null>(null);

  // 신고 리스트 불러오기
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

  // 삭제 처리
  const handleDeletePixel = async (pixelId: string) => {
    const { error } = await supabase.from("pixels").delete().eq("id", pixelId);
    if (error) {
      console.error("❌ Error deleting pixel:", error);
      return;
    }

    setTargetPixelId(null); // 모달 닫기
    fetchReports(); // 리스트 갱신
  };

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">
          Review and manage reported pixels.
        </p>
      </div>

      {/* 리스트 */}
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

                {/* 삭제 확인 모달 트리거 */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setTargetPixelId(report.pixels.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      삭제
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setTargetPixelId(null)}
                      >
                        취소
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (targetPixelId) handleDeletePixel(targetPixelId);
                        }}
                      >
                        삭제 확정
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
