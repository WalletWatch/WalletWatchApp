import axios from 'axios';

let host = 'https://gryumova.ru'
// let host = '127.0.0.1:8000';
// let host = process.env.REACT_APP_API_URL;

export const fetchWallet = async () => {
    const {data} = await axios.get(`${host}/api/wallet/`);

    return data.data;
}

export const createWallet = async (wallet) => {
    const config = {
        headers: {
         'Content-Type': 'multipart/form-data'        
        }
    }
    
    const {data} = await axios.post(`${host}/api/wallet/`, wallet, config);
    return data;
}

export const fetchOneWallet = async (id:number) => {
    const {data} = await axios.get(`${host}/api/wallet/` + id + `/`);
    return data;
}

export const deleteWallet = async (id:number) => {
    const {data} = await axios.delete(`${host}/api/wallet/` + id + `/`);
    return data;
}

