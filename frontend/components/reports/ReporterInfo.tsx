import { Card, CardContent } from "../ui/card";

const ReporterInfo = ({ fullName }: { fullName: string }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">
                    Reported By
                </h3>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                            {fullName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">
                            {fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                            Citizen Reporter
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReporterInfo;
