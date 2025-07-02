import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";

export const commentSchema = z.object({
    content: z.string().nonempty("Must not be empty"),
});
export const useAddComment = ({ reportId }: { reportId: number }) => {
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        },
    });

    const { mutate: addComment, isPending: addCommentPending } = useMutation({
        mutationFn: async (value: z.infer<typeof commentSchema>) => {
            await customAxios.post(`/reports/${reportId}/comments/`, {
                content: value.content,
                report: reportId,
            });
        },
        onSuccess() {
            toast.success("Your comment has been successfully posted");
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["comments", reportId] });
        },
        onError() {
            toast.error("Something went wrong. Please try again");
        },
    });
    return { addComment, addCommentPending, form };
};
