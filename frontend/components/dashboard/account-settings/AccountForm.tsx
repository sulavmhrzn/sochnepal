"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { MailWarning } from "lucide-react";
import { useResendVerificationEmail } from "@/hooks/use-resend-verification-email-";

const accountSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
});

interface ApiErrorResponse {
    [key: string]: string | string[];
}

type AccountFormFields = keyof z.infer<typeof accountSchema>;

const AccountForm = () => {
    const authStore = useAuthStore();
    const [isLoaded, setIsLoaded] = useState(false);
    const {
        mutate: resendVerificationMutation,
        status: resendVerificationStatus,
    } = useResendVerificationEmail();
    const form = useForm<z.infer<typeof accountSchema>>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            firstName: authStore.user?.firstName,
            lastName: authStore.user?.lastName,
            email: authStore.user?.email || "",
        },
    });
    useEffect(() => {
        if (authStore.user && !isLoaded) {
            form.reset({
                firstName: authStore.user.firstName,
                lastName: authStore.user.lastName,
                email: authStore.user.email,
            });
            setIsLoaded(true);
        }
    }, [authStore.user, form, isLoaded]);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof accountSchema>) => {
            const response = await customAxios.patch("/auth/users/me/", {
                first_name: data.firstName,
                last_name: data.lastName,
            });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Account settings updated successfully");
            authStore.updateUser({
                email: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
                is_verified: data.is_verified,
            });
        },
        onError: (error) => {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const errorData = error.response?.data as ApiErrorResponse;

                    const fieldMapping: Record<string, AccountFormFields> = {
                        first_name: "firstName",
                        last_name: "lastName",
                    };

                    Object.entries(errorData).forEach(
                        ([backendField, errorMessages]) => {
                            const frontendField =
                                fieldMapping[backendField] ||
                                (backendField as AccountFormFields);

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

            toast.error("Something went wrong", {
                description: "Please try again later.",
            });
        },
    });

    const onSubmit = async (values: z.infer<typeof accountSchema>) => {
        mutate(values);
    };

    if (!authStore.user || !isLoaded) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                        Manage your basic account information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <div className="h-4 bg-muted rounded animate-pulse" />
                                <div className="h-10 bg-muted rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 bg-muted rounded animate-pulse" />
                                <div className="h-10 bg-muted rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted rounded animate-pulse" />
                            <div className="h-10 bg-muted rounded animate-pulse" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                    Manage your basic account information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your first name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your last name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>

                                    {!authStore.user?.is_verified && (
                                        <FormDescription>
                                            <span className="flex items-center gap-2">
                                                <MailWarning className="w-5" />{" "}
                                                Your email is not verified.
                                            </span>
                                        </FormDescription>
                                    )}
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="your.email@example.com"
                                            disabled={true} // Always disabled as it's readonly
                                            className="bg-muted"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Email address cannot be changed. Contact
                                        support if you need to update this.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => resendVerificationMutation()}
                                disabled={
                                    authStore.user.is_verified ||
                                    resendVerificationStatus === "pending"
                                }
                            >
                                Send verification email
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AccountForm;
