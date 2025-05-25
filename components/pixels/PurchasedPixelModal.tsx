// components/pixels/PurchasedPixelModal.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ReportPixelModal } from "@/components/pixels/ReportPixelModal";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

type PurchasedPixelModalProps = {
    open: boolean;
    onClose: () => void;
    pixel: {
        id: string;
        x: number;
        y: number;
        name: string;
        message: string;
        image_url: string;
    };
};

export function PurchasedPixelModal({ open, onClose, pixel }: PurchasedPixelModalProps) {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // ✅ 신고 제출 처리 (Supabase 저장)
    const handleReportSubmit = async (data: { reason: string; message: string }) => {
        const { error } = await supabase.from("reports").insert({
            pixel_id: pixel.id,
            reason: data.reason,
            message: data.message,
        });

        if (error) {
            console.error("❌ Failed to submit report:", error);
            toast.error("Failed to submit report.");
        } else {
            toast.success("Report submitted successfully.");
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Pixel Details</DialogTitle>
                        <DialogDescription>
                            View this pixel&apos;s information or report it if necessary.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-4">
                            <Image src={pixel.image_url} alt={pixel.name} width={64} height={64} className="rounded border object-cover"/>
                            <div>
                                <p><strong>Position:</strong> ({pixel.x}, {pixel.y})</p>
                                <p><strong>Name:</strong> {pixel.name}</p>
                                <p><strong>Message:</strong> {pixel.message}</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 gap-2 justify-end">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="destructive" onClick={() => setIsReportModalOpen(true)}>
                            🚩 Report
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Report Modal 연결 */}
            <ReportPixelModal open={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} pixelId={pixel.id} onSubmit={handleReportSubmit}/>
        </>
    );
}
