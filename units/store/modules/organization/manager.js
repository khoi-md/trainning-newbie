import store from '../../index.js'
import i18n from '../../../i18n.js'
import api from '@/units/services/api.js'
import constants from '@/units/constants'
import router from '@/units/router/router'

import axios from 'axios'
import { omit, unionBy, cloneDeep, sortBy } from 'lodash'

export default {
  namespaced: true,
  state: {
    errorDate: '',
    unitManagerList: [],
    paging: {
      pageSize: 10,
      offSet: 0,
      total: 0,
    },
  },
  mutations: {
    SET_UNIT_MANAGER_LIST(state, payload) {
      state.unitManagerList = payload
    },
    SET_ERROR_START_DATE(state, payload) {
      state.errorDate = payload
    },
    SET_PAGE_SIZE(state, payload) {
      state.paging.pageSize = payload
    },
    SET_OFF_SET(state, payload) {
      state.paging.offSet = payload
    },
  },
  actions: {
    async setUnitManagerList({ commit, getters, state }, payload) {
      try {
        store.dispatch('share/startLoading')
        const { data } = await api('getManagerList', payload)
        const listManager = data.past
        commit('SET_UNIT_MANAGER_LIST', listManager)
      } catch (error) {
        console.log(error, 'error')
      } finally {
        store.dispatch('share/finishLoading')
      }
    },
    async removeUnitManagerList({ commit, getters, state }, payload) {
      try {
        store.dispatch('share/startLoading')
        const { data } = await api('deleteUnitManager', payload)
        if (data.message) {
          ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.delete'), 'alert-error2')
        }
      } catch (error) {
        console.log(error, 'error')
      } finally {
        store.dispatch('share/finishLoading')
      }
    },
    async setUnitManagerDetail({ commit, getters, state }, payload) {
      try {
        store.dispatch('share/startLoading')
        const { data } = await api('setUnitManager', payload)
        if (data && data.completed) {
          commit('SET_ERROR_START_DATE', '')
          ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.register'))
          return
        }

        if (!data.response || !data.response.status === 400) return

        if (
          Array.isArray(data.response.data.start_date) &&
          data.response.data.start_date.length > 0
        ) {
          data.response.data.start_date.forEach(el => {
            commit('SET_ERROR_START_DATE', el)
          })
          return
        }
        commit('SET_ERROR_START_DATE', data.response.data.start_date)
      } catch (error) {
        console.log(error, 'error')
      } finally {
        store.dispatch('share/finishLoading')
      }
    },
    resetDataUnitManager({ commit }, payload) {
      commit('SET_OFF_SET', 0)
      commit('SET_PAGE_SIZE', 10)
    },
  },
  getters: {
    getErrorStartDate: state => state.errorDate,
    getUnitManagerList: state => state.unitManagerList,
    getPageSize: state => state.paging.pageSize,
    getOffSet: state => state.paging.offSet,
    getTotal: state => state.paging.total,
  },
}
