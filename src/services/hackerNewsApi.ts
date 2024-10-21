const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const fetchTopStories = async () => {
    const response = await fetch(`${BASE_URL}/topstories.json`);
    return response.json();
};

export const fetchItem = async (id: number) => {
    const response = await fetch(`${BASE_URL}/item/${id}.json`);
    return response.json();
};