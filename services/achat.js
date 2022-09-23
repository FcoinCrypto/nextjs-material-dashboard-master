import api from './API'

export const updateWallet = (fcoin) =>
api
  .put('/wallets/1', 
  {
    data: {
        fcoin : fcoin
    },
  })
  .then(response => {
    console.log("respopnse",response);
  });