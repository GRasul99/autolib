import ApiService from '@/services/ApiService'

export const namespaced = true

export const state = {
  rootUdc: [],
  subUdc: []
}

export const mutations = {
  SET_ROOT_UDC(state, rootUdc) {
    state.rootUdc = rootUdc
  },
  SET_SUB_UDC(state, subUdc) {
    state.subUdc = subUdc
  },
  CLEAR_SUB_UDC(state) {
    state.subUdc = []
  }
}

export const actions = {
  async fetchRootUdc({ commit }) {
    try {
      const response = await ApiService.fetchRootUdc()
      commit('SET_ROOT_UDC', response.data)
    } catch (error) {
      console.log(error.message)
    }
  },

  async fetchSubUdc({ commit }, id) {
    try {
      const response = await ApiService.fetchSubUdc(id)
      commit('SET_SUB_UDC', response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const getters = {
  rootUdc(state) {
    return state.rootUdc
  },
  subUdc(state) {
    return state.subUdc
  }
}
