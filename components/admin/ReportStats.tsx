// components/admin/ReportStats.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportStats() {
    const [stats, setStats] = useState({
        total: 0,
        approved: 0,
        removed: 0,
        pending: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
        const total = await supabase.from("reports").select("*", { count: "exact", head: true });
        const approved = await supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "approved");
        const removed = await supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "removed");
        const pending = await supabase.from("reports").select("*", { count: "exact", head: true }).eq("status", "pending");

        setStats({
            total: total.count || 0,
            approved: approved.count || 0,
            removed: removed.count || 0,
            pending: pending.count || 0,
        });
        };

        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total Reports</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.total}</CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Approved Reports</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.approved}</CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Removed Pixels</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.removed}</CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pending Reports</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.pending}</CardContent>
            </Card>
        </div>
    );
}
