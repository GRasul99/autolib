import ApiService from '@/services/ApiService.js'

export const namespaced = true

export const state = {
  user: {}
}
export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}
export const actions = {
  async fetchUser({ commit }, id) {
    try {
      const response = await ApiService.fetchUser(id)
      commit('SET_USER', response.data)
    } catch (error) {
      console.log(error.message)
    }
  },

  async updateUser(context, { id, newUserData }) {
    try {
      await ApiService.updateUser(id, newUserData)
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const getters = {}
