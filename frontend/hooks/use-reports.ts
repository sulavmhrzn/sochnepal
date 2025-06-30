import { customAxios } from "@/lib/customAxios";
import { Report, ReportListAPIResponse } from "@/lib/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useReports = ({
    selectedStatus = "all",
    selectedCategory = "all",
    currentPage = 1,
    searchQuery = "",
}: {
    selectedStatus?: string;
    selectedCategory?: string;
    currentPage?: number;
    searchQuery?: string;
}) => {
    const { data, isLoading, isError, refetch } =
        useQuery<ReportListAPIResponse>({
            queryKey: [
                "reports",
                selectedStatus,
                selectedCategory,
                currentPage,
            ],
            queryFn: async () => {
                const response = await customAxios.get("/reports", {
                    params: {
                        status:
                            selectedStatus !== "all"
                                ? selectedStatus
                                : undefined,
                        category:
                            selectedCategory !== "all"
                                ? selectedCategory
                                : undefined,
                        title:
                            searchQuery.trim().length !== 0
                                ? searchQuery
                                : undefined,
                        page: currentPage,
                    },
                });
                return response.data;
            },
        });
    return { data, isLoading, isError, refetch };
};

export const useReport = (id: number) => {
    const { data } = useSuspenseQuery({
        queryKey: ["report", id],
        queryFn: async () => {
            const response = await customAxios.get(`/reports/${id}/`);
            return response.data as Report;
        },
    });
    return { data };
};

export const useGetCurrentUserReports = ({
    selectedStatus,
}: {
    selectedStatus: string;
}) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["my-reports", selectedStatus],
        queryFn: async () => {
            const response = await customAxios.get("/reports/my", {
                params: {
                    status:
                        selectedStatus !== "all" ? selectedStatus : undefined,
                },
            });
            return response.data as Report[];
        },
    });
    return { data, isLoading, isError };
};
