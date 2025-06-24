"use client";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "@/store/authStore";
import { ProgressProvider } from "@bprogress/next/app";

const queryClient = new QueryClient();
const Provider = ({ children }: { children: React.ReactNode }) => {
    const authStore = useAuthStore();
    useEffect(() => {
        authStore.initializeAuth();
    }, []);
    return (
        <ProgressProvider
            height="5px"
            color="oklch(0.705 0.213 47.604)"
            options={{ showSpinner: false }}
            shallowRouting
        >
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ProgressProvider>
    );
};

export default Provider;
