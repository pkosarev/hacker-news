import React from 'react';
import { useParams } from 'react-router-dom';
import NewsDetail from '../components/NewsDetail';

const NewsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <NewsDetail newsId={Number(id)} />
        </div>
    );
};

export default NewsPage;