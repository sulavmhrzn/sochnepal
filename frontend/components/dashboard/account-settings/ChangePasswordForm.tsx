"use client";
import { useState } from "react";
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import axios from "axios";
import { Eye, EyeOff, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(8, "New password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

interface ApiErrorResponse {
    [key: string]: string | string[];
}

type PasswordFormFields = keyof z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof changePasswordSchema>) => {
            const response = await customAxios.post(
                "/auth/users/set_password/",
                {
                    current_password: data.currentPassword,
                    new_password: data.newPassword,
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Password changed successfully");
            setIsSuccess(true);
            form.reset();
            // Hide success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        },
        onError: (error) => {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const errorData = error.response?.data as ApiErrorResponse;

                    const fieldMapping: Record<string, PasswordFormFields> = {
                        current_password: "currentPassword",
                        new_password: "newPassword",
                    };

                    Object.entries(errorData).forEach(
                        ([backendField, errorMessages]) => {
                            const frontendField =
                                fieldMapping[backendField] ||
                                (backendField as PasswordFormFields);

                            const message = Array.isArray(errorMessages)
                                ? errorMessages[0]
                                : errorMessages;

                            toast.error("Password change failed", {
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

                if (error.response?.status === 401) {
                    toast.error("Authentication failed", {
                        description: "Current password is incorrect",
                    });
                    form.setError("currentPassword", {
                        type: "server",
                        message: "Current password is incorrect",
                    });
                    return;
                }
            }

            toast.error("Something went wrong", {
                description: "Please try again later.",
            });
        },
    });

    const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
        setIsSuccess(false);
        mutate(values);
    };

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const newPassword = form.watch("newPassword");
    const passwordStrength = getPasswordStrength(newPassword);

    const getStrengthColor = (strength: number) => {
        if (strength <= 2) return "bg-red-500";
        if (strength <= 3) return "bg-yellow-500";
        if (strength <= 4) return "bg-blue-500";
        return "bg-green-500";
    };

    const getStrengthText = (strength: number) => {
        if (strength <= 2) return "Weak";
        if (strength <= 3) return "Fair";
        if (strength <= 4) return "Good";
        return "Strong";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Change Password
                </CardTitle>
                <CardDescription>
                    Update your password to keep your account secure
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isSuccess && (
                    <Alert className="mb-6 border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            Your password has been successfully updated. Make
                            sure to remember your new password.
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showCurrentPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your current password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword
                                                    )
                                                }
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showNewPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your new password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    {newPassword && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all ${getStrengthColor(
                                                            passwordStrength
                                                        )}`}
                                                        style={{
                                                            width: `${
                                                                (passwordStrength /
                                                                    5) *
                                                                100
                                                            }%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">
                                                    {getStrengthText(
                                                        passwordStrength
                                                    )}
                                                </span>
                                            </div>
                                            <ul className="text-xs text-gray-600 space-y-1">
                                                <li
                                                    className={`flex items-center gap-1 ${
                                                        newPassword.length >= 8
                                                            ? "text-green-600"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-1 h-1 rounded-full ${
                                                            newPassword.length >=
                                                            8
                                                                ? "bg-green-500"
                                                                : "bg-gray-400"
                                                        }`}
                                                    />
                                                    At least 8 characters
                                                </li>
                                                <li
                                                    className={`flex items-center gap-1 ${
                                                        /[A-Z]/.test(
                                                            newPassword
                                                        )
                                                            ? "text-green-600"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-1 h-1 rounded-full ${
                                                            /[A-Z]/.test(
                                                                newPassword
                                                            )
                                                                ? "bg-green-500"
                                                                : "bg-gray-400"
                                                        }`}
                                                    />
                                                    One uppercase letter
                                                </li>
                                                <li
                                                    className={`flex items-center gap-1 ${
                                                        /[0-9]/.test(
                                                            newPassword
                                                        )
                                                            ? "text-green-600"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-1 h-1 rounded-full ${
                                                            /[0-9]/.test(
                                                                newPassword
                                                            )
                                                                ? "bg-green-500"
                                                                : "bg-gray-400"
                                                        }`}
                                                    />
                                                    One number
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm your new password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full sm:w-auto"
                            >
                                {isPending ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                        Updating Password...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="h-4 w-4 mr-2" />
                                        Update Password
                                    </>
                                )}
                            </Button>
                        </div>

                        <Alert className="border-blue-200 bg-blue-50">
                            <AlertTriangle className="h-4 w-4 text-blue-600" />
                            <AlertDescription className="text-blue-800">
                                <strong>Security tip:</strong> Use a strong
                                password with a mix of letters, numbers, and
                                symbols. Consider using a password manager to
                                generate and store secure passwords.
                            </AlertDescription>
                        </Alert>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ChangePassword;
