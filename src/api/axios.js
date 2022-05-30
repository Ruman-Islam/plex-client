import axios from 'axios';

const fetcher = axios.create({
    baseURL: 'https://mysterious-harbor-14588.herokuapp.com',
    headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});

export default fetcher;