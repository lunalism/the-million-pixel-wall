// components/admin/PixelStats.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, ImageIcon, Flag, SquareStack } from "lucide-react";

type Props = {
  total: number;
  recentCount: number;
  loading: boolean;
};

export function PixelStats({ total, recentCount, loading }: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pixels</CardTitle>
                    <SquareStack className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {loading ? <Loader2 className="animate-spin" /> : total}
                    </div>
                    <p className="text-xs text-muted-foreground">All purchased pixels</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">
                        {loading ? <Loader2 className="animate-spin" /> : recentCount}
                    </div>
                    <p className="text-xs text-muted-foreground">Last 5 uploaded</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reported Ads</CardTitle>
                    <Flag className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-muted-foreground">—</div>
                    <p className="text-xs text-muted-foreground">Coming soon</p>
                </CardContent>
            </Card>
        </div>
    );
}
