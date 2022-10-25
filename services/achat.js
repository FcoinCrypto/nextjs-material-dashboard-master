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
  
export const updateStatus = (achat_id) =>
api
  .post(`/achats/confirm/${achat_id}`,
  {
    data: {
        status : 'Validé'
    },
  })
  .then(response => {window.location.reload();return response;
  });
    

  export const achat = async (fcoin, usdt,montant, type, user_id) =>{
    const response = await api.post('/achats', {
        data:{
          fcoin: fcoin,
          usdt: usdt,
          montant: montant,
          type: type,
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
  export const achatMobile = async (achat_id, clientNumber,type,merchantNumber,description,transaction) =>{
    const response = await api.post('/achat-mobiles', {
        data:{
          achat: achat_id,
          merchantNumber: merchantNumber,
          clientNumber: clientNumber,
          type: type,
          description: description,
          numeroTransaction: transaction
        }
      })
    // console.log(response.data)
    return response.data;
}
  export const getNumero = async () =>{
    const res = await api.get('/numero-recharges').then(response => {return response})
    return res.data;
}