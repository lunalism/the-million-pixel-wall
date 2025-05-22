// app/admin/pixels/columns.ts

"use client"; // ✅ 꼭 필요!

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";

// Pixel 타입
export type Pixel = {
  id: string;
  x: number;
  y: number;
  name: string;
  message: string;
  image_url: string;
  created_at: string;
};

// 테이블 컬럼 정의
export const columns: ColumnDef<Pixel>[] = [
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
      <Image src={row.original.image_url} alt="preview" width={64} height={64} className="w-10 h-10 rounded object-cover border" />
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
];
