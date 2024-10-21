import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import { fetchTopStories, fetchItem } from '../services/hackerNewsApi';
import { Button } from '@mui/material';

const NewsList: React.FC = () => {
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadNews = async () => {
        setIsLoading(true);
        const storyIds = await fetchTopStories();
        const stories = await Promise.all(storyIds.slice(0, 100).map(fetchItem));
        setNews(stories);
        setIsLoading(false);
    };

    useEffect(() => {
        loadNews();
        const interval = setInterval(loadNews, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Button variant="contained" onClick={loadNews}>Refresh news</Button>
            {isLoading ? <p>Loading...</p> : news.map((item) => (
                <NewsItem key={item.id} id={item.id} title={item.title} score={item.score} author={item.by} time={item.time} commentsCount={item.descendants || 0} />
            ))}
        </div>
    );
};

export default NewsList;