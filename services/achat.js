import api from './API'

export const updateWallet = (fcoin, walletId) =>
api
  .put(`/wallets/${walletId}`,
  {
    data: {
        fcoin : fcoin
    },
  })
  .then(response => {
  });
    

  export const achat = async (fcoin, usdt, type, user_id) =>{
    const response = await api.post('/achats', {
        data:{
          fcoin: fcoin,
          usdt: usdt,
          type: type,
          user: user_id
        }
      })
    // console.log(response.data)
    return response.data;
}
  export const achatCash = async (fcoin, montant, etiquette, achat_id) =>{
    const response = await api.post('/achat-cashes', {
        data:{
          fcoin: fcoin,
          montant: montant,
          etiquette: etiquette,
          achat: achat_id
        }
      })
    // console.log(response.data)
    return response.data;
}