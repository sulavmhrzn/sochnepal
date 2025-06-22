// components/forms/SubmitReportHeader.tsx
import { FileText, Users, AlertCircle } from "lucide-react";

const SubmitReportHeader = () => {
    return (
        <div className="bg-white border-b">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
                <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Submit a Report
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Help improve your community by reporting civic
                            issues. Your voice matters in building a better
                            Nepal.
                        </p>
                    </div>

                    {/* Stats or features */}
                    <div className="flex flex-wrap justify-center gap-8 pt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span>
                                Join <strong>2,000+</strong> active citizens
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <AlertCircle className="h-4 w-4 text-green-500" />
                            <span>
                                <strong>300+</strong> issues resolved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitReportHeader;
