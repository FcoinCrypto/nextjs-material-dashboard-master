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
    console.log("response",response);
  });
    

  export const achat = async (fcoin, usdt) =>{
    const response = await api.post('/achats', {
        data:{
          fcoin: fcoin,
          usdt: usdt
        }
      })
    // console.log(response.data)
    return response.data;
}