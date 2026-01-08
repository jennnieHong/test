import axios from 'axios'

const base = axios.create({ baseURL: 'http://localhost:8080/api', timeout: 5000 })

// Request interceptor for API calls
base.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for API calls
base.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
    return Promise.reject(error)
  }
)

export default {
  get: (path, params) => base.get(path, { params }),
  post: (path, data) => base.post(path, data),
  put: (path, data) => base.put(path, data),
  delete: (path, params) => base.delete(path, { params }),
}
