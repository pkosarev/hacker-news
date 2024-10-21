import NewsList from '../components/NewsList';
import { Container, Typography } from '@mui/material';

const HomePage: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
                Hacker News
            </Typography>
            <NewsList />
        </Container>
    );
};

export default HomePage;
