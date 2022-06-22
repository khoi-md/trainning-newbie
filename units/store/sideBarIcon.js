import { name as mainPageNS, actionTypes as mainPageActions } from '@/share/store/main-page'
import api from '../services/api'

const sideBarIcon = {
  namespaced: true,
  state: {
    listMenuFromApi: [],
  },
  getters: {
    getListMenuFromApi: state => state.listMenuFromApi,
  },
  mutations: {
  },
  actions: {
  },
}

export default sideBarIcon
