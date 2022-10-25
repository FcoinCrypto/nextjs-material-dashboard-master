import api from './API'


export const addTransaction = async (montant,type,numero, achat_id,user_id) =>{
    const response = await api.post('/transactions', {
        data:{
          montant:montant,
          type: type,
          numeroTransaction: numero,
          achat: achat_id,
          user: user_id
        }
      })
    
    return response.data;
    
}

