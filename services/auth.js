import axios from 'axios'

export const confirmeUser = (email, password) =>
    axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
    })
    .then(response => {
        return response;
    })
;