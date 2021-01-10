import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: false,
  user: [],
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async login({ dispatch, commit }, data) {
    try {
      const { token } = await this.$axios.$post('/api/auth/login', data)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async create({ dispatch, commit }, data) {
    try {
      await this.$axios.$post('/api/auth/create', data)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateUser({ dispatch, commit, getters }, data) {
    const id = jwtDecode(getters.token).userId
    try {
      return await this.$axios.$put('/api/auth/update', { data, id })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async FeatchInfo({ commit, getters }) {
    const id = jwtDecode(getters.token).userId
    try {
      const user = await this.$axios.$get('/api/auth/FeathUser/' + id)
      commit('setUser', user)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  setToken({ commit }, token) {
    commit('setToken', token)
    Cookies.set('jwt-token', token)
    this.$axios.setToken(token, 'Bearer')
  },
  logout({ commit }) {
    this.$axios.setToken(false)
    Cookies.remove('jwt-token')
    commit('clearToken')
  },
  autoAuth({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isTokenValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  },
}

export const getters = {
  isAuthenticated: (state) => !!state.token,
  token: (state) => state.token,
  user: (state) => state.user,
}

function isTokenValid(token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return new Date().getTime() / 1000 < expires
}
