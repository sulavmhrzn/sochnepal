// app/reports/[id]/error.tsx
"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Something went wrong
                </h1>
                <p className="text-gray-600 mb-6">
                    Unable to load the report details.
                </p>
                <div className="space-y-3">
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        asChild
                    >
                        <Link href="/reports">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Reports
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
