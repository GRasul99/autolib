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
  async fetchFaculties({ commit, dispatch }) {
    try {
      const response = await ApiService.fetchFaculties()
      commit('SET_FACULTIES', response.data)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('faculty/fetchFaculties', null, { root: true })
      }
    }
  }
}
export const getters = {}
