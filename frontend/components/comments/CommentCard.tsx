"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit3, Trash2, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar?: string;
    };
}

interface CommentCardProps {
    comment: Comment;
    isOwner?: boolean;
    onEdit?: (comment: Comment) => void;
    onDelete?: (commentId: number) => void;
}

const CommentCard = ({
    comment,
    isOwner = false,
    onEdit,
    onDelete,
}: CommentCardProps) => {
    const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
        addSuffix: true,
    });

    const isEdited =
        new Date(comment.updated_at) > new Date(comment.created_at);

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage
                            src={
                                comment.user.avatar ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.first_name}`
                            }
                            alt={comment.user.first_name}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                            {comment.user.first_name || comment.user.email}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900">
                                    {`${comment.user.first_name} ${comment.user.last_name}` ||
                                        "Anonymous User"}
                                </h4>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500 flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {timeAgo}
                                </span>
                                {isEdited && (
                                    <>
                                        <span className="text-xs text-gray-500">
                                            •
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="text-xs py-0 px-1"
                                        >
                                            Edited
                                        </Badge>
                                    </>
                                )}
                            </div>

                            {/* Actions Dropdown */}
                            {isOwner && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-gray-100"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                            <span className="sr-only">
                                                Open menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-48"
                                    >
                                        <DropdownMenuItem
                                            onClick={() => onEdit?.(comment)}
                                            className="cursor-pointer"
                                        >
                                            <Edit3 className="h-4 w-4 mr-2" />
                                            Edit Comment
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() =>
                                                onDelete?.(comment.id)
                                            }
                                            className="cursor-pointer text-error focus:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete Comment
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>

                        {/* User Email */}
                        <div className="flex items-center mb-3">
                            <User className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                                {comment.user.email}
                            </span>
                        </div>

                        {/* Comment Content */}
                        <div className="prose prose-sm max-w-none">
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                {comment.content}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 mt-3 pt-2 border-t border-gray-100">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-blue-600 h-auto p-0 font-normal"
                            >
                                Reply
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-red-600 h-auto p-0 font-normal"
                            >
                                Report
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommentCard;
