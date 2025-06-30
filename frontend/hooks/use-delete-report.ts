import { customAxios } from "@/lib/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteReport = () => {
    const queryClient = useQueryClient();
    const { mutate, status } = useMutation({
        mutationFn: async (id: number) => {
            await customAxios.delete(`/reports/${id}/`);
        },
        onSuccess: () => {
            toast.success("Your report has been deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["my-reports"],
            });
        },
        onError() {
            toast.error("Could not delete your report at the moment");
        },
    });
    return { mutate, status };
};
