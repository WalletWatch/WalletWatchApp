import axios from "axios"

let host = 'c0d2aa9fd631.vps.myjino.ru'
// let host = '127.0.0.1:8000'
// let host = process.env.REACT_APP_API_URL;

export const fetchBalance = async () => {
    const {data} = await axios.get(`https://${host}/api/balance/`)

    return data.data;
}

export const createBalance = async (wallet) => {
    const config = {
        headers: {
         'Content-Type': 'multipart/form-data'        
        }
    }
    const {data} = await axios.post(`https://${host}/api/balance/`, wallet, config);
    return data
}

export const fetchOneBalance = async (id) => {
    const {data} = await axios.get(`https://${host}/api/balance/` + id + "/");
    return data;
}

export const deleteBalance = async (id) => {
    const {data} = await axios.delete(`https://${host}/api/balance/` + id + `/`);
    return data;
}

