import { useEffect, useState, useCallback} from 'react';
import { formatDate } from '../utils/dateUtils';
import { fetchItem } from '../services/hackerNewsApi';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Link, Box } from '@mui/material';
import CommentTree from './CommentTree';

interface NewsDetailProps {
    newsId: number;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ newsId }) => {
    const [news, setNews] = useState<any>(null);

    const loadNewsDetail = useCallback(async () => {
        const item = await fetchItem(newsId);
        setNews(item);
    }, [newsId]);

    useEffect(() => {
        loadNewsDetail();
    }, [loadNewsDetail]);

    if (!news) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                {news.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                By {news.by} | {formatDate(news.time)} | {news.descendants || 0} comments
            </Typography>
            <Link href={news.url} target="_blank" rel="noopener noreferrer" variant="body1">
                Read more
            </Link>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={loadNewsDetail}>
                    Refresh Comments
                </Button>
                <Button
                    component={RouterLink}
                    to="/"
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: 10 }}
                >
                    Back to News
                </Button>
            </Box>
            {news.kids && news.kids.length > 0 ? (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        Comments
                    </Typography>
                    <CommentTree commentIds={news.kids} />
                </Box>
            ) : (
                <Typography>No comments available.</Typography>
            )}
        </Container>
    );
};

export default NewsDetail;
