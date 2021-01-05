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
  fetchBooksInUse({ commit }) {
    return ApiService.fetchBooksInUse()
      .then(response => {
        commit('SET_BOOKS_IN_USE', response.data.results)
      })
      .catch(error => {
        throw error
      })
  },

  async fetchBooks({ commit }, id) {
    try {
      const response = await ApiService.fetchBooks(id)
      commit('SET_BOOKS', response.data.results)
      commit('SET_BOOKS_COUNT', response.data.count)
    } catch (error) {
      if (error.response.status === 401) {
        this.fetchBooks({ commit }, id)
      }
      console.log(error.message)
    }
  },

  fetchBooksPagination({ commit }, { id, page }) {
    return ApiService.fetchBooksPagination(id, page)
      .then(response => {
        commit('SET_BOOKS', response.data.results)
        commit('SET_BOOKS_COUNT', response.data.count)
      })
      .catch(error => {
        throw error
      })
  },

  async fetchBook({ commit }, id) {
    try {
      const response = await ApiService.fetchBook(id)
      commit('SET_BOOK', response.data)
    } catch (error) {
      console.log(error.message)
    }
  },

  searchBooks({ commit }, search) {
    return ApiService.searchBooks(search)
      .then(response => {
        commit('SET_BOOKS', response.data.results)
        commit('SET_BOOKS_COUNT', response.data.count)
      })
      .catch(error => {
        throw error
      })
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
