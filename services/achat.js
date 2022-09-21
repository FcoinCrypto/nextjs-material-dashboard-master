import axios from 'axios'

export const updateWallet = (fcoin) =>
axios
  .put('http://localhost:1337/api/wallets/1', 
  {
    data: {
        fcoin : fcoin
    },
  })
  .then(response => {
    console.log("respopnse",response);
  });