import { customAxios } from "@/lib/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpvoteReport = () => {
    const queryClient = useQueryClient();
    const { mutate, status } = useMutation({
        mutationFn: async (id: number) => {
            await customAxios.post("/reports/upvotes/", {
                report: id,
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["report"],
            });
        },
        onError() {
            toast.error("Failed to up vote the report. Please try again");
        },
    });
    return { mutate, status };
};
