import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeCta = () => {
    return (
        <div className="bg-primary">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Ready to Make a Difference?
                    </h2>
                    <p className="mt-4 text-lg text-blue-100">
                        Join thousands of Nepali citizens working together for
                        better communities.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/register">Get Started Today</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCta;
