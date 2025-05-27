// components/admin/AddPixelModal.tsx
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Image from "next/image";

interface AddPixelModalProps {
    open: boolean;
    onClose: () => void;
    onAdded: () => void;
}

type ImageSource = "file" | "url";

export function AddPixelModal({ open, onClose, onAdded }: AddPixelModalProps) {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [width, setWidth] = useState("1");
    const [height, setHeight] = useState("1");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageSource, setImageSource] = useState<ImageSource>("file");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (imageSource === "file" && file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (imageSource === "url" && imageUrl.trim()) {
            setPreviewUrl(imageUrl.trim());
        } else {
            setPreviewUrl(null);
        }
    }, [file, imageUrl, imageSource]);

    const uploadImageToSupabase = async (file: File): Promise<string | null> => {
        const filePath = `${Date.now()}_${file.name}`;
        
        const { error } = await supabase.storage.from("pixel-images").upload(filePath, file);
        
        if (error) {
            console.error("Upload error:", error);
            return null;
        }

        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pixel-images/${filePath}`;
    };

    const handleSubmit = async () => {
        if (!x || !y || !name || !message || (imageSource === "file" ? !file : !imageUrl.trim())) {
            toast.error("모든 필드를 입력해주세요.");
            return;
        }

        setLoading(true);

        let finalImageUrl = imageUrl;
        if (imageSource === "file" && file) {
            const uploaded = await uploadImageToSupabase(file);
            
            if (!uploaded) {
                setLoading(false);
                return toast.error("이미지 업로드에 실패했습니다.");
            }
            
            finalImageUrl = uploaded;
        }

        const { error } = await supabase.from("pixels").insert({
            x: Number(x),
            y: Number(y),
            width: Number(width),
            height: Number(height),
            name,
            message,
            image_url: finalImageUrl,
        });

        setLoading(false);

        if (error) {
            toast.error("추가 실패: " + error.message);
        } else {
            toast.success("✅ 픽셀이 추가되었습니다.");
            onAdded();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>🆕 픽셀 수동 추가</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="pb-2" htmlFor="x">X</Label>
                            <Input value={x} onChange={(e) => setX(e.target.value)} type="number" min={0} />
                        </div>
                        <div>
                            <Label className="pb-2" htmlFor="y">Y</Label>
                            <Input value={y} onChange={(e) => setY(e.target.value)} type="number" min={0} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="pb-2" htmlFor="width">Width</Label>
                            <Input value={width} onChange={(e) => setWidth(e.target.value)} type="number" min={1} />
                        </div>
                        <div>
                            <Label className="pb-2" htmlFor="height">Height</Label>
                            <Input value={height} onChange={(e) => setHeight(e.target.value)} type="number" min={1} />
                        </div>
                    </div>

                    <div>
                        <Label className="pb-2" htmlFor="name">Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <Label className="pb-2" htmlFor="message">Message</Label>
                        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>

                    <div>
                        <Label>Image Input Type</Label>
                        <div className="flex gap-2 mt-2">
                            <Button type="button" variant={imageSource === "file" ? "default" : "outline"} onClick={() => setImageSource("file")}>Upload File</Button>
                            <Button type="button" variant={imageSource === "url" ? "default" : "outline"} onClick={() => setImageSource("url")}>Use URL</Button>
                        </div>
                    </div>

                    {imageSource === "file" && (
                        <div>
                            <Label className="pb-2" htmlFor="file">Upload Image</Label>
                            <Input id="file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        </div>
                    )}

                    {imageSource === "url" && (
                        <div>
                            <Label className="pb-2" htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        </div>
                    )}

                    {previewUrl && (
                        <div className="mt-2">
                            <Label>Preview</Label>
                            <Image src={previewUrl} alt="preview" width={256} height={192} className="w-full max-h-48 object-contain border rounded" />
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose} disabled={loading}>취소</Button>
                    <Button onClick={handleSubmit} disabled={loading}>저장</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
