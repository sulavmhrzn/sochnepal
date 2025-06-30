import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import axios from "axios";

export const issueSchema = z.object({
    reason: z.enum(["spam", "duplicate", "offensive", "other"]),
    description: z.string(),
});
export const useFlagReport = ({ id }: { id: number }) => {
    const form = useForm({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            reason: "other" as const,
            description: "",
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof issueSchema>) => {
            await customAxios.post("/flags/", {
                reason: data.reason,
                description: data.description,
                report: id,
            });
        },
        onSuccess() {
            toast.success("Report flagged successfully", {
                description:
                    "Thank you for helping us maintain community standards. Our moderation team will review this report within 24 hours.",
            });
            form.reset();
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 409) {
                    toast.error("Already reported", {
                        description:
                            "You have already flagged this report. Our team is aware and will review it soon.",
                    });
                    return;
                }
                if (error.status === 400) {
                    toast.error("Invalid submission", {
                        description:
                            "Please check your input and try again. Both reason and description are required.",
                    });
                    return;
                }
            }
            toast.error("Failed to submit report", {
                description:
                    "Something went wrong. Please try again in a few moments.",
            });
        },
    });
    return { mutate, isPending, form };
};
