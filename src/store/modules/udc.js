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
  async fetchRootUdc({ commit, dispatch }) {
    try {
      const response = await ApiService.fetchRootUdc()
      commit('SET_ROOT_UDC', response.data)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('udc/fetchRootUdc', null, { root: true })
      }
    }
  },

  async fetchSubUdc({ commit, dispatch }, id) {
    try {
      const response = await ApiService.fetchSubUdc(id)
      commit('SET_SUB_UDC', response.data)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('udc/fetchSubUdc', id, { root: true })
      }
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
