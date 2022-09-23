import api from './API'


export const wallet = async (etiquette, message, montant) =>{
    const response = await api.get('/users?populate=*')
    // console.log(response.data)
    return response.data;
}