import { useEffect, useState, useCallback } from 'react';
import { fetchItem } from '../services/hackerNewsApi';
import { formatDate } from '../utils/dateUtils';
import { Box, Typography, Paper } from '@mui/material';

interface Comment {
    id: number;
    by: string;
    text: string;
    time: number;
    kids?: number[];
}

interface CommentTreeProps {
    commentIds: number[];
}

const CommentTree: React.FC<CommentTreeProps> = ({ commentIds }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});
    const [nestedComments, setNestedComments] = useState<{ [key: number]: Comment[] }>({});

    const loadComments = useCallback(async () => {
        const loadedComments = await Promise.all(commentIds.map(fetchItem));
        setComments(loadedComments);
    }, [commentIds]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const toggleExpand = async (commentId: number) => {
        const isExpanded = expandedComments[commentId];


        if (!isExpanded) {
            const comment = await fetchItem(commentId);
            if (comment.kids && !nestedComments[commentId]) {
                const loadedNestedComments = await Promise.all(comment.kids.map(fetchItem));
                setNestedComments(prevState => ({
                    ...prevState,
                    [commentId]: loadedNestedComments
                }));
            }
        }

        setExpandedComments(prevState => ({
            ...prevState,
            [commentId]: true
        }));
    };

    const renderComment = (comment: Comment) => {
        const hasKids = Array.isArray(comment.kids) && comment.kids.length > 0;
        return (
            <Paper
                key={comment.id}
                style={{
                    marginBottom: 15,
                    padding: 15,
                    marginLeft: 20,
                    cursor: hasKids ? 'pointer' : 'default',
                    opacity: hasKids ? 1 : 0.5
                }}
                onClick={hasKids ? () => toggleExpand(comment.id) : undefined}
            >
                <Typography variant="body2" color="textSecondary">
                    {comment.by} | {formatDate(comment.time)} | {hasKids ? `${comment.kids?.length} replies` : 'No replies'}
                </Typography>
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: comment.text }} />
                {hasKids && expandedComments[comment.id] && (
                    <CommentTree commentIds={nestedComments[comment.id]?.map(c => c.id) || []} />
                )}
            </Paper>
        );
    };

    return (
        <Box>
            {comments.map(comment => renderComment(comment))}
        </Box>
    );
};

export default CommentTree;
