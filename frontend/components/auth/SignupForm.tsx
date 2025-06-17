"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
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
import { useRouter } from "next/navigation";
import axios from "axios";

interface ApiErrorResponse {
    [key: string]: string | string[];
}

const signupSchema = z
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

const SignupForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const onSubmit = async (values: z.infer<typeof signupSchema>) => {
        mutate(values);
    };

    return (
        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <Badge variant="outline" className="mx-auto mb-4">
                    🇳🇵 Join the Movement
                </Badge>
                <CardTitle className="text-2xl font-bold">
                    Create your account
                </CardTitle>
                <CardDescription>
                    Join thousands of citizens making Nepal better
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="First name"
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
                                                placeholder="Last name"
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="your.email@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Create a strong password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
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
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Confirm your password"
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

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">
                        Already have an account?{" "}
                    </span>
                    <Link href="/login" className="font-medium text-primary">
                        Sign in here
                    </Link>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-blue-600 hover:underline"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-blue-600 hover:underline"
                        >
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
