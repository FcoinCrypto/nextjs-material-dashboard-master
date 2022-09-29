import axios from 'axios';
import api from './API'

export const confirmeUser = async (email, password) => {
    try {
        const res = await  api.post('/auth/local', {
            identifier: email,
            password: password,
        })
            return res;
        
      } catch (e) {
        return e;
    }
};
export const confirmeUserFacebook = (email, password) => {
    const response = api.post('/auth/local', {
        identifier: email,
        password: password
    })
    return response;
};

export const registration = async (username, email, password) =>{
    try {
        const response = await api.post('/auth/local/register', {
            username: username,
            email: email,
            password: password,
          })
        // console.log(response.data)
        return response.data;
        
      } catch (e) {
        return e;
    }
}