import TokenService from '@/services/TokenService'
import ApiService from '@/services/ApiService'
import jwtDecode from 'jwt-decode'

export const namespaced = true

export const state = {
  user: false,
  userId: null
}
export const mutations = {
  SET_AUTH_USER(state) {
    state.user = true
  },

  SET_USER_ID(state, userId) {
    state.userId = userId
  },

  LOGOUT() {
    TokenService.removeToken('access')
    TokenService.removeToken('refresh')
    location.reload()
  }
}
export const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await ApiService.login(credentials)
      const userId = jwtDecode(response.data.access).user_id
      ApiService.ApiService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.access}`
      TokenService.saveToken('access', response.data.access)
      TokenService.saveToken('refresh', response.data.refresh)
      commit('SET_AUTH_USER')
      commit('SET_USER_ID', userId)
    } catch (error) {
      console.log(error.message)
    }
  },

  async register(context, credentials) {
    try {
      await ApiService.register(credentials)
    } catch (error) {
      console.log(error.message)
    }
  },

  async refreshToken({ commit, dispatch }, refresh) {
    try {
      const response = await ApiService.refreshToken(refresh)
      const userId = jwtDecode(response.data.access).user_id
      ApiService.ApiService.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.access}`
      TokenService.saveToken('access', response.data.access)
      commit('SET_USER_ID', userId)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('auth/logout')
      }
    }
  },

  logout({ commit }) {
    commit('LOGOUT')
  },

  async emailConfirm(context, credentials) {
    try {
      await ApiService.emailConfirm(credentials)
    } catch (error) {
      console.log(error.message)
    }
  },

  async resetPassword(context, email) {
    try {
      await ApiService.resetPassword(email)
    } catch (error) {
      console.log(error.message)
    }
  },

  async resetPasswordConfirm(context, credentials) {
    try {
      await ApiService.resetPasswordConfirm(credentials)
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const getters = {}
