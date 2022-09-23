import axios from 'axios';
import api from './API'

export const confirmeUser = (email, password) =>
    api.post('/auth/local', {
        identifier: email,
        password: password,
    })
    .then(response => {
        return response;
    })
;