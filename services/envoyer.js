import api from './API'


export const envoyer = async (destinataire, etiquette, montant, user_id) =>{
    const response = await api.post('/envoyers', {
        data:{
          destinataire: destinataire,
          etiquette: etiquette,
          montant: montant,
          user: user_id
        }
      })
    // console.log(response.data)
    return response.data;
    
}

export const updateWalletOnSend = async (fcoin, walletId) =>{
    api
    .put(`/wallets/${walletId}`,
    {
      data: {
          fcoin : fcoin
      },
    })
    .then(response => {
    });
}