import CommentCard, { Comment } from "./CommentCard";
import { useAuthStore } from "@/store/authStore";
import CommentSkeleton from "./CommentSkeleton";
import { toast } from "sonner";
import { useComments } from "@/hooks/use-comments";
import { useDeleteComment } from "@/hooks/use-delete-comment";

const CommentsList = ({ reportId }: { reportId: number }) => {
    const authStore = useAuthStore();
    const { comments, commentsLoading } = useComments({ reportId });
    const { deleteComment } = useDeleteComment({ reportId });

    const handleEditComment = (comment: Comment) => {
        console.log(comment);
        toast.info("TODO: implement comment edit");
    };

    const handleDeleteComment = (commentId: number) => {
        deleteComment(commentId);
    };
    if (commentsLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <CommentSkeleton key={index} />
                ))}
            </div>
        );
    }
    if (!comments || comments.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="text-gray-500 mb-2">No comments yet</div>
                <div className="text-sm text-gray-400">
                    Be the first to share your thoughts on this issue
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments &&
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                        isOwner={comment.user.email === authStore.user?.email}
                        onEdit={handleEditComment}
                        onDelete={handleDeleteComment}
                    />
                ))}
        </div>
    );
};

export default CommentsList;
