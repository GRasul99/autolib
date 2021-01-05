const TokenService = {
  getToken(key) {
    return localStorage.getItem(key)
  },

  saveToken(key, value) {
    localStorage.setItem(key, value)
  },

  removeToken(key) {
    localStorage.removeItem(key)
  }
}

export default TokenService
export { TokenService }
