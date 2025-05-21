// components/homepage/PixelGrid.tsx

type Pixel = {
  id: string;
  x: number;
  y: number;
  purchased: boolean;
  color?: string;
  imageUrl?: string;
};

const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const generatePixels = (): Pixel[] => {
  const pixels: Pixel[] = [];
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const id = `${x}-${y}`;
      pixels.push({
        id,
        x,
        y,
        purchased: Math.random() < 0.1, // 10%는 이미 구매된 걸로 표시
        color: "#f3f4f6", // light gray 기본 배경
      });
    }
  }
  return pixels;
};

const mockPixelData = generatePixels();

export function PixelGrid() {
  return (
    <div className="grid grid-cols-20 gap-[1px] bg-gray-300 p-1 rounded-md">
      {mockPixelData.map((pixel) => (
        <div
          key={pixel.id}
          className={`w-6 h-6 cursor-pointer ${
            pixel.purchased
              ? "bg-black pointer-events-none"
              : "bg-white hover:bg-gray-200"
          } transition`}
          title={`(${pixel.x}, ${pixel.y})`}
        />
      ))}
    </div>
  );
}
