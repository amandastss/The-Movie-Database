import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmFhOTQ5NjZiYzk5N2FiNTJhYTQ3MWVkM2U3YjNkNiIsIm5iZiI6MTc2MDM2MzgzMS40NDgsInN1YiI6IjY4ZWQwNTM3NDU4MzU1MzUyYjBkN2NjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JMuHuiZIeqAzSL-28yYEKu7dUn8a8bIkAfEEkuhAukY`,
  },
});

export default api;