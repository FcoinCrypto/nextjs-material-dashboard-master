import api from './API'


export const recevoirs = async (etiquette, message, montant) =>{
    const response = await api.post('/recevoirs', {
        data:{
            message: message,
            etiquette: etiquette,
            montant: montant,
          }
      })
    // console.log(response.data)
    return response.data;
}