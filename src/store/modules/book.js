import ApiService from '@/services/ApiService.js'
export const namespaced = true

export const state = {
  books: [],
  booksCount: null,
  booksInUse: [],
  book: {}
}

export const mutations = {
  SET_BOOKS(state, books) {
    state.books = books
  },

  SET_BOOKS_COUNT(state, count) {
    state.booksCount = count
  },

  SET_BOOK(state, book) {
    state.book = book
  },

  CLEAR_BOOK(state) {
    state.book = {}
  },

  CLEARS_BOOK(state) {
    state.books = []
  },

  SET_BOOKS_IN_USE(state, booksInUse) {
    state.booksInUse = booksInUse
  }
}

export const actions = {
  async fetchBooksInUse({ commit, dispatch }) {
    try {
      const response = await ApiService.fetchBooksInUse()
      commit('SET_BOOKS_IN_USE', response.data.results)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('book/fetchBooksInUse', null, { root: true })
      }
    }
  },

  async fetchBooks({ commit, dispatch }, id) {
    try {
      const response = await ApiService.fetchBooks(id)
      commit('SET_BOOKS', response.data.results)
      commit('SET_BOOKS_COUNT', response.data.count)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('book/fetchBooks', id, { root: true })
      }
    }
  },

  async fetchBooksPagination({ commit, dispatch }, { id, page }) {
    try {
      const response = await ApiService.fetchBooksPagination(id, page)
      commit('SET_BOOKS', response.data.results)
      commit('SET_BOOKS_COUNT', response.data.count)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('book/fetchBooksPagination', { id, page }, { root: true })
      }
    }
  },

  async fetchBook({ commit, dispatch }, id) {
    try {
      const response = await ApiService.fetchBook(id)
      commit('SET_BOOK', response.data)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('book/fetchBook', id, { root: true })
      }
    }
  },

  async searchBooks({ commit, dispatch }, search) {
    try {
      const response = await ApiService.searchBooks(search)
      commit('SET_BOOKS', response.data.results)
      commit('SET_BOOKS_COUNT', response.data.count)
    } catch (error) {
      if (error.response.status === 401) {
        dispatch('book/searchBooks', search, { root: true })
      }
    }
  }
}
export const getters = {
  books(state) {
    return state.books
  },

  booksCount(state) {
    return state.booksCount
  },

  book(state) {
    return state.book
  }
}
