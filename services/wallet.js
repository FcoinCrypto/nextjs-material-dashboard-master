import api from './API'


export const wallet = async (etiquette, message, montant) =>{
    const response = await api.get('/users?populate=*')
    // console.log(response.data)
    return response.data;
}

export const createWallet = async (user_id) =>{
    const response = await api.post('/wallets', {
        data:{
          fcoin: 0,
          user: user_id
        }
      })
    // console.log(response.data)
    return response.data;
    
}