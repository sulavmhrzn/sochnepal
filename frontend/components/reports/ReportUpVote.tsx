import { Report } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useUpvoteReport } from "@/hooks/use-upvote-report";

const ReportUpVote = ({ report }: { report: Report }) => {
    const { mutate } = useUpvoteReport();
    return (
        <Button
            variant={report.has_upvoted ? "default" : "outline"}
            className="w-full h-12 text-lg"
            size="lg"
            disabled={status === "pending"}
            onClick={() => mutate(report.id)}
        >
            <ArrowUpIcon
                className={`size-5 mr-3 ${
                    report.has_upvoted ? "fill-current" : ""
                }`}
            />
            {report.has_upvoted ? "Upvoted" : "Upvote"} ({report.up_votes})
        </Button>
    );
};

export default ReportUpVote;
