import axios from 'axios'
import { name as mainPageNS, actionTypes as mainPageActions } from '@/share/store/main-page'

const state = {
  data: {},
}
const mutations = {
  OPEN_POPUP(state, payload) {
    state.data = payload
  },
  CLOSE_POPUP(state) {
    state.data = {}
  },
  SET_DATA(state, payload) {
    state.data = payload
  },
}
const actions = {
  async getDataFromAPI({ commit, dispatch }, payload) {
    dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, true, { root: true })
    let response = await axios.get(`${window.companyPath}api/discovery/top/summary/${payload}`)
    commit('SET_DATA', response?.data?.data)
    dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, false, { root: true })
  },
}
const getters = {
  getData: state => state.data,
}
const popupSummary = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default popupSummary
