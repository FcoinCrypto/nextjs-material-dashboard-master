import api from './API'


export const addTransaction = async (type, etiquette, montant,user_id) =>{
    const response = await api.post('/transactions', {
        data:{
          type: type,
          etiquette: etiquette,
          montant: montant,
          user: user_id
        }
      })
    
    return response.data;
    
}

