import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { customAxios } from "@/lib/customAxios";
import { toast } from "sonner";
import axios from "axios";

const ReportIssue = ({ reportId }: { reportId: number }) => {
    const issueSchema = z.object({
        reason: z.enum(["spam", "duplicate", "offensive", "other"]),
        description: z.string(),
    });
    const form = useForm({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            reason: "other" as const,
            description: "",
        },
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof issueSchema>) => {
            await customAxios.post("/flags/", {
                reason: data.reason,
                description: data.description,
                report: reportId,
            });
        },
        onSuccess() {
            toast.success("Report flagged successfully", {
                description:
                    "Thank you for helping us maintain community standards. Our moderation team will review this report within 24 hours.",
            });
            form.reset();
        },
        onError(error) {
            if (axios.isAxiosError(error)) {
                if (error.status === 409) {
                    toast.error("Already reported", {
                        description:
                            "You have already flagged this report. Our team is aware and will review it soon.",
                    });
                    return;
                }
                if (error.status === 400) {
                    toast.error("Invalid submission", {
                        description:
                            "Please check your input and try again. Both reason and description are required.",
                    });
                    return;
                }
            }
            toast.error("Failed to submit report", {
                description:
                    "Something went wrong. Please try again in a few moments.",
            });
        },
    });
    const onSubmit = (value: z.infer<typeof issueSchema>) => {
        mutate(value);
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="w-full h-12"
                        variant={"outline"}
                        disabled={isPending}
                    >
                        <Flag className="h-5 w-5 mr-3" />
                        Report Issue
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Report Content Violation</DialogTitle>
                        <DialogDescription>
                            If you believe this report contains inappropriate
                            content, misinformation, or violates our terms of
                            service, please let us know. Our moderation team
                            will review your submission within 24 hours.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reason</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select reason" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="spam">
                                                    Spam or Fake
                                                </SelectItem>
                                                <SelectItem value="duplicate">
                                                    Duplicate Report
                                                </SelectItem>
                                                <SelectItem value="offensive">
                                                    Offensive Content
                                                </SelectItem>
                                                <SelectItem value="other">
                                                    Other
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={4} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ReportIssue;
