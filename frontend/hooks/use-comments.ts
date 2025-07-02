import { Comment } from "@/components/comments/CommentCard";
import { customAxios } from "@/lib/customAxios";
import { useQuery } from "@tanstack/react-query";

export const useComments = ({ reportId }: { reportId: number }) => {
    const { data: comments, isPending: commentsLoading } = useQuery({
        queryKey: ["comments", reportId],
        queryFn: async () => {
            const response = await customAxios.get(
                `/reports/${reportId}/comments`
            );
            return response.data as Comment[];
        },
    });
    return { comments, commentsLoading };
};
