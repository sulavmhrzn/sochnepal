"use client";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "@/store/authStore";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    const authStore = useAuthStore();
    useEffect(() => {
        authStore.initializeAuth();
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default Provider;
