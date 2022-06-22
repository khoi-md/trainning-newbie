export default {
  namespaced: true,
  state: {
    currentSideBar: '',
    sidebarToggle: false,
  },
  actions: {
    toggleSidebar({ commit }, payload) {
      commit('SET_SIDEBAR_TOGGLE', payload)
    },
  },
  getters: {
    getCurrentSideBar: state => state.currentSideBar,
    getSidebarToggle: state => state.sidebarToggle,
  },
  mutations: {
    SET_CURRENT_SIDE_BAR(state, payload) {
      state.currentSideBar = payload
    },
    SET_SIDEBAR_TOGGLE(state, payload) {
      state.sidebarToggle = payload
    },
  },
}
