import api from './API'

export const allTransaction = async () =>{
    const response = await api.get('/transactions?populate=*')
    return response;
    
}
