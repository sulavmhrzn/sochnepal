"use client";

import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    MoreVertical,
    Edit3,
    Trash2,
    Calendar,
    User,
    Eye,
    EyeOff,
    AlertTriangle,
} from "lucide-react";
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
    is_toxic: boolean;
    confidence: number;
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
    const [showToxicContent, setShowToxicContent] = useState(false);

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ""}${
            lastName?.charAt(0) || ""
        }`.toUpperCase();
    };

    const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
        addSuffix: true,
    });

    const isEdited =
        new Date(comment.updated_at) > new Date(comment.created_at);

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return "text-red-600";
        if (confidence >= 0.6) return "text-orange-600";
        return "text-yellow-600";
    };

    const getConfidenceText = (confidence: number) => {
        if (confidence >= 0.8) return "High";
        if (confidence >= 0.6) return "Medium";
        return "Low";
    };

    return (
        <Card className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage
                            src={
                                comment.user.avatar ||
                                `https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.first_name}`
                            }
                            alt={`${comment.user.first_name} ${comment.user.last_name}`}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                            {getInitials(
                                comment.user.first_name,
                                comment.user.last_name
                            ) || comment.user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900">
                                    {comment.user.first_name &&
                                    comment.user.last_name
                                        ? `${comment.user.first_name} ${comment.user.last_name}`
                                        : "Anonymous User"}
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
                                {/* Toxicity Badge */}
                                {comment.is_toxic && (
                                    <>
                                        <span className="text-xs text-gray-500">
                                            •
                                        </span>
                                        <Badge
                                            variant="destructive"
                                            className="text-xs py-0 px-1 bg-red-100 text-red-700 border-red-200"
                                        >
                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                            Potentially Toxic
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
                                            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
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

                        {/* Toxicity Warning & Controls */}
                        {comment.is_toxic && !showToxicContent && (
                            <Alert className="mb-3 border-orange-200 bg-orange-50">
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                                <AlertDescription className="text-orange-800">
                                    <div className="flex items-center justify-between w-full">
                                        <div>
                                            <p className="font-medium">
                                                This comment may contain toxic
                                                content
                                            </p>
                                            <p className="text-sm">
                                                Confidence:{" "}
                                                <span
                                                    className={getConfidenceColor(
                                                        comment.confidence
                                                    )}
                                                >
                                                    {getConfidenceText(
                                                        comment.confidence
                                                    )}{" "}
                                                    (
                                                    {Math.round(
                                                        comment.confidence * 100
                                                    )}
                                                    %)
                                                </span>
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setShowToxicContent(true)
                                            }
                                            className="ml-3 bg-white border-orange-300 text-orange-700 hover:bg-orange-50"
                                        >
                                            <Eye className="h-3 w-3 mr-1" />
                                            Show
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Comment Content */}
                        <div className="prose prose-sm max-w-none">
                            {comment.is_toxic && !showToxicContent ? (
                                <div className="relative">
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap blur-sm select-none pointer-events-none">
                                        {comment.content}
                                    </p>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/90 px-3 py-1 rounded-md shadow-sm border">
                                            <span className="text-sm text-gray-600 font-medium">
                                                Content Hidden
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                        {comment.content}
                                    </p>
                                    {/* Hide button for toxic content */}
                                    {comment.is_toxic && showToxicContent && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                setShowToxicContent(false)
                                            }
                                            className="mt-2 text-gray-500 hover:text-gray-700 h-auto p-0 font-normal"
                                        >
                                            <EyeOff className="h-3 w-3 mr-1" />
                                            Hide content
                                        </Button>
                                    )}
                                </div>
                            )}
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
                            {/* Show toxicity details for toxic comments */}
                            {comment.is_toxic && (
                                <div className="text-xs text-gray-400">
                                    AI Confidence:{" "}
                                    {Math.round(comment.confidence * 100)}%
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommentCard;
