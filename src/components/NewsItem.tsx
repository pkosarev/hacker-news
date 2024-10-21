import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

interface NewsItemProps {
    id: number;
    title: string;
    score: number;
    author: string;
    time: number;
    commentsCount: number;
}

const NewsItem: React.FC<NewsItemProps> = ({ id, title, score, author, time, commentsCount }) => (
    <div>
        <h3><Link to={`/news/${id}`}>{title}</Link></h3>
        <p>Score: {score} | By {author} | {formatDate(time)} | {commentsCount} comments</p>
    </div>
);

export default NewsItem;