import api from './API'

export const transactions = async (user_id) => {
    const response = await api.get(`/transactions?filters[user][id][$eq]=${user_id}`)
    return response;
};
export const achats = async (user_id) => {
    const response = await api.get(`/achats?filters[user][id][$eq]=${user_id}`)
    return response;
};
export const recevoirs = async (user_id) => {
    const response = await api.get(`/recevoirs?filters[user][id][$eq]=${user_id}`)
    return response;
};
export const envoyers = async (user_id) => {
    const response = await api.get(`/envoyers?filters[user][id][$eq]=${user_id}`)
    
    return response;
};