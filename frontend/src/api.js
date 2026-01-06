import axios from 'axios'

const base = axios.create({ baseURL: 'http://localhost:8080/api', timeout: 5000 })

// 공통 모듈: 주소(path)랑 params만 넘기면 됨
export default {
  get: (path, params) => base.get(path, { params }),
  post: (path, data) => base.post(path, data),
  put: (path, data) => base.put(path, data),
  delete: (path, params) => base.delete(path, { params }),
}
