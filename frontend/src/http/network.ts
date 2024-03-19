import axios from "axios";

// let host = '3f9215732d0c.vps.myjino.ru'
// let host = '127.0.0.1:8000'
let host = process.env.REACT_APP_API_URL;
let path = process.env.DJANGO_PATH

export const fetchNetwork = async () => {
    const {data} = await axios.get(`http://${host}/${path}network/`)

    return data.data;
}

export const fetchOneNetwork = async (id:number) => {
    const {data} = await axios.get(`http://${host}/${path}network/` + id + "/");
    return data;
}

export const deleteNetwork = async (id:number) => {
    const {data} = await axios.delete(`http://${host}/${path}network/` + id + "/");
    return data;
}
