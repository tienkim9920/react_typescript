import axios from 'axios';
import queryString from 'query-string';

const httpAdmin = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: params => queryString.stringify(params),
});

export default httpAdmin;