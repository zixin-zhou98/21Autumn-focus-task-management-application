import axios from 'axios'
const baseUrl = '/api/tasks'
//'http://localhost:3001/api/tasks'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createNew = async (taskid, reason,successful) => {
  const config = {
    headers: { Authorization: token }
  }
  const object = {
    reason: reason,
    successful: successful,
  }

  const response = await axios.post(`${baseUrl}/${taskid}/distractions`, object, config)

  return response.data
}

const getDistractionById = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`/api/distractions/${id}`, config)

  return response.data
}

const remove = async (taskid,id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${taskid}/distractions/${id}`, config)
  return response.data
}

export default { setToken, createNew, getDistractionById, remove }