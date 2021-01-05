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
      text: 'ISBN',
      value: 'book.isbn',
      sortable: false
    },
    {
      text: 'Время получения книги',
      value: 'time_of_get',
      sortable: false
    },
    {
      text: 'Получил',
      value: 'time_of_take_away',
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
      text: 'ISBN',
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
      text: 'ISBN',
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
  fetchOrders({ commit }) {
    return ApiService.fetchOrders()
      .then(response => {
        commit('SET_ORDERS', response.data.results)
      })
      .catch(error => {
        throw error
      })
  },

  fetchActiveOrders({ commit }) {
    return ApiService.fetchActiveOrders()
      .then(response => {
        commit('SET_ACTIVE_ORDERS', response.data.results)
      })
      .catch(error => {
        throw error
      })
  },

  fetchOrder({ commit }, id) {
    return ApiService.fetchOrder(id)
      .then(response => {
        commit('SET_ORDER', response.data.results)
      })
      .catch(error => {
        throw error
      })
  },

  orderBook(context, order) {
    return ApiService.orderBook(order)
      .then(() => {})
      .catch(error => {
        throw error
      })
  },

  updateOrder(context, { id, order }) {
    return ApiService.updateOrder(id, order)
      .then(() => {})
      .catch(error => {
        throw error
      })
  }
}

export const getters = {}
