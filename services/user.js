import axios from 'axios';
import api from './API'

export const getUser = async (id) => {
    try {
        const response = await api.get(`/users/${id}?populate=*`)
        return response;
        // console.log(response.data)
        
      } catch (e) {
        return e;
    }
};