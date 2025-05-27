// components/pixels/KoreanPurchaseInfoModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface KoreanPurchaseInfoModalProps {
  open: boolean;
  onClose: () => void;
}

export function KoreanPurchaseInfoModal({ open, onClose }: KoreanPurchaseInfoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>한국에서 구매를 원하시나요?</DialogTitle>
          <DialogDescription>
            현재 본 서비스는 <strong>해외 결제 전용(PayPal)</strong>으로 운영되고 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="text-sm leading-relaxed space-y-4">
          <p>
            일반적인 한국 PayPal 계정으로는 결제가 어려울 수 있습니다. 하지만 <strong>해외 PayPal 계정</strong>을 보유하고 계시거나, 해외 발급 카드로 결제가 가능한 경우에는 그대로 진행해 주세요.
          </p>
          <p>
            만약 해당 조건을 충족하지 않으신다면, 아래 정보를 포함하여 이메일로 문의해 주세요. 확인 후 수동 등록해드립니다:
          </p>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>구매자 이름</li>
            <li>원하는 픽셀 좌표 및 크기</li>
            <li>이미지 파일 또는 이미지 링크</li>
            <li>링크 및 메시지</li>
          </ul>
          <p>
            📩 <a href="mailto:chrisholic22@gmail.com" className="underline hover:no-underline text-primary">chrisholic22@gmail.com</a>
          </p>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
