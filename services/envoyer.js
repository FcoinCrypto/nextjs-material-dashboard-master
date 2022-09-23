import api from './API'


export const envoyer = async (destinataire, etiquette, montant) =>{
    const response = await api.post('/envoyers', {
        data:{
          destinataire: destinataire,
          etiquette: etiquette,
          montant: montant,
        }
      })
    // console.log(response.data)
    return response.data;
}