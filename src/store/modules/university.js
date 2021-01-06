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
  async fetchUniversities({ commit, dispatch }) {
    try {
      const response = await ApiService.fetchUniversities()
      commit('SET_UNIVERSITIES', response.data.results)
    } catch (error) {
      if (error.response.status) {
        dispatch('university/fetchUniversities', null, { root: true })
      }
      console.log(error.message)
    }
  },

  async fetchUserUniversity({ commit, dispatch }, id) {
    try {
      const response = await ApiService.fetchUserUniversity(id)
      commit('SET_USER_UNIVERSITY', response.data)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('university/fetchUserUniversity', id, { root: true })
      }
    }
  }
}
export const getters = {
  universities(state) {
    return state.universities
  }
}
