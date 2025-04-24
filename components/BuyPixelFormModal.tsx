import { useState, useEffect } from "react"
import { savePixel } from "@/lib/savePixel"
import { uploadImage } from "@/lib/uploadImage" // ✅ 이미지 업로드 유틸 추가

/**
 * BuyPixelFormModal
 * 픽셀 구매 폼 모달 컴포넌트입니다.
 * 사용자에게 이미지 입력 방식 (URL or 업로드), 크기, 이름, 메시지 등을 입력받아 구매를 수행합니다.
 */

export default function BuyPixelFormModal({ x, y, isOpen, onClose, onPixelSaved }: {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onPixelSaved?: () => void // ✅ 저장 후 실행되는 콜백
}) {
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [uploadType, setUploadType] = useState<"url" | "file">("url")
  const [imageUrl, setImageUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setWidth(10)
      setHeight(10)
      setName("")
      setMessage("")
      setImageUrl("")
      setUploadedFile(null)
      setPreviewUrl(null)
      setUploadType("url")
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (width < 10 || height < 10) {
      alert("Minimum size is 10x10 pixels.")
      return
    }

    let finalImageUrl = ""

    try {
      if (uploadType === "file") {
        if (!uploadedFile) {
          alert("파일을 선택해주세요!")
          return
        }
        const uploadedUrl = await uploadImage(uploadedFile)
        if (!uploadedUrl) {
          alert("이미지 업로드에 실패했어요.")
          return
        }
        finalImageUrl = uploadedUrl
      } else {
        finalImageUrl = imageUrl
      }
      console.log("🖼 최종 저장될 image_url:", finalImageUrl)
      // ✅ waitForImage 제거 → Supabase fetch 시점에 CDN 준비 완료된 상태로 가정
      await savePixel({
        x,
        y,
        width,
        height,
        name,
        message,
        image_url: finalImageUrl,
      })

      onClose()
      onPixelSaved?.() // fetchPixels로 다시 불러와서 렌더링
    } catch (error) {
      console.error("❌ Error while saving pixel:", error)
      alert("이미지를 저장하는 데 실패했어요. 다시 시도해주세요.")
    }
  }

  return (
    // 모달 배경과 컨테이너
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      <div className="bg-neutral-800 rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto">
        {/* 타이틀 및 픽셀 위치 정보 */}
        <div className="flex justify-between items-center mb-6 text-white">
          {/* 왼쪽: 제목 */}
          <h2 className="text-2xl font-bold">🛍 픽셀을 구매하세요!</h2>
          {/* 오른쪽: 위치 정보 */}
          <p className="text-sm">🧱 위치: ({x}, {y})</p>
        </div>

        {/* 이름 및 메시지 입력 */}
        <input
          type="text"
          placeholder="이름을 입력하세요"
          className="w-full border border-gray-600 rounded-lg px-3 py-2 mb-3 text-sm text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="남기고 싶은 메시지"
          className="w-full border border-gray-600 rounded-lg px-3 py-2 mb-5 text-sm text-white"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 크기 입력 필드 */}
        <div className="flex gap-2 mb-4">
            <label className="w-[20%] block text-sm text-gray-300 mb-1">
                구매할<br /> 픽셀 크기
            </label>
            <input
                type="number"
                placeholder="가로"
                className="w-[40%] border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"
                value={width}
                min={1}
                onChange={(e) => setWidth(Number(e.target.value))}
            />
            <input
                type="number"
                placeholder="세로"
                className="w-[40%] border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"
                value={height}
                min={1}
                onChange={(e) => setHeight(Number(e.target.value))}
            />
        </div>
        {/* 최소 크기 경고 */}
        {(width < 10 || height < 10) && (
          <p className="text-xs text-red-400 mb-4">
            ⚠️ 최소 구매 크기는 10×10 픽셀입니다.
          </p>
        )}

        {/* 이미지 업로드 영역: 좌우 분할 구조 */}
        <div className="flex gap-4 mb-6">
          {/* 왼쪽 영역: 업로드 방식 + 입력 필드 */}
          <div className="w-1/2">
            <label className="block text-sm font-bold mb-2 text-white">이미지 방식 선택</label>
            <div className="flex gap-2 mb-2">
              <button
                className={`flex-1 px-3 py-1 rounded text-sm font-medium ${
                  uploadType === "url"
                    ? "bg-[#D68A59] text-white"
                    : "bg-transparent text-white border border-gray-600"
                }`}
                onClick={() => setUploadType("url")}
              >
                URL
              </button>
              <button
                className={`flex-1 px-3 py-1 rounded text-sm font-medium ${
                  uploadType === "file"
                    ? "bg-[#D68A59] text-white"
                    : "bg-transparent text-white border border-gray-600"
                }`}
                onClick={() => setUploadType("file")}
              >
                파일
              </button>
            </div>
            {uploadType === "url" ? (
              <input
                type="text"
                placeholder="이미지 URL 입력"
                className="w-full border border-white/20 rounded px-3 py-2 text-sm bg-transparent text-white"
                value={imageUrl || ""}
                onChange={(e) => {
                  setImageUrl(e.target.value)
                  setPreviewUrl(e.target.value)
                }}
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                className="w-full h-[38px] border border-white/20 rounded px-3 py-2 text-sm bg-transparent text-white"
                onChange={handleFileChange}
                value={""}
              />
            )}
          </div>

          {/* 오른쪽 영역: 미리보기 */}
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-2 text-white">🖼 미리보기</label>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="preview"
                className="w-full h-auto rounded-lg border border-white/10 shadow-sm"
              />
            ) : (
              <div className="w-full h-[160px] rounded-lg border border-dashed border-white/10 flex items-center justify-center text-xs text-gray-400">
                미리보기 이미지 없음
              </div>
            )}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-sm rounded-lg transition text-white ${
              width < 10 || height < 10
                ? "bg-blue-600/30 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  )
}
