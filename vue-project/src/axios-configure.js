import axios from 'axios';

// TODO: The CORS Header 'Access-Control-Allow-Origin' is missing.
const app = axios.create({
    baseURL: 'https://getdaytrends.com/indonesia/bekasi/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true
})

export default app;
