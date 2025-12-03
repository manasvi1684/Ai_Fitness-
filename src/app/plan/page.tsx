"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlanDisplay from "@/components/PlanDisplay";
import { FitnessPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function PlanPage() {
    const router = useRouter();
    const [plan, setPlan] = useState<FitnessPlan | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("fitnessPlan");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.plan) {
                    setPlan(parsed.plan);
                } else {
                    router.push("/create");
                }
            } catch (e) {
                console.error("Failed to parse plan", e);
                router.push("/create");
            }
        } else {
            router.push("/create");
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!plan) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 relative">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="w-4 h-4" /> Home
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/create">
                            <Button variant="outline">Create New</Button>
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>

                <PlanDisplay plan={plan} />
            </div>
        </div>
    );
}
