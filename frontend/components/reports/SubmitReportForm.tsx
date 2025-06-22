"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MapPin, Camera, AlertCircle, Trash2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useCategories } from "@/hooks/use-categories";
import axios from "axios";

const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const reportSchema = z.object({
    title: z.string().nonempty().min(5),
    category_id: z.string().nonempty(),
    description: z.string().nonempty().min(20),
    address: z.string().nonempty(),
    location_lat: z.coerce.number(),
    location_lng: z.coerce.number(),
    image: z
        .instanceof(FileList)
        .optional()
        .refine((files) => {
            if (!files) return true;
            if (!files.length) return true;
            return ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type);
        }, "Only jpeg, jpg, png and webp are accepted")
        .refine((files) => {
            if (!files) return true;
            if (!files.length) return true;
            return files[0].size <= MAX_FILE_SIZE;
        }, "Max file size is 5MB"),
});

const SubmitReportForm = () => {
    const router = useRouter();
    const [displayImage, setDisplayImage] = useState<File | null>(null);
    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema),
    });
    const imageRef = form.register("image");
    const { data: categories, isLoading: categoriesLoading } = useCategories();
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: FormData) => {
            await customAxios.post("/reports/", values);
        },
        onSuccess() {
            toast.success(
                "Report submitted successfully! We'll notify you of any updates."
            );
            router.push("/reports");
        },
        onError(error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                if (error.status === 400) {
                    const fieldMapping: Record<
                        string,
                        keyof z.infer<typeof reportSchema>
                    > = {
                        title: "title",
                        description: "description",
                        address: "address",
                        location_lat: "location_lat",
                        location_lng: "location_lng",
                        image: "image",
                    };
                    const errorData = error.response?.data as {
                        [key: string]: string | string[];
                    };
                    Object.entries(errorData).forEach(
                        ([backendField, errorMessages]) => {
                            const frontendField =
                                fieldMapping[backendField] ||
                                (backendField as keyof z.infer<
                                    typeof reportSchema
                                >);
                            const message = Array.isArray(errorMessages)
                                ? errorMessages[0]
                                : errorMessages;
                            toast.error(backendField, { description: message });
                            form.setError(frontendField, { message: message });
                        }
                    );
                }
                return;
            }
            toast.error("Something went wrong. Please try again");
        },
    });
    const onSubmit = (values: z.infer<typeof reportSchema>) => {
        const formData = new FormData();
        Object.entries(values).forEach(([field, value]) => {
            if (field === "image") {
                if (value instanceof FileList && field.length) {
                    formData.append(field, value[0]);
                }
            } else {
                formData.append(field, value as string);
            }
        });
        mutate(formData);
    };
    const handleSetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    toast.info(
                        "Permission granted. Using current location for latitude and longitude."
                    );
                    form.setValue("location_lat", coords.latitude);
                    form.setValue("location_lng", coords.longitude);
                },
                () =>
                    toast.warning(
                        "Permission denied to use device current location"
                    )
            );
        } else {
            toast.error("Geolocation not supported");
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="max-w-4xl mx-auto space-y-8 py-8">
                    {/* Basic Information */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <AlertCircle className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Basic Information
                                    </h2>
                                </div>

                                {/* Title */}
                                <FormField
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Report Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="title"
                                                    placeholder="Brief, descriptive title for your report"
                                                    className="w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Keep it concise and specific
                                                (e.g., &quot;Broken streetlight
                                                on Main Street&quot;)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Category */}
                                <div className="space-y-2">
                                    <FormField
                                        name="category_id"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        disabled={
                                                            categoriesLoading
                                                        }
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categories?.map(
                                                                (category) => (
                                                                    <SelectItem
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        value={`${category.id}`}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <div
                                                                                className="w-2 h-2 rounded-full"
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        category.color,
                                                                                }}
                                                                            />
                                                                            <span className="capitalize">
                                                                                {category.name.toLowerCase()}
                                                                            </span>
                                                                            <span>
                                                                                {" "}
                                                                                -{" "}
                                                                                {
                                                                                    category.name_nepali
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <FormField
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        id="description"
                                                        className="w-full min-h-32 resize-none"
                                                        rows={6}
                                                        placeholder="Provide detailed information about the issue..."
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormDescription>
                                                    Include relevant details
                                                    like when it started, how it
                                                    affects the community, etc.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location Information */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <MapPin className="h-4 w-4 text-green-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Location Details
                                    </h2>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <FormField
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="e.g., Ward 14, Kathmandu Metropolitan City"
                                                        className="w-full"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Provide the full address or
                                                    nearest landmark
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Coordinates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <FormField
                                            name="location_lat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Latitude
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="location_lat"
                                                            type="number"
                                                            step="any"
                                                            placeholder="27.7172"
                                                            className="w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormField
                                            name="location_lng"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Longitude
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="location_lng"
                                                            type="number"
                                                            step="any"
                                                            placeholder="27.7172"
                                                            className="w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Location Helper */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-blue-900">
                                                Need help finding coordinates?
                                            </p>
                                            <div className="space-y-1 text-xs text-blue-700">
                                                <p>
                                                    • Use your phone&apos;s GPS
                                                    or Google Maps
                                                </p>
                                                <p>
                                                    • Click &quot;Use Current
                                                    Location&quot; to auto-fill
                                                </p>
                                                <p>
                                                    • Drop a pin on the map
                                                    below
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="mt-2"
                                                onClick={handleSetLocation}
                                            >
                                                <MapPin className="h-4 w-4 mr-2" />
                                                Use Current Location
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Map placeholder */}
                                <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                                        <p className="font-medium">
                                            Interactive Map
                                        </p>
                                        <p className="text-sm">
                                            Coming soon...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Image Upload */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Camera className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Add Photo
                                    </h2>
                                    <span className="text-sm text-gray-500">
                                        (Optional)
                                    </span>
                                </div>

                                {/* Image Upload Area */}
                                {displayImage && (
                                    <>
                                        <div className="aspect-video">
                                            <Image
                                                src={URL.createObjectURL(
                                                    displayImage
                                                )}
                                                alt=""
                                                width={600}
                                                height={600}
                                                className="h-full w-auto"
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    form.setValue(
                                                        "image",
                                                        undefined
                                                    );
                                                    setDisplayImage(null);
                                                }}
                                            >
                                                <Trash2 />
                                                Remove Photo
                                            </Button>
                                        </div>
                                    </>
                                )}
                                <FormField
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Upload Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    {...imageRef}
                                                    onChange={(e) => {
                                                        field.onChange(
                                                            e.target
                                                                .files?.[0] ??
                                                                undefined
                                                        );
                                                        setDisplayImage(
                                                            e.target
                                                                .files?.[0] as File
                                                        );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        disabled
                                    >
                                        Save as Draft
                                    </Button>
                                </div>

                                <Button size="lg" disabled={isPending}>
                                    {isPending
                                        ? "Submitting Report..."
                                        : "Submit Report"}
                                </Button>
                            </div>

                            <div className="mt-4 text-xs text-gray-500">
                                <p>
                                    By submitting this report, you agree to our{" "}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
};

export default SubmitReportForm;
