import { customAxios } from "@/lib/customAxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const reportSchema = z.object({
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

export const useSubmitReport = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema),
    });
    const imageRef = form.register("image");

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
    return { mutate, isPending, form, imageRef };
};
