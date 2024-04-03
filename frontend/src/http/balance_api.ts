import axios from "axios"

// let host = 'https://gryumova.ru'
let host = 'http://localhost:8000'
// let host = process.env.REACT_APP_API_URL;

export const fetchBalance = async () => {
    const {data} = await axios.get(`${host}/api/balance/`)

    return data.data;
}

export const createBalance = async (wallet) => {
    const config = {
        headers: {
         'Content-Type': 'multipart/form-data'        
        }
    }
    const {data} = await axios.post(`${host}/api/balance/`, wallet, config);
    return data
}

export const fetchOneBalance = async (id:number) => {
    const {data} = await axios.get(`${host}/api/balance/` + id + "/");
    return data;
}

export const deleteBalance = async (id:number) => {
    const {data} = await axios.delete(`${host}/api/balance/` + id + `/`);
    return data;
}

