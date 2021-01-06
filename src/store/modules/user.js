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
  async fetchUser({ commit, dispatch }, id) {
    try {
      const response = await ApiService.fetchUser(id)
      commit('SET_USER', response.data)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('user/fetchUser', id, { root: true })
      }
    }
  },

  async updateUser({ dispatch }, { id, newUserData }) {
    try {
      await ApiService.updateUser(id, newUserData)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('user/updateUser', { id, newUserData }, { root: true })
      }
    }
  }
}
export const getters = {}
