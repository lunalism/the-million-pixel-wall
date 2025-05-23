// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (!error) {
            router.replace("/admin");
        } else {
            alert("Login failed: " + error.message);
        }
            setLoading(false);
    };

    return (
        <div className="max-w-sm mx-auto py-20 space-y-6">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            <Button onClick={handleLogin} disabled={loading} className="w-full">
                {loading ? "Logging in..." : "Login"}
            </Button>
        </div>
    );
}
