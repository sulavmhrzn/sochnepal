import { Target, Eye } from "lucide-react";

const MissionVision = () => {
    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Target className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Our Mission
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To empower Nepali citizens with a digital platform
                            that makes reporting civic issues simple,
                            transparent, and effective. We aim to bridge the gap
                            between communities and local authorities, fostering
                            accountability and collaborative problem-solving.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Eye className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Our Vision
                            </h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            A Nepal where every citizen feels heard, where civic
                            issues are addressed promptly and transparently, and
                            where technology serves as a bridge to stronger,
                            more engaged communities from the mountains to the
                            plains.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionVision;
