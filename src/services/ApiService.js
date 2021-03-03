import axios from 'axios'
import TokenService from '@/services/TokenService'
import store from '@/store'

axios.defaults.baseURL = 'https://autolib.uz/api/v1/client'
axios.defaults.withCredentials = false
axios.defaults.headers.common['Content-Type'] = `application/json`
axios.defaults.headers.common['Accept'] = `application/json`
axios.defaults.timeout = 20000

export default {
  async login(credentials) {
    return await axios.post('/token/', credentials)
  },

  async register(credentials) {
    return await axios.post('https://autolib.uz/auth/users/', credentials)
  },

  async refreshToken(refresh) {
    return await axios.post('/token/refresh/', refresh)
  },

  async emailConfirm(credentials) {
    return await axios.post(
      'https://autolib.uz/auth/users/activation/',
      credentials
    )
  },

  async resetPasswordConfirm(credentials) {
    return await axios.post(
      'https://autolib.uz/auth/users/reset_password_confirm/',
      credentials
    )
  },

  async resetPassword(email) {
    return await axios.post(
      'https://autolib.uz/auth/users/reset_password/',
      email
    )
  },

  async fetchUser(id) {
    return await axios.get('/user/' + id)
  },

  async updateUser(id, newUserData) {
    return await axios.put('/user/' + id, newUserData)
  },

  async fetchUniversities() {
    return await axios.get('/university/')
  },

  async fetchUserUniversity(id) {
    return await axios.get('/university/' + id)
  },

  async fetchBooksInUse() {
    return await axios.get('/book_in_use/')
  },

  async fetchBooks(id) {
    return await axios.get('/udc/' + id + '/books/')
  },

  async fetchBooksPagination(id, page) {
    return await axios.get('/udc/' + id + '/books/?limit=30&offset=' + page)
  },

  async fetchBook(id) {
    return await axios.get('/books/' + id + '/')
  },

  async searchBooks(search) {
    return await axios.get('/books/?search=' + search)
  },

  async fetchFaculties() {
    return await axios.get('/faculty/')
  },

  async fetchOrders() {
    return await axios.get('/orders/')
  },

  async fetchActiveOrders() {
    return await axios.get('/active_orders/')
  },

  async fetchOrder(id) {
    return await axios.get('/orders/' + id)
  },

  async orderBook(order) {
    return await axios.post('/orders/create/', order)
  },

  async updateOrder(id, order) {
    return await axios.patch('/orders/' + id, order)
  },

  async fetchRootUdc() {
    return await axios.get('/udc/list/')
  },

  async fetchSubUdc(id) {
    return await axios.get('/udc/' + id)
  },

  mountInterceptor() {
    axios.interceptors.response.use(
      response => response,
      error => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          if (TokenService.getToken('refresh')) {
            store
              .dispatch('auth/refreshToken', {
                refresh: TokenService.getToken('refresh')
              })
              .then(() => {
                axios.defaults.headers.common[
                  'Authorization'
                ] = `Bearer ${TokenService.getToken('access')}`
              })
          } else {
            store.dispatch('auth/logout').then(() => {})
          }
        }
        return Promise.reject(error)
      }
    )
  }
}
