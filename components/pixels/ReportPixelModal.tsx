// components/pixels/ReportPixelModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type ReportPixelModalProps = {
    open: boolean;
    onClose: () => void;
    pixelId: string;
    onSubmit: (data: { reason: string; message: string }) => void;
};

export function ReportPixelModal({ open, onClose, pixelId, onSubmit }: ReportPixelModalProps) {
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!reason.trim()) return;
        onSubmit({ reason, message });
        onClose();
        setReason("");
        setMessage("");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Report This Pixel</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Input
                        id="reason"
                        placeholder="e.g. Inappropriate content, spam, etc."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Additional Message (optional)</Label>
                        <Textarea
                        id="message"
                        placeholder="Provide any extra details here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!reason.trim()}>
                        Submit Report
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
