import api from './API'

export const cours = async () =>{
    const response = await api.get('/cours/1')
    return response;
    
}
