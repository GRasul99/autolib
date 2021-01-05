import ApiService from '@/services/ApiService'

export const namespaced = true

export const state = {
  universities: [],
  userUniversity: {}
}
export const mutations = {
  SET_UNIVERSITIES(state, universities) {
    state.universities = universities
  },

  SET_USER_UNIVERSITY(state, userUniversity) {
    state.userUniversity = userUniversity
  }
}
export const actions = {
  async fetchUniversities({ commit }) {
    try {
      const response = await ApiService.fetchUniversities()
      commit('SET_UNIVERSITIES', response.data.results)
    } catch (error) {
      console.log(error.message)
    }
  },

  async fetchUserUniversity({ commit }, id) {
    try {
      const response = await ApiService.fetchUserUniversity(id)
      commit('SET_USER_UNIVERSITY', response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
}
export const getters = {
  universities(state) {
    return state.universities
  }
}
