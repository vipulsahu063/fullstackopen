import axios from "axios";
const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(Response => Response.data)
}

const create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(Response => Response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(Response => Response.data)
}

export default {getAll, create, remove, update}