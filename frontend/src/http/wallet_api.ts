import axios from 'axios';

// let host = '3f9215732d0c.vps.myjino.ru'
// let host = '127.0.0.1:8000';
let host = process.env.REACT_APP_API_URL;
let path = process.env.DJANGO_PATH

export const fetchWallet = async () => {
    const {data} = await axios.get(`http://${host}/${path}wallet/`);

    return data.data;
}

export const createWallet = async (wallet) => {
    const config = {
        headers: {
         'Content-Type': 'multipart/form-data'        
        }
    }
    
    const {data} = await axios.post(`http://${host}/${path}wallet/`, wallet, config);
    return data;
}

export const fetchOneWallet = async (id:number) => {
    const {data} = await axios.get(`http://${host}/${path}wallet/` + id + `/`);
    return data;
}

export const deleteWallet = async (id:number) => {
    const {data} = await axios.delete(`http://${host}/${path}wallet/` + id + `/`);
    return data;
}

