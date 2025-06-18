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
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const authStore = useAuthStore();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof loginSchema>) => {
            const response = await customAxios.post("/auth/jwt/cookie/", {
                email: data.email,
                password: data.password,
            });
            return response.data;
        },
        onSuccess: () => {
            authStore.login({
                email: form.getValues("email"),
            });
            toast.success("Logged in successfully");
            router.push("/");
            form.reset();
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.status === 401) {
                    toast.error("Invalid credentials", {
                        description:
                            "Your email or password does not match. Please try again",
                    });
                    return;
                }
            }
            toast.error("Something went wrong", {
                description: "Could not process your request. Please try again",
            });
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        mutate(values);
    };

    return (
        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <Badge variant="outline" className="mx-auto mb-4">
                    🇳🇵 Welcome Back
                </Badge>
                <CardTitle className="text-2xl font-bold">
                    Sign in to your account
                </CardTitle>
                <CardDescription>
                    Continue your journey in making Nepal better
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
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
                                                placeholder="Your password"
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

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">
                        Don&apos;t have an account yet?{" "}
                    </span>
                    <Link href="/signup" className="font-medium text-primary">
                        Sign up here
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
