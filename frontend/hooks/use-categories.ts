import { customAxios } from "@/lib/customAxios";
import { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await customAxios.get("/reports/categories");
            return response.data;
        },
    });
};
