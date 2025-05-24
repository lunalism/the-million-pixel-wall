// app/admin/pixels/columns.ts

"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

// ✅ Pixel 타입 export
export type Pixel = {
  id: string;
  x: number;
  y: number;
  name: string;
  message: string;
  image_url: string;
  created_at: string;
};

// ⚙️ Action 핸들러 타입 정의
interface ColumnHandlers {
  onEdit: (pixel: Pixel) => void;
  onDelete: (pixel: Pixel) => void;
}

// 📦 컬럼 정의 함수로 export
export const rawColumns = ({ onEdit, onDelete }: ColumnHandlers): ColumnDef<Pixel>[] => [
  {
    accessorKey: "x",
    header: "X",
  },
  {
    accessorKey: "y",
    header: "Y",
  },
  {
    accessorKey: "name",
    header: "이름",
  },
  {
    accessorKey: "message",
    header: "메세지",
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-[200px] text-muted-foreground text-sm">
        {row.original.message}
      </span>
    ),
  },
  {
    accessorKey: "image_url",
    header: "이미지",
    cell: ({ row }) => (
      <Image
        src={row.original.image_url}
        alt="preview"
        width={64}
        height={64}
        className="w-10 h-10 rounded object-cover border"
      />
    ),
  },
  {
    accessorKey: "created_at",
    header: "생성일",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.created_at), "yyyy-MM-dd HH:mm")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onEdit(row.original)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.original)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
