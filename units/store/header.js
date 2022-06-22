import { name as mainPageNS, actionTypes as mainPageActions } from '@/share/store/main-page'
import axios from 'axios'

const state = {
  menuHeader: {},
}
const mutations = {
  SET_MENU_HEADER(state, payload) {
    state.menuHeader = payload
  },
}
const actions = {
  async getMenuHeaderFromAPI({ commit, getters, dispatch }) {
    dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, true, { root: true })
    let response = await axios.get(`${window.companyPath}api/discovery/header`)
    commit('SET_MENU_HEADER', response.data)
    dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, false, { root: true })
  },
}
const getters = {
  getMenuHeader: state => state.menuHeader,
}
const header = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default header
