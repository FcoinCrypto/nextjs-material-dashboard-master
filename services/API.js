import axios from 'axios';
import ENV from '../utils/env';

const Api = axios.create({
    baseURL: `${ENV.api_url}/api`,
    headers: {},
});

export default Api;