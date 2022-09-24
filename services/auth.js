import axios from 'axios';
import api from './API'

export const confirmeUser = (email, password) => {
    const response = api.post('/auth/local', {
        identifier: email,
        password: password,
    })
    return response;
};

export const registration = async (username, email, password) =>{
    const response = await api.post('/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
    // console.log(response.data)
    return response.data;
}