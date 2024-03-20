import axios from "axios";

// let host = 'dev.api.c0d2aa9fd631.vps.myjino.ru'
// let host = '127.0.0.1:8000'
let host = process.env.REACT_APP_API_URL;

export const fetchNetwork = async () => {
    const {data} = await axios.get(`http://${host}/api/network/`)

    return data.data;
}

export const fetchOneNetwork = async (id:number) => {
    const {data} = await axios.get(`http://${host}/api/network/` + id + "/");
    return data;
}

export const deleteNetwork = async (id:number) => {
    const {data} = await axios.delete(`http://${host}/api/network/` + id + "/");
    return data;
}
