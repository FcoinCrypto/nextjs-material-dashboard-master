import api from './API'

export const transactions = async () => {
    const response = await api.get('/transactions')
    return response;
};
export const achats = async () => {
    const response = await api.get('/achats')
    return response;
};
export const receptions = async () => {
    const response = await api.get('/recevoirs')
    return response;
};
export const envoyers = async () => {
    const response = await api.get('/envoyers')
    return response;
};