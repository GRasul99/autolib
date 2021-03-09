import ApiService from '@/services/ApiService.js'
export const namespaced = true

export const state = {
  orders: [],
  order: {},
  activeOrders: [],
  userOrdersHeaders: [
    {
      text: 'Название книги',
      value: 'book.title',
      sortable: false
    },
    {
      text: 'Автор книги',
      value: 'book.authors[0].initial_name',
      sortable: false
    },
    {
      text: 'Инвентаризационный номер',
      value: 'book.isbn',
      sortable: false
    },
    {
      text: 'Время получения книги',
      value: 'time_of_get',
      sortable: false
    },
    {
      text: 'Дата сдачи',
      value: 'time_of_pass',
      sortable: false
    }
  ],
  userActiveOrdersHeaders: [
    {
      text: 'Название книги',
      value: 'book.title',
      sortable: false
    },
    {
      text: 'Автор книги',
      value: 'book.authors[0].initial_name',
      sortable: false
    },
    {
      text: 'Инвентаризационный номер',
      value: 'book.isbn',
      sortable: false
    },
    {
      text: 'Время получения книги',
      value: 'time_of_get',
      sortable: false
    },
    {
      text: 'Действия',
      value: 'actions',
      sortable: false
    }
  ],
  userRetrievedOrdersHeaders: [
    {
      text: 'Название книги',
      value: 'book.title',
      sortable: false
    },
    {
      text: 'Автор книги',
      value: 'book.author',
      sortable: false
    },
    {
      text: 'Инвентаризационный номер',
      value: 'book.isbn',
      sortable: false
    },
    {
      text: 'Получил',
      value: 'time_of_take_away',
      sortable: false
    }
  ]
}

export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },

  SET_ACTIVE_ORDERS(state, activeOrders) {
    state.activeOrders = activeOrders
  },

  SET_ORDER(state, order) {
    state.order = order
  }
}

export const actions = {
  async fetchOrders({ commit, dispatch }) {
    try {
      const response = await ApiService.fetchOrders()
      commit('SET_ORDERS', response.data.results)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('order/fetchOrders', null, { root: true })
      }
      console.log(error.message)
    }
  },

  async fetchActiveOrders({ commit, dispatch }) {
    try {
      const response = await ApiService.fetchActiveOrders()
      commit('SET_ACTIVE_ORDERS', response.data.results)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('order/fetchActiveOrders', null, { root: true })
      }
    }
  },

  async fetchOrder({ commit, dispatch }, id) {
    try {
      const response = await ApiService.fetchOrder(id)
      commit('SET_ORDER', response.data.results)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('order/fetchOrder', id, { root: true })
      }
    }
  },

  async orderBook(context, order) {
    try {
      await ApiService.orderBook(order)
    } catch (error) {
      if (error.response.status === 401) {
        context.dispatch('order/orderBook', order, { root: true })
      }
    }
  },

  async updateOrder(context, { id, order }) {
    try {
      await ApiService.updateOrder(id, order)
    } catch (error) {
      if (error.response.status === 401) {
        context.dispatch('order/updateOrder', { id, order }, { root: true })
      }
    }
  }
}

export const getters = {}
