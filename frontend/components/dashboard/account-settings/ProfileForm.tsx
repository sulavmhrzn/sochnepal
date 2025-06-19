"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import axios from "axios";
import { AlertTriangle, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
    phoneNumber: z
        .string()
        .regex(
            /^\+977[0-9]{10}$/,
            "Please enter a valid Nepali phone number (+977XXXXXXXXXX)"
        )
        .or(z.string().length(0, "Phone number is optional")), // Allow empty string
    location: z
        .string()
        .min(3, "Location must be at least 3 characters")
        .max(255, "Location is too long"),
});

interface ApiErrorResponse {
    [key: string]: string | string[];
}

type ProfileFormFields = keyof z.infer<typeof profileSchema>;

const ProfileForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            phoneNumber: "",
            location: "",
        },
    });
    const { isLoading, isError } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            try {
                const response = await customAxios.get("/accounts/profile");
                const data = response.data;
                form.reset({
                    phoneNumber: data.phone_number || "",
                    location: data.location || "",
                });
                return data;
            } catch (error: unknown) {
                console.log(error);
                toast.error("Failed to fetch profile data");
            }
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof profileSchema>) => {
            const response = await customAxios.patch("/accounts/profile/", {
                phone_number: data.phoneNumber || null, // Send null if empty
                location: data.location,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Profile settings updated successfully");
        },
        onError: (error) => {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const errorData = error.response?.data as ApiErrorResponse;

                    const fieldMapping: Record<string, ProfileFormFields> = {
                        phone_number: "phoneNumber",
                        location: "location",
                    };

                    Object.entries(errorData).forEach(
                        ([backendField, errorMessages]) => {
                            const frontendField =
                                fieldMapping[backendField] ||
                                (backendField as ProfileFormFields);

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

    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        mutate(values);
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Loading...</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-32 bg-muted rounded animate-pulse" />
                </CardContent>
            </Card>
        );
    }
    if (isError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Profile Settings
                    </CardTitle>
                    <CardDescription>
                        Manage your contact information and location details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Unable to load profile
                            </h3>
                            <p className="text-sm text-gray-600 max-w-sm">
                                We couldn&apos;t fetch your profile information.
                                This might be a temporary issue.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={() => window.location.reload()}
                                variant="default"
                                size="sm"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={() => router.push("/dashboard")}
                                variant="outline"
                                size="sm"
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Profile Settings
                </CardTitle>
                <CardDescription>
                    Manage your contact information and location details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        Phone Number (Optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="+977XXXXXXXXXX or XXXXXXXXXX"
                                            {...field}
                                        />
                                    </FormControl>
                                    <p className="text-sm text-muted-foreground">
                                        Enter your phone number for important
                                        notifications
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Location
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g., Ward 5, Kathmandu Metropolitan City, Bagmati Province"
                                            rows={3}
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <p className="text-sm text-muted-foreground">
                                        Provide your complete address including
                                        ward, municipality, district, and
                                        province
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-4 pt-4">
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

export default ProfileForm;
