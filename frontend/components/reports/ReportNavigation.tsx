import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const ReportNavigation = () => {
    return (
        <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/reports">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Reports
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default ReportNavigation;
