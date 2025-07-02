import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { commentSchema, useAddComment } from "@/hooks/use-add-comments";

const CommentAdd = ({ reportId }: { reportId: number }) => {
    const authStore = useAuthStore();
    const { addComment, addCommentPending, form } = useAddComment({ reportId });
    const onSubmit = (value: z.infer<typeof commentSchema>) => {
        addComment(value);
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={!authStore.isAuthenticated}
                                        placeholder="Your content..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="default"
                        disabled={
                            !authStore.isAuthenticated || addCommentPending
                        }
                    >
                        <div className="flex items-center gap-2">
                            <Plus />{" "}
                            {!authStore.isAuthenticated
                                ? "Login to post a comment"
                                : "Post comment"}
                        </div>
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CommentAdd;
