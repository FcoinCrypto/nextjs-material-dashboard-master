import api from './API'


export const recevoirs = async (etiquette, message, montant, user_id) =>{
    const response = await api.post('/recevoirs', {
        data:{
            message: message,
            etiquette: etiquette,
            montant: montant,
            user: user_id
          }
      })
    // console.log(response.data)
    return response.data;
}