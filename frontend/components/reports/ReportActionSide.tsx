"use client";
import { Flag, Share2, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";

const ReportActionSide = ({ id }: { id: number }) => {
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [isUpvoted, setIsUpvoted] = useState(false);

    const handleUpvote = () => {
        setIsUpvoted(!isUpvoted);
        setUpvoteCount((prev) => (isUpvoted ? prev - 1 : prev + 1));
    };
    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <Button
                        onClick={handleUpvote}
                        variant={isUpvoted ? "default" : "outline"}
                        className="w-full h-12 text-lg"
                        size="lg"
                    >
                        <ThumbsUp
                            className={`h-5 w-5 mr-3 ${
                                isUpvoted ? "fill-current" : ""
                            }`}
                        />
                        {isUpvoted ? "Upvoted" : "Upvote"} ({upvoteCount})
                    </Button>

                    <Button variant="outline" className="w-full h-12">
                        <Share2 className="h-5 w-5 mr-3" />
                        Share Report
                    </Button>

                    <Button variant="outline" className="w-full h-12">
                        <Flag className="h-5 w-5 mr-3" />
                        Report Issue
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportActionSide;
