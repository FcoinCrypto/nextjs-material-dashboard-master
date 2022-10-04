import api from './API'

export const allAchats = async () =>{
    const response = await api.get('/achats?populate=*')
    return response;
    
}
