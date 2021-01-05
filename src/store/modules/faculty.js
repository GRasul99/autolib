import ApiService from '@/services/ApiService.js'

export const namespaced = true

export const state = {
  faculties: []
}
export const mutations = {
  SET_FACULTIES(state, faculties) {
    state.faculties = faculties
  }
}
export const actions = {
  async fetchFaculties({ commit }) {
    try {
      const response = await ApiService.fetchFaculties()
      commit('SET_FACULTIES', response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const getters = {}
