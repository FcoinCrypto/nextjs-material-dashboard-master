import axios from 'axios';
import api from './API'

export const getTicker = async (pair) => {
    try {
        const res = await  axios.get(`https://api.dex-trade.com/v1/public/ticker?pair=${pair}`)
            return res;
        
      } catch (e) {
        return e;
    }
};

export const getAllSymboles = async () =>{
    try {
        const response = await axios.get('https://api.dex-trade.com/v1/public/symbols')
        // console.log(response.data)
        return response.data;
        
      } catch (e) {
        return e;
    }
}

export const getOrderBook = async (pair) =>{
    try {
        const response = await axios.get(`https://api.dex-trade.com/v1/public/book?pair=${pair}`)
        // console.log(response.data)
        return response.data;
        
      } catch (e) {
        return e;
    }
}