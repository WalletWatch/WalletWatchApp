import axios from "axios";

let host = '3f9215732d0c.vps.myjino.ru'
// let host = '127.0.0.1:8000';

export const fetchWallet = async () => {
    const {data} = await axios.get(`http://${host}/api/wallet/`);

    return data.data;
}

export const createWallet = async (wallet) => {
    const config = {
        headers: {
         'Content-Type': 'multipart/form-data'        
        }
    }
    const {data} = await axios.post(`http://${host}/api/wallet/`, wallet, config);
    return data;
}

export const fetchOneWallet = async (id:number) => {
    const {data} = await axios.get(`http://${host}/api/wallet/` + id + `/`);
    return data;
}

export const deleteWallet = async (id:number) => {
    const {data} = await axios.delete(`http://${host}/api/wallet/` + id + `/`);
    return data;
}

