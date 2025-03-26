import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const object = { content, id: getId() }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const updateAnecdote = {
    ...anecdote.data,
    votes: anecdote.data.votes + 1
  }

  const response = await axios.put(`${baseUrl}/${id}`, updateAnecdote)
  return response.data
}

export default { getAll, createNew, addVote }