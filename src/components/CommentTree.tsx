import { useEffect, useState, useCallback } from 'react';
import { fetchItem } from '../services/hackerNewsApi';
import { formatDate } from '../utils/dateUtils';

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

    const loadComments = useCallback(async () => {
        const loadedComments = await Promise.all(commentIds.map(fetchItem));
        setComments(loadedComments);
    }, [commentIds]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const toggleExpand = (commentId: number) => {
        setExpandedComments(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };

    const renderComment = (comment: Comment) => (
        <div key={comment.id} className="comment">
            <p><strong>{comment.by}</strong> | {formatDate(comment.time)}</p>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} className="comment-text" />
            {comment.kids && comment.kids.length > 0 && (
                <div>
                    <button onClick={() => toggleExpand(comment.id)}>
                        {expandedComments[comment.id] ? 'Hide Replies' : 'Show Replies'}
                    </button>
                    {expandedComments[comment.id] && (
                        <CommentTree commentIds={comment.kids} />
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="comments-list">
            {comments.map(comment => renderComment(comment))}
        </div>
    );
};

export default CommentTree;
