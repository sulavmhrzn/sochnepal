import { clsx, type ClassValue } from "clsx";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const getStatusConfig = (status: string) => {
    switch (status) {
        case "pending":
            return {
                label: "Pending Review",
                className: "bg-yellow-100 text-yellow-800 border-yellow-200",
                icon: Clock,
            };
        case "in-progress":
            return {
                label: "In Progress",
                className: "bg-blue-100 text-blue-800 border-blue-200",
                icon: AlertTriangle,
            };
        case "resolved":
            return {
                label: "Resolved",
                className: "bg-green-100 text-green-800 border-green-200",
                icon: CheckCircle,
            };
        default:
            return {
                label: status,
                className: "bg-gray-100 text-gray-800 border-gray-200",
                icon: Clock,
            };
    }
};
