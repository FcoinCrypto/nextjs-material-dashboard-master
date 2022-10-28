import api from './API'


export const envoyer = async (destinataire, etiquette, montant, destinataire_id,user_id) =>{
    const response = await api.post('/envoyers', {
        data:{
          destinataire: destinataire,
          users_destinataire:destinataire_id,
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
          ftc : fcoin
      },
    })
    .then(response => {
    });
}
export const updateStatus = async (id, montant) =>{
    api
    .put(`/envoyers/${id}`,
    {
      data: {
          status : "Validé",
          montantArrive:montant
      },
    })
    .then(response => {window.location.reload();return response;
    });
}
export const updateWallet = (fcoin, walletId) =>
api
  .put(`/wallets/${walletId}`,
  {
    data: {
        ftc : fcoin
    },
  })
  .then(response => {
  });