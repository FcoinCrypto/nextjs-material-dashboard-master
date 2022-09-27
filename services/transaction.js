import api from './API'


export const addTransaction = async (type, etiquette, montant) =>{
    const response = await api.post('/transactions', {
        data:{
          type: type,
          etiquette: etiquette,
          montant: montant,
        }
      })
    
    return response.data;
    
}

