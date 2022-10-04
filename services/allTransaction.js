import api from './API'

export const allTransaction = async () =>{
    const response = await api.get('/transactions?populate=*')
    return response;
    
}
export const test = async () =>{
    const response = await api.get('/transactions')
    return response;
    
}