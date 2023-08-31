import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.noroff.dev/api/v1/holidaze/',
})

export default api
