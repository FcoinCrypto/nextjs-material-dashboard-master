import axios from 'axios';
import api from './API'

export const getUser = async (id) => {
    const response = await api.get(`/users/${id}?populate=*`)
    return response;
};