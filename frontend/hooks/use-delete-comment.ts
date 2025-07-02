import { customAxios } from "@/lib/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteComment = ({ reportId }: { reportId: number }) => {
    const queryClient = useQueryClient();

    const { mutate: deleteComment, isPending: deleteCommentPending } =
        useMutation({
            mutationFn: async (commentId: number) => {
                await customAxios.delete(
                    `/reports/${reportId}/comments/${commentId}/`
                );
            },
            onSuccess() {
                toast.success("Your comment has been deleted");
                queryClient.invalidateQueries({
                    queryKey: ["comments", reportId],
                });
            },
            onError() {
                toast.error("Something went wrong. Please try again");
            },
        });
    return { deleteComment, deleteCommentPending };
};
