import axios from "axios";

// let host = 'https://gryumova.ru'
// let host = 'http://localhost:8000'
let host = process.env.REACT_APP_API_URL;

export const fetchNetwork = async () => {
    const {data} = await axios.get(`${host}/api/network/`)

    return data.data;
}

export const fetchOneNetwork = async (id:number) => {
    const {data} = await axios.get(`${host}/api/network/` + id + "/");
    return data;
}

export const deleteNetwork = async (id:number) => {
    const {data} = await axios.delete(`${host}/api/network/` + id + "/");
    return data;
}
