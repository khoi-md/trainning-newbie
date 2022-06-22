import axios from 'axios'
import { name as mainPageNS, actionTypes as mainPageActions } from '@/share/store/main-page'
import popupSummary from './popupSummary'
const state = {
  listTopSummaries: [],
}

const mutations = {
  SET_LIST_TOP_SUMMARIES(state, payload) {
    state.listTopSummaries = payload
  },
}

const actions = {
  async getListTopSummariesFromAPI({ commit, dispatch }) {
    dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, true, { root: true })
    let response = await axios.get(`${window.companyPath}api/discovery/top/summaries`)
    commit('SET_LIST_TOP_SUMMARIES', response?.data?.data)
    dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, false, { root: true })
  },
}

const getters = {
  getListTopSummaries: state => state.listTopSummaries,
}

const topModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    popupSummary,
  },
}

export default topModule
