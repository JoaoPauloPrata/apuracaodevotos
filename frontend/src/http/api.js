import axios from 'axios';

const api = axios.create({
    baseURL: "http://3.84.116.26:5000/",
});

export default api