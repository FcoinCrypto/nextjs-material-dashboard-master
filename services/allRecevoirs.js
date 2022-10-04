import api from './API'

export const allRecevoirs = async () =>{
    const response = await api.get('/recevoirs?populate=*')
    return response;
    
}
