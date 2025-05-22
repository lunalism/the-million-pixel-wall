"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Check } from "lucide-react";
import { toast } from "sonner";

// 신고 + 픽셀 정보 타입 정의
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

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    // 모달을 위한 상태
    const [targetPixelId, setTargetPixelId] = useState<string | null>(null);
    const [targetReportId, setTargetReportId] = useState<string | null>(null);

    // 신고 데이터 불러오기 (미처리 상태만)
    const fetchReports = async () => {
        const { data, error } = await supabase
        .from("reports")
        .select("id, reason, status, created_at, pixels(id, x, y, image_url, name)")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

        if (!error && data) {
        const normalized = (data as any[]).map((item) => ({
            ...item,
            pixels: Array.isArray(item.pixels) ? item.pixels[0] : item.pixels,
        }));
        setReports(normalized as Report[]);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // 픽셀 삭제 로직
    const handleDeletePixel = async (pixelId: string) => {
        const { error } = await supabase.from("pixels").delete().eq("id", pixelId);
        if (error) {
        toast.error("픽셀 삭제 중 오류가 발생했습니다.");
        return;
        }

        toast.success("픽셀이 성공적으로 삭제되었습니다.");
        setTargetPixelId(null);
        fetchReports();
    };

    // 신고 승인 로직
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
        fetchReports();
    };

    return (
        <div className="space-y-6">
            {/* 페이지 제목 */}
            <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <p className="text-muted-foreground">Review and manage reported pixels.</p>
            </div>

            {/* 리스트 */}
            {loading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin h-4 w-4" />
                Loading reports...
                </div>
            ) : reports.length === 0 ? (
                <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                🎉 No pending reports.
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
                                    {/* ✅ 승인 버튼 (확인 모달 포함) */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" size="sm" onClick={() => setTargetReportId(report.id)}>
                                                <Check className="w-4 h-4 mr-1" />
                                                승인
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>정말로 승인하시겠습니까?</DialogTitle>
                                                <DialogDescription>이 신고는 승인 처리되며 리스트에서 제거됩니다.</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setTargetReportId(null)}>
                                                    취소
                                                </Button>
                                                <Button variant="default" onClick={() => { if (targetReportId) handleApproveReport(targetReportId); }}>
                                                    승인 확정
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    {/* 🗑 삭제 버튼 (확인 모달 포함) */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" size="sm" onClick={() => setTargetPixelId(report.pixels.id)}>
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                삭제
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
                                                <DialogDescription>이 픽셀은 영구적으로 삭제되며 복구할 수 없습니다.</DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setTargetPixelId(null)}>취소</Button>
                                                <Button variant="destructive" onClick={() => { if (targetPixelId) handleDeletePixel(targetPixelId); }}>
                                                    삭제 확정
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>

                            <CardContent className="flex items-center gap-4">
                                <img src={report.pixels.image_url} alt="pixel" className="w-16 h-16 border rounded object-cover" />
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
