import store from '../../index'
import i18n from '../../../i18n'
import api from '@/units/services/api'
import constants from '@/units/constants'
import detail from './detail'
import manager from './manager'
import { cloneDeep } from 'lodash'

const state = {
  paging: {
    pageSize: 10,
    offSet: 0,
    total: 0,
  },
  menuToggle: false,
  listEmployee: [],
  sortFilter: [
    {
      key: 'UnitHistory.modified',
      type: 'desc',
      label: i18n.t('unit.organization.list.table.last_updated'),
    },
    {
      key: 'UnitHistory.modified',
      type: 'asc',
      label: i18n.t('unit.organization.list.table.last_updated'),
    },
    {
      key: 'unit_cd',
      type: 'desc',
      label: i18n.t('unit.organization.list.table.department_code'),
    },
    {
      key: 'unit_cd',
      type: 'asc',
      label: i18n.t('unit.organization.list.table.department_code'),
    },
    {
      key: 'unit_name',
      type: 'desc',
      label: i18n.t('unit.organization.list.table.department_name'),
    },
    {
      key: 'unit_name',
      type: 'asc',
      label: i18n.t('unit.organization.list.table.department_name'),
    },
  ],
  sortFilterDefault: [],
  currentSort: {},
  searchName: '',
  sortInfo: '',
  sortStatus: '',
  actionThreeDots: [
    {
      name: '',
    },
  ],
  errorDateLower: '',
}

const mutations = {
  SET_PAGE_SIZE(state, payload) {
    state.paging.pageSize = payload
  },
  SET_OFF_SET(state, payload) {
    state.paging.offSet = payload
  },
  SET_TOTAL(state, payload) {
    state.paging.total = payload
  },
  SET_MENU_TOGGLE(state, payload) {
    state.menuToggle = payload
  },
  SET_LIST_EMPLOYEE(state, payload) {
    state.listEmployee = payload
  },
  SET_SEARCH_NAME(state, payload) {
    state.searchName = payload
  },
  SET_SORT_INFO(state, payload) {
    state.sortInfo = payload
  },
  SET_SORT_STATUS(state, payload) {
    state.sortStatus = payload
  },
  SET_SORT_FILTER(state, payload) {
    state.sortFilter = payload
  },
  SET_SORT_FILTER_DEFAULT(state, payload) {
    state.sortFilterDefault = payload
  },
  SET_CURRENT_SORT(state, payload) {
    state.currentSort = payload
  },
  SET_ERROR_DATE_LOWER(state, payload) {
    state.errorDateLower = payload
  },
}

const actions = {
  toggleSidebar({ commit }, payload) {
    commit('SET_MENU_TOGGLE', payload)
  },
  configParamsWhenChangeTag({ commit, getters, state }) {
    if (!getters.getSortFilterDefault.length) {
      commit('SET_SORT_FILTER_DEFAULT', getters.getSortFilter)
    }

    if (getters.getSortStatus === constants.ORGANIZATION.STATUS.ABOLITION) {
      let newFilter = cloneDeep(state.sortFilter)
      newFilter[0].key = 'Unit.active_end_date'
      newFilter[0].label = i18n.t('unit.organization.list.table.abolition_date')
      newFilter[1].key = 'Unit.active_end_date'
      newFilter[1].label = i18n.t('unit.organization.list.table.abolition_date')
      commit('SET_SORT_FILTER', newFilter)
      commit('SET_CURRENT_SORT', newFilter[0])
    }

    if (getters.getSortStatus !== constants.ORGANIZATION.STATUS.ABOLITION) {
      commit('SET_SORT_FILTER', getters.getSortFilterDefault)
      commit('SET_CURRENT_SORT', getters.getSortFilter[0])
    }
  },
  async setDepartmentList({ commit, getters, dispatch, state }, payload) {
    try {
      store.dispatch('share/startLoading')

      let newParams = {
        limit: getters.getPageSize,
        offset: getters.getOffSet,
        sort_info: getters.getSortInfo,
      }

      if (getters.getSearchName) {
        newParams = {
          ...newParams,
          name: getters.getSearchName,
        }
      }

      if (getters.getSortStatus) {
        newParams = {
          ...newParams,
          status: getters.getSortStatus,
        }
      }

      const { data } = await api('getDepartmentList', newParams)
      commit('SET_LIST_EMPLOYEE', data.data)
      commit('SET_TOTAL', data.total)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async registerUpdateAbolitionDate({ commit, getters, state }, payload) {
    try {
      commit('SET_ERROR_DATE_LOWER', '')
      store.dispatch('share/startLoading')

      const formData = new FormData()
      formData.append('data[unit_id]', payload.unit_id)
      formData.append('data[abolition_date]', payload.abolition_date)
      formData.append('data[_Token][key]', window.CSRF_TOKEN)

      let response

      if (payload.item.value === constants.ORGANIZATION.ACTIONSTHREEDOTS.REGISTER) {
        formData.append('_method', 'POST')
        response = await api('registerAbolitionDate', formData)
      } else {
        formData.append('_method', 'PUT')
        response = await api('updateAbolitionDate', formData)
      }

      if (!response.data.completed) {
        commit('SET_ERROR_DATE_LOWER', response.data.active_end_date[0])
      }

      return response.data
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async deleteObsoleteDate({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')

      const formData = new FormData()
      formData.append('data[unit_id]', payload.unit_id)
      formData.append('data[_Token][key]', window.CSRF_TOKEN)
      formData.append('_method', 'POST')

      await api('deleteObsoleteDate', formData)
      ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.delete'))
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  resetData({ commit, getters, state }, payload) {
    commit('SET_CURRENT_SORT', {})
    commit('SET_SORT_INFO', '')
    commit('SET_OFF_SET', 0)
    commit('SET_PAGE_SIZE', 10)
    commit('SET_SEARCH_NAME', '')
    commit('SET_SORT_STATUS', '')
  },
}

const getters = {
  getPageSize: state => state.paging.pageSize,
  getOffSet: state => state.paging.offSet,
  getTotal: state => state.paging.total,
  getMenuToggle: state => state.menuToggle,
  getListEmployee: state => state.listEmployee,
  getSearchName: state => state.searchName,
  getSortInfo: state => state.sortInfo,
  getSortStatus: state => state.sortStatus,
  getSortFilter: state => state.sortFilter,
  getSortFilterDefault: state => state.sortFilterDefault,
  getCurrentSort: state => state.currentSort,
  getErrorDateLower: state => state.errorDateLower,
}

const organization = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    detail,
    manager,
  },
}

export default organization
