import api from './API'

export const allUSer = async () =>{
    const response = await api.get('/users?populate=*')
    return response;
    
}
