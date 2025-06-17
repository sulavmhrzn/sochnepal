import Image from "next/image";

const OurStory = () => {
    return (
        <div className="bg-gray-50 py-16 w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-gray-600">
                            <p className="text-lg leading-relaxed">
                                SochNepal started in 2024 when a group of young
                                Nepali professionals noticed the same problems
                                in their neighborhoods: broken streetlights that
                                stayed broken for months, garbage collection
                                issues, and road damage that seemed to go
                                unnoticed by authorities.
                            </p>
                            <p className="text-lg leading-relaxed">
                                We realized that while citizens cared deeply
                                about these issues, there wasn&apos;t an easy
                                way to report them or track their resolution.
                                Traditional methods like phone calls to
                                municipality offices often led nowhere, and
                                there was no transparency in the process.
                            </p>
                            <p className="text-lg leading-relaxed">
                                That&apos;s when we decided to build SochNepal -
                                a platform where any citizen can report civic
                                issues with just a photo and location, where
                                communities can rally around shared concerns,
                                and where progress is visible to everyone.
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                            <Image
                                src="/images/cleaning-river.jpg"
                                alt="Nepali community members working together to solve local issues"
                                width={600}
                                height={450}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStory;
