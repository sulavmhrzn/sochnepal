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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Report } from "@/lib/types";
import { issueSchema, useFlagReport } from "@/hooks/use-flag-report";

const ReportIssue = ({ report }: { report: Report }) => {
    const { mutate, isPending, form } = useFlagReport({ id: report.id });
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
                        disabled={isPending || report.has_reported}
                    >
                        <Flag className="h-5 w-5 mr-3" />
                        {report.has_reported
                            ? "You have already reported this issue"
                            : "Report Issue"}
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
