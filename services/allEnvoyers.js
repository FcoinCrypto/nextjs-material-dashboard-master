import api from './API'

export const allEnvoyers = async () =>{
    const response = await api.get('/envoyers?populate=*')
    return response;
    
}
