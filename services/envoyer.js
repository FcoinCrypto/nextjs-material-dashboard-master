import api from './API'


export const envoyer = async (destinataire, etiquette, montant, user_id) =>{
    const response = await api.post('/envoyers', {
        data:{
          destinataire: destinataire,
          users_destinataire:destinataire,
          etiquette: etiquette,
          montant: montant,
          user: user_id,
          devise:"Ftc",
          status:"En attente",
          montantDepart:montant,
          montantArrive:0
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