import { customAxios } from "@/lib/customAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useResendVerificationEmail = () => {
    const { mutate, status } = useMutation({
        mutationFn: async () => {
            const response = await customAxios.post(
                "/accounts/email/verify/resend/"
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success(
                "Verification email sent! Please check your inbox and spam folder."
            );
        },
        onError: () => {
            toast.error(
                "Failed to send verification email. Please try again later."
            );
        },
    });
    return { mutate, status };
};
