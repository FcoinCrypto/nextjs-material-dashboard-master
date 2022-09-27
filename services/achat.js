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
    

  export const achat = async (fcoin, usdt, user_id) =>{
    const response = await api.post('/achats', {
        data:{
          fcoin: fcoin,
          usdt: usdt,
          user: user_id
        }
      })
    // console.log(response.data)
    return response.data;
}