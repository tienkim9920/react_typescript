import axios from 'axios';
import queryString from 'query-string';

const http = axios.create({
    baseURL: 'https://tienkim-crud.herokuapp.com',
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: params => queryString.stringify(params),
});

export default http;