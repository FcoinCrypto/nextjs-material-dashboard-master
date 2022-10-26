import api from './API'


export const wallet = async (etiquette, message, montant) =>{
    const response = await api.get('/users?populate=*')
    // console.log(response.data)
    return response.data;
}
export const getWallet = async () =>{
    const response = await api.get('/wallets?populate=*')
    // console.log(response.data)
    return response.data;
}

export const getCours = async () =>{
  const response = await api.get('/cours')
  // console.log(response.data)
  return response.data;
}

export const updateCours = async (devis, amount) =>{
  if (devis == "ftc"){
    const response = api.put(`/cours/1`,
    {
      data: {
        ftc : amount
      },
    });
    return response;
  }
  if (devis == "ar"){
    const response = api.put(`/cours/1`,
    {
      data: {
        ar : amount
      },
    });
    return response;
  }
  if (devis == "usdt"){
    const response = api.put(`/cours/1`,
    {
      data: {
        usdt : amount
      },
    });
    return response;
  }
  if (devis == "euro"){
    const response = api.put(`/cours/1`,
    {
      data: {
        euro : amount
      },
    });
    return response;
  }
  if (devis == "btc"){
    const response = api.put(`/cours/1`,
    {
      data: {
        btc : amount
      },
    });
    return response;
  }
  if (devis == "etc"){
    const response = api.put(`/cours/1`,
    {
      data: {
        etc : amount
      },
    });
    return response;
  }
  if (devis == "monero"){
    const response = api.put(`/cours/1`,
    {
      data: {
        monero : amount
      },
    });
    return response;
  }
}


export const createWallet = async (user_id,etiquette) =>{
    const response = await api.post('/wallets', {
        data:{
          fcoin: 0,
          ariary: 0,
          usdt : 0,
          euro : 0,
          etiquette:etiquette,
          user: user_id
        }
      })
    // console.log(response.data)
    return response.data;
    
}