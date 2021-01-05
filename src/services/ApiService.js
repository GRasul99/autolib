import axios from 'axios'
import TokenService from '@/services/TokenService'
import store from '@/store'

const ApiService = axios.create({
  baseURL: 'https://autolib.tdtu.uz/api/v1/client',
  withCredentials: false,
  headers: {
    'Content-Type': `application/json`,
    Accept: `application/json`
  },
  timeout: 20000
})

export default {
  ApiService,

  login(credentials) {
    return ApiService.post('/token/', credentials)
  },

  register(credentials) {
    return ApiService.post('https://autolib.tdtu.uz/auth/users/', credentials)
  },

  refreshToken(refresh) {
    return ApiService.post('/token/refresh/', refresh)
  },

  emailConfirm(credentials) {
    return ApiService.post(
      'https://autolib.tdtu.uz/auth/users/activation/',
      credentials
    )
  },

  resetPasswordConfirm(credentials) {
    return ApiService.post(
      'https://autolib.tdtu.uz/auth/users/reset_password_confirm/',
      credentials
    )
  },

  resetPassword(email) {
    return ApiService.post(
      'https://autolib.tdtu.uz/auth/users/reset_password/',
      email
    )
  },

  fetchUser(id) {
    return ApiService.get('/user/' + id)
  },

  updateUser(id, newUserData) {
    console.log(id)
    return ApiService.put('/user/' + id, newUserData)
  },

  fetchUniversities() {
    return ApiService.get('/university/')
  },

  fetchUserUniversity(id) {
    return ApiService.get('/university/' + id)
  },

  fetchBooksInUse() {
    return ApiService.get('/book_in_use/')
  },

  fetchBooks(id) {
    return ApiService.get('/udc/' + id + '/books/')
  },

  fetchBooksPagination(id, page) {
    return ApiService.get('/udc/' + id + '/books/?limit=30&offset=' + page)
  },

  fetchBook(id) {
    return ApiService.get('/books/' + id + '/')
  },

  searchBooks(search) {
    return ApiService.get('/books/?search=' + search)
  },

  fetchFaculties() {
    return ApiService.get('/faculty/')
  },

  fetchOrders() {
    return ApiService.get('/orders/')
  },

  fetchActiveOrders() {
    return ApiService.get('/active_orders/')
  },

  fetchOrder(id) {
    return ApiService.get('/orders/' + id)
  },

  orderBook(order) {
    return ApiService.post('/orders/create/', order)
  },

  updateOrder(id, order) {
    return ApiService.patch('/orders/' + id, order)
  },

  fetchRootUdc() {
    return ApiService.get('/udc/list/')
  },

  fetchSubUdc(id) {
    return ApiService.get('/udc/' + id)
  },

  mountInterceptor() {
    ApiService.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          if (TokenService.getToken('refresh')) {
            store
              .dispatch('auth/refreshToken', {
                refresh: TokenService.getToken('refresh')
              })
              .then(() => {
                error.config.headers.Authorization = `Bearer ${TokenService.getToken(
                  'access'
                )}`
                return ApiService(error.config)
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
