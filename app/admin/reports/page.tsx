// app/admin/reports/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

// 🔍 Report 타입 정의
type Report = {
  id: string;
  reason: string;
  created_at: string;
  status: string;
  pixels: {
    id: string;
    x: number;
    y: number;
    image_url: string;
    name: string;
  };
};

// 🛠 Supabase 원시 데이터 타입
type RawReport = {
  id: string;
  reason: string;
  status: string;
  created_at: string;
  pixels: {
    id: string;
    x: number;
    y: number;
    image_url: string;
    name: string;
  }[];
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "removed">("pending");
  const [targetPixelId, setTargetPixelId] = useState<string | null>(null);
  const [targetReportId, setTargetReportId] = useState<string | null>(null);

  // 🔄 상태별로 신고 불러오기
  const fetchReports = async (status: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reports")
      .select("id, reason, status, created_at, pixels(id, x, y, image_url, name)")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const normalized: Report[] = (data as RawReport[]).map((item) => ({
        ...item,
        pixels: item.pixels[0],
      }));
      setReports(normalized);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReports(statusFilter);
  }, [statusFilter]);

  const handleDeletePixel = async (pixelId: string) => {
    const { error } = await supabase.from("pixels").delete().eq("id", pixelId);
    if (error) {
      toast.error("픽셀 삭제 중 오류가 발생했습니다.");
      return;
    }
    toast.success("픽셀이 성공적으로 삭제되었습니다.");
    setTargetPixelId(null);
    fetchReports(statusFilter);
  };

  const handleApproveReport = async (reportId: string) => {
    const { error } = await supabase
      .from("reports")
      .update({ status: "approved" })
      .eq("id", reportId);

    if (error) {
      toast.error("승인 처리 중 오류가 발생했습니다.");
      return;
    }
    toast.success("신고가 승인 처리되었습니다.");
    setTargetReportId(null);
    fetchReports(statusFilter);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
        <p className="text-muted-foreground">Review and manage reported pixels.</p>
      </div>

      <div className="flex gap-2">
        {(["pending", "approved", "removed"] as const).map((status) => (
          <Button key={status} variant={statusFilter === status ? "default" : "outline"} onClick={() => setStatusFilter(status)}>
            {{ pending: "Pending", approved: "Approved", removed: "Deleted" }[status]}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="animate-spin h-4 w-4" />
          Loading reports...
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          표시할 신고가 없습니다.
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>
                  🚩 Pixel at ({report.pixels.x}, {report.pixels.y})
                </CardTitle>
                <div className="flex gap-2">
                  {statusFilter === "pending" && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" size="sm" onClick={() => setTargetReportId(report.id)}>
                            <Check className="w-4 h-4 mr-1" /> 승인
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>정말로 승인하시겠습니까?</DialogTitle>
                            <DialogDescription>
                              이 신고는 승인 처리되며 리스트에서 제거됩니다.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setTargetReportId(null)}>
                              취소
                            </Button>
                            <Button
                              variant="default"
                              onClick={() => {
                                if (targetReportId) handleApproveReport(targetReportId);
                              }}
                            >
                              승인 확정
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm" onClick={() => setTargetPixelId(report.pixels.id)}>
                            <Trash2 className="w-4 h-4 mr-1" /> 삭제
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
                            <DialogDescription>
                              이 픽셀은 영구적으로 삭제되며 복구할 수 없습니다.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setTargetPixelId(null)}>
                              취소
                            </Button>
                            <Button variant="destructive" onClick={() => { if (targetPixelId) handleDeletePixel(targetPixelId); }}>
                              삭제 확정
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex items-center gap-4">
                <Image src={report.pixels.image_url} alt="pixel" width={64} height={64} className="w-16 h-16 border rounded object-cover"/>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>이름:</strong> {report.pixels.name}
                  </p>
                  <p>
                    <strong>신고 사유:</strong> {report.reason}
                  </p>
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
