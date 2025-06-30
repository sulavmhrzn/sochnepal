import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ApiErrorResponse {
    [key: string]: string | string[];
}

export const signupSchema = z
    .object({
        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const useSignup = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof signupSchema>) => {
            await customAxios.post("/auth/users/", {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                password: data.password,
            });
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/login");
        },
        onError: (error) => {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.status === 400) {
                    const fieldMapping: Record<
                        string,
                        keyof z.infer<typeof signupSchema>
                    > = {
                        first_name: "firstName",
                        last_name: "lastName",
                        email: "email",
                        password: "password",
                    };
                    const errorData = error.response?.data as ApiErrorResponse;

                    Object.entries(errorData).forEach(
                        ([backendField, errorMessages]) => {
                            const frontendField = fieldMapping[backendField];
                            const message = Array.isArray(errorMessages)
                                ? errorMessages[0]
                                : errorMessages;
                            toast.error(`${frontendField}`, {
                                description: message,
                            });
                            if (frontendField in form.getValues()) {
                                form.setError(frontendField, {
                                    type: "server",
                                    message: message,
                                });
                            }
                        }
                    );
                    return;
                }
            }
            toast.error("Something went wrong");
        },
    });
    return { mutate, isPending, form };
};
