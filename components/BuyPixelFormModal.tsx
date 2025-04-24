import { useState } from "react"

/**
 * BuyPixelFormModal
 * 픽셀 구매 폼 모달 컴포넌트입니다.
 * 사용자는 이미지 URL 입력 또는 파일 업로드 중 하나를 선택할 수 있으며,
 * 이름, 메시지, 크기 정보 등을 입력하여 픽셀 구매 요청을 보냅니다.
 */

export default function BuyPixelFormModal({ x, y, isOpen, onClose }: {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  // 픽셀 크기 (가로, 세로)
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  // 구매자 이름 및 메시지
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  // 이미지 선택 방식: URL 또는 파일 업로드
  const [uploadType, setUploadType] = useState<"url" | "file">("url")
  // 이미지 URL 입력값
  const [imageUrl, setImageUrl] = useState("")
  // 파일 업로드 객체 및 미리보기 URL
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // 모달이 열리지 않은 경우 null 반환 (렌더하지 않음)
  if (!isOpen) return null

  // 파일 업로드 시 미리보기 URL 생성
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // 구매하기 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    // TODO: Supabase 업로드 및 데이터 저장 연동 예정
    const data = {
      x,
      y,
      width,
      height,
      name,
      message,
      image_url: uploadType === "url" ? imageUrl : previewUrl, // 실제 업로드 후 교체 필요
    }
    console.log("🛒 구매 요청 데이터:", data)
    onClose()
  }

  return (
    // 모달 배경 및 중앙 정렬 레이아웃
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">픽셀 구매하기</h2>

        {/* 픽셀 위치 정보 */}
        <p className="text-sm text-gray-600 mb-2">위치: ({x}, {y})</p>

        {/* 크기 입력 필드 */}
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Width"
            className="w-1/2 border rounded px-2 py-1"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Height"
            className="w-1/2 border rounded px-2 py-1"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </div>

        {/* 이름 및 메시지 입력 필드 */}
        <input
          type="text"
          placeholder="이름"
          className="w-full border rounded px-2 py-1 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="메시지"
          className="w-full border rounded px-2 py-1 mb-4"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 이미지 선택 방식: URL 또는 파일 */}
        <div className="mb-2">
          <label className="font-medium text-sm">이미지 방식 선택</label>
          <div className="flex gap-2 mt-1">
            <button
              className={`px-3 py-1 rounded ${
                uploadType === "url" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setUploadType("url")}
            >
              URL 입력
            </button>
            <button
              className={`px-3 py-1 rounded ${
                uploadType === "file" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setUploadType("file")}
            >
              파일 업로드
            </button>
          </div>
        </div>

        {/* 이미지 입력 또는 업로드 */}
        {uploadType === "url" ? (
          <input
            type="text"
            placeholder="이미지 URL 입력"
            className="w-full border rounded px-2 py-1 mb-2"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value)
              setPreviewUrl(e.target.value)
            }}
          />
        ) : (
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2"/>
        )}

        {/* 이미지 미리보기 */}
        {previewUrl && (
          <div className="mb-4">
            <img src={previewUrl} alt="preview" className="w-full h-auto rounded" />
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-1 rounded bg-gray-300" onClick={onClose}>
            취소
          </button>
          <button className="px-4 py-1 rounded bg-blue-600 text-white" onClick={handleSubmit}>
            구매하기
          </button>
        </div>
      </div>
    </div>
  )
}
