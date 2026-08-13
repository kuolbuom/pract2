import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async noteObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, noteObject, config)
  return response.data
}

const update = (id, changedNote) => {
  const request = axios.put(`${baseUrl}/${id}`, changedNote)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, setToken }