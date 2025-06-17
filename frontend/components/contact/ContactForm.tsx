"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";

const ContactForm = () => {
    const formSchema = z.object({
        firstName: z.string().nonempty(),
        lastName: z.string().nonempty(),
        email: z.string().email().nonempty(),
        phoneNumber: z
            .string()
            .regex(
                /^\+977[0-9]{10}$/,
                "Please enter a valid Nepali phone number (+977XXXXXXXXXX)"
            )
            .or(
                z
                    .string()
                    .regex(
                        /^[0-9]{10}$/,
                        "Please enter a valid 10-digit phone number"
                    )
            ),
        subject: z.string().nonempty(),
        message: z.string().nonempty(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            subject: "",
            message: "",
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            await customAxios.post("/contact-us/", {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone_number: data.phoneNumber,
                subject: data.subject,
                message: data.message,
            });
        },
        onSuccess: () => {
            toast.success("Success", {
                description:
                    "We have received your message. We will get back to you as soon as possible",
            });
            form.reset();
        },
        onError: () => {
            toast.error("Error", {
                description: "Something went wrong.",
            });
        },
    });
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values);
    };

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Send us a message
                </h2>
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
                                                type="text"
                                                id="firstName"
                                                className="mt-1"
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
                                                type="text"
                                                id="lastName"
                                                required
                                                className="mt-1"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            id="email"
                                            required
                                            className="mt-1"
                                            placeholder="your.email@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="string"
                                            id="phoneNumber"
                                            required
                                            className="mt-1"
                                            placeholder="+977xxxxxxxxxx"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select a topic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general_inquiry">
                                                    General Inquiry
                                                </SelectItem>
                                                <SelectItem value="technical_support">
                                                    Technical Support
                                                </SelectItem>
                                                <SelectItem value="partnership">
                                                    Partnership
                                                </SelectItem>
                                                <SelectItem value="feedback">
                                                    Feedback
                                                </SelectItem>
                                                <SelectItem value="press">
                                                    Press/Media
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>

                        <FormField
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            id="message"
                                            required
                                            className="mt-1"
                                            placeholder="Your message"
                                            {...field}
                                        />
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
                            {isPending ? "Sending Message" : "Send Message"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ContactForm;
