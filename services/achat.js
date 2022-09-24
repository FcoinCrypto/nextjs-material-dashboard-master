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