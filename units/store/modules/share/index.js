const state = {
  loading: false,
}

const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload
  },
}

const actions = {
  startLoading({ commit }) {
    commit('SET_LOADING', true)
  },
  finishLoading({ commit }) {
    commit('SET_LOADING', false)
  },
}

const getters = {
  loading: state => state.loading,
}

const shareModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default shareModule
