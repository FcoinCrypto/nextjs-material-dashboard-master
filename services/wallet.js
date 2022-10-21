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