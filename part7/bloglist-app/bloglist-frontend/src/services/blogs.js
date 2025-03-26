import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token }  // Make sure the token is attached
  }

  // Make sure you're passing the correct `id` in the URL for the PUT request
  const response = await axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config)
  return response.data
}

const remove = async (deleteObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${deleteObject}`, config)
  return response
}


export default { getAll, create, setToken, update, remove }