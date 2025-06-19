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
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    Trash2,
    AlertTriangle,
    Shield,
    Eye,
    EyeOff,
    UserX,
    Info,
} from "lucide-react";

const deleteAccountSchema = z
    .object({
        password: z
            .string()
            .min(1, "Password is required to delete your account"),
        confirmationText: z.string(),
    })
    .refine(
        (data) => {
            return data.confirmationText === "DELETE MY ACCOUNT";
        },
        {
            path: ["confirmationText"],
            message: "Please type 'DELETE MY ACCOUNT' to confirm",
        }
    );

interface ApiErrorResponse {
    [key: string]: string | string[];
}

const DangerZone = () => {
    const authStore = useAuthStore();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof deleteAccountSchema>>({
        resolver: zodResolver(deleteAccountSchema),
        defaultValues: {
            password: "",
            confirmationText: "",
        },
    });

    const { mutate: deleteAccount, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof deleteAccountSchema>) => {
            const response = await customAxios.delete("/auth/users/me/", {
                data: {
                    current_password: data.password,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Account deleted successfully");
            authStore.logout();
            router.push("/");
        },
        onError: (error) => {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const errorData = error.response?.data as ApiErrorResponse;

                    if (errorData.current_password) {
                        const message = Array.isArray(
                            errorData.current_password
                        )
                            ? errorData.current_password[0]
                            : errorData.current_password;

                        form.setError("password", {
                            type: "server",
                            message: message,
                        });

                        toast.error("Incorrect password", {
                            description: message,
                        });
                        return;
                    }
                }

                if (error.response?.status === 401) {
                    toast.error("Authentication failed", {
                        description: "Password is incorrect",
                    });
                    form.setError("password", {
                        type: "server",
                        message: "Password is incorrect",
                    });
                    return;
                }
            }

            toast.error("Failed to delete account", {
                description: "Please try again later or contact support.",
            });
        },
    });

    const onSubmit = async (values: z.infer<typeof deleteAccountSchema>) => {
        deleteAccount(values);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        form.reset();
    };

    return (
        <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                </CardTitle>
                <CardDescription className="text-red-600">
                    Irreversible actions that will permanently affect your
                    account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Alert className="border-amber-200 bg-amber-50">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                        <strong>
                            What happens when you delete your account:
                        </strong>
                        <ul className="mt-2 ml-4 list-disc space-y-1 text-sm">
                            <li>
                                All your submitted reports will be permanently
                                deleted
                            </li>
                            <li>
                                Your profile and personal information will be
                                removed
                            </li>
                            <li>
                                You won&apos;t be able to track your existing
                                reports
                            </li>
                            <li>This action cannot be undone</li>
                        </ul>
                    </AlertDescription>
                </Alert>

                <div className="border border-red-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                Delete Account
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Permanently remove your SochNepal account and
                                all associated data. This action cannot be
                                reversed.
                            </p>
                        </div>
                    </div>

                    <AlertDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                    >
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="flex items-center gap-2"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <UserX className="h-4 w-4" />
                                Delete My Account
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="sm:max-w-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="h-5 w-5" />
                                    Delete Account Confirmation
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will permanently delete your
                                    account and cannot be undone. All your data
                                    will be lost forever.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Confirm your password
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={
                                                                showPassword
                                                                    ? "text"
                                                                    : "password"
                                                            }
                                                            placeholder="Enter your password"
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
                                        name="confirmationText"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Type{" "}
                                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                                                        DELETE MY ACCOUNT
                                                    </code>{" "}
                                                    to confirm
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="DELETE MY ACCOUNT"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Alert className="border-red-200 bg-red-50">
                                        <Shield className="h-4 w-4 text-red-600" />
                                        <AlertDescription className="text-red-800">
                                            <strong>Final warning:</strong> This
                                            will permanently delete your
                                            account, all your reports, and
                                            personal data. This action cannot be
                                            reversed.
                                        </AlertDescription>
                                    </Alert>

                                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                        <AlertDialogCancel
                                            onClick={handleDialogClose}
                                            disabled={isPending}
                                        >
                                            Cancel
                                        </AlertDialogCancel>
                                        <Button
                                            type="submit"
                                            variant="destructive"
                                            disabled={isPending}
                                            className="w-full sm:w-auto"
                                        >
                                            {isPending ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                                    Deleting Account...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Yes, Delete My Account
                                                </>
                                            )}
                                        </Button>
                                    </AlertDialogFooter>
                                </form>
                            </Form>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default DangerZone;
