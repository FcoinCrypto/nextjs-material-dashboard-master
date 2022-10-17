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
    

  export const achat = async (fcoin, usdt,montant, type,etiquette, user_id) =>{
    const response = await api.post('/achats', {
        data:{
          fcoin: fcoin,
          usdt: usdt,
          montant: montant,
          type: type,
          etiquette: etiquette,
          user: user_id,
          status:'En attente'
        }
      })
    // console.log(response.data)
    return response.data;
}
  export const achatCash = async (achat_id) =>{
    const response = await api.post('/achat-cashes', {
        data:{
          achat: achat_id,
          qr:"En attente"
        }
      })
    // console.log(response.data)
    return response.data;
}
  export const achatBank = async (achat_id, NumeroBank) =>{
    const response = await api.post('/achat-banques', {
        data:{
          achat: achat_id,
          NumeroCarte: NumeroBank
        }
      })
    // console.log(response.data)
    return response.data;
}
  export const achatMobile = async (achat_id, phoneNumber,secret,type) =>{
    const response = await api.post('/achat-mobiles', {
        data:{
          achat: achat_id,
          merchantNumber: phoneNumber,
          secret:secret,
          type:type
        }
      })
    // console.log(response.data)
    return response.data;
}