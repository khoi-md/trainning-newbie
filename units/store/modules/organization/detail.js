import store from '../../index.js'
import i18n from '../../../i18n.js'
import api from '@/units/services/api.js'
import { LIST_CITY } from '@/share/constants'
import constants from '@/units/constants'
import router from '@/units/router/router'

import axios from 'axios'
import { omit, unionBy, cloneDeep, sortBy } from 'lodash'

const state = {
  paging: {
    pageSize: 10,
    offSet: 0,
    total: 0,
  },
  postalCode: '',
  errorPostalCode: false,
  position: {
    prefecture: '',
    municipality: '',
    address: '',
    building_name: '',
  },
  dataDetail: {
    Unit: {
      category_code: null,
      id: '',
      language_cdkey: '',
      industry_code: null,
      related_dept: null,
    },
    UnitHistory: {
      address: '',
      address_map: null,
      building_name: null,
      fax_no: '',
      id: '',
      modified: '',
      municipality: null,
      post_no: '',
      prefecture: null,
      rank_code: null,
      reasonable_personnel: null,
      remarks: '',
      router_name: null,
      start_date: '',
      station_name: null,
      tel_no: '',
      unit_cd: '',
      unit_cd2: '',
      unit_name: '',
      unit_name_en: '',
      unit_short_nm: '',
      unit_short_nm_en: '',
    },
  },
  dataDetailDefault: {
    Unit: {
      category_code: null,
      id: '',
      language_cdkey: '',
      industry_code: null,
      related_dept: null,
    },
    UnitHistory: {
      address: '',
      address_map: null,
      building_name: null,
      fax_no: '',
      id: '',
      modified: '',
      municipality: null,
      post_no: '',
      prefecture: null,
      rank_code: null,
      reasonable_personnel: null,
      remarks: '',
      router_name: null,
      start_date: '',
      station_name: null,
      tel_no: '',
      unit_cd: '',
      unit_cd2: '',
      unit_name: '',
      unit_name_en: '',
      unit_short_nm: '',
      unit_short_nm_en: '',
    },
  },
  dataCreate: {},
  unitId: '',
  optionsIndustries: [],
  optionsDeparmentRank: [],
  optionsLanguages: [],
  optionsCategories: [],
  historyByUnitList: [],
  searchDepartmentList: [],
  routerNearList: [],
  stationNearList: [],
  employeeList: [],
  isDetailHistory: false,
  messageErrorUnitCD: '',
  messageErrorUnitCD2: '',
}

const mutations = {
  SET_OPTION_INDUSTRIES(state, payload) {
    state.optionsIndustries = payload
  },
  SET_OPTION_LANGUAGES(state, payload) {
    state.optionsLanguages = payload
  },
  SET_OPTION_DEPARTMENT_RANK(state, payload) {
    state.optionsDeparmentRank = payload
  },
  SET_OPTION_CATEGORIES(state, payload) {
    state.optionsCategories = payload
  },
  SET_ERROR_POSTAL_CODE(state, payload) {
    state.errorPostalCode = payload
  },
  SET_POSITION(state, payload) {
    state.position = payload
  },
  SET_PREFECTURE(state, payload) {
    state.position.prefecture = payload
  },
  SET_MUNICIPALITIES(state, payload) {
    state.position.municipality = payload
  },
  SET_ADDRESS(state, payload) {
    state.position.address = payload
  },
  SET_BUILDING_NAME(state, payload) {
    state.position.building_name = payload
  },
  SET_DATA_DETAIL(state, payload) {
    state.dataDetail = payload
  },
  SET_DATA_DETAIL_DEFAULT(state, payload) {
    state.dataDetailDefault = payload
  },
  SET_UNIT_ID(state, payload) {
    state.unitId = payload
  },
  SET_HISTORY_BY_UNIT_LIST(state, payload) {
    state.historyByUnitList = payload
  },
  SET_SEARCH_DEPARTMENT_LIST(state, payload) {
    state.searchDepartmentList = payload
  },
  SET_ROUTER_NEAR_LIST(state, payload) {
    state.routerNearList = payload
  },
  SET_STATION_NEAR_LIST(state, payload) {
    state.stationNearList = payload
  },
  SET_PAGE_SIZE(state, payload) {
    state.paging.pageSize = payload
  },
  SET_OFF_SET(state, payload) {
    state.paging.offSet = payload
  },
  SET_EMPLOYEE_LIST(state, payload) {
    state.employeeList = payload
  },
  SET_DATA_CREATE(state, payload) {
    state.dataCreate = payload
  },
  SET_CONDITION_DETAIL_HISTORY(state, payload) {
    state.isDetailHistory = payload
  },
  SET_MESSAGE_ERROR_UNIT_CD(state, payload) {
    state.messageErrorUnitCD = payload
  },
  SET_MESSAGE_ERROR_UNIT_CD2(state, payload) {
    state.messageErrorUnitCD2 = payload
  },
}

const actions = {
  async setIndustriesList({ commit, getters, state }, payload) {
    try {
      const { data } = await api('getPageInfo', payload)
      const industriesList = data.data.industries.map(el => {
        return {
          id: el.industry_code,
          text: el.name,
          name: el.name,
          value: el.industry_code,
        }
      })
      const departmentRank = data.data.department_ranks.map(el => {
        return {
          id: el.rank_code,
          text: el.name,
          name: el.name,
          value: el.rank_code,
        }
      })
      const language = Object.entries(data.data.languages).map(([key, value]) => {
        return {
          id: key,
          text: value,
          name: value,
          value: key,
        }
      })
      const categories = data.data.priority_categories.map(el => {
        return {
          id: el.category_code,
          text: el.name,
          name: el.name,
          value: el.category_code,
        }
      })

      commit('SET_OPTION_INDUSTRIES', industriesList)
      commit('SET_OPTION_DEPARTMENT_RANK', departmentRank)
      commit('SET_OPTION_LANGUAGES', language)
      commit('SET_OPTION_CATEGORIES', categories)
    } catch (error) {
      console.log(error, 'error')
    }
  },
  async setPostalCode({ commit, getters }, payload) {
    try {
      commit('SET_ERROR_POSTAL_CODE', false)
      const firstCode = payload.slice(0, 3)

      if (!firstCode) {
        commit('SET_ERROR_POSTAL_CODE', true)
      }

      const response = await axios.get(
        `https://yubinbango.github.io/yubinbango-data/data/${firstCode}.js`,
      )
      const data = JSON.parse(response.data.slice(7, -3))[payload]

      if (!data || !data.length || !response) {
        commit('SET_ERROR_POSTAL_CODE', true)
      }

      commit('SET_ERROR_POSTAL_CODE', false)
      commit('SET_PREFECTURE', LIST_CITY[data[0]])
      commit('SET_MUNICIPALITIES', `${data[1]} ${data[2]}`)
      data[3] && commit('SET_ADDRESS', data[3])
      data[4] && commit('SET_BUILDING_NAME', data[4])
    } catch (error) {
      commit('SET_ERROR_POSTAL_CODE', true)
    }
  },
  async setUnitDetail({ commit, dispatch, state }, payload) {
    if (!state.dataDetailDefault.Unit) {
      commit('SET_DATA_DETAIL_DEFAULT', state.dataDetail)
    }
    try {
      store.dispatch('share/startLoading')
      const { data } = await api('getUnitDetail', payload)

      if (!data.data || !data.data.UnitHistory) {
        router.push({ name: constants.ROUTESNAME.UNIT_LIST })
      }
      commit('SET_CONDITION_DETAIL_HISTORY', false)
      commit('SET_DATA_DETAIL', data.data)

      if (data.data.Unit.id) {
        commit('SET_UNIT_ID', data.data.Unit.id)
        dispatch('setHistoryByUnit', { id: data.data.Unit.id })
      }

      commit('SET_PREFECTURE', data.data.UnitHistory.prefecture)
      commit('SET_MUNICIPALITIES', data.data.UnitHistory.municipality)
      commit('SET_ADDRESS', data.data.UnitHistory.address)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async setHistoryByUnit({ commit }, payload) {
    try {
      store.dispatch('share/startLoading')
      const { data } = await api('getHistoryByUnit', payload)
      const listHistoryByUnit = data.map(el => ({
        id: el.id,
        text: el.name_in_list,
        name: el.name_in_list,
        value: el.id,
      }))
      commit('SET_HISTORY_BY_UNIT_LIST', listHistoryByUnit)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async setRouterNearList({ commit }, payload) {
    try {
      store.dispatch('share/startLoading')
      const params = {
        name: payload,
        limit: 10,
        offset: 0,
      }
      const { data } = await api('getRouterNear', params)
      const newResult = data.map(el => ({
        id: el.code,
        name: el.Name,
        text: el.Name,
        value: el.code,
      }))
      commit('SET_ROUTER_NEAR_LIST', newResult)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async setStationNearList({ commit }, payload) {
    try {
      store.dispatch('share/startLoading')
      const params = {
        code: payload,
        limit: 10,
        offset: 0,
      }
      const { data } = await api('getStationNear', params)
      const newResult = data.map(el => ({
        id: el.code,
        name: el.Name,
        text: el.Name,
        value: el.code,
      }))
      commit('SET_STATION_NEAR_LIST', newResult)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async searchDepartmentList({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')
      const { data } = await api('getDepartmentList', payload)
      const listSearch = data.data.map(el => ({
        id: el.id,
        name: el.unit_name,
        key: el.unit_name,
        value: el.id,
      }))
      const dataDefault = sortBy(cloneDeep(getters.getSearchDepartmentList), 'name')
      const newList = unionBy(listSearch, dataDefault, 'id')
      commit('SET_SEARCH_DEPARTMENT_LIST', newList)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  resetDataDetail({ commit, getters }, payload) {
    commit('SET_DATA_CREATE', getters.getDataDetailDefault)
    commit('SET_DATA_DETAIL', getters.getDataDetailDefault)
    commit('SET_PREFECTURE', '')
    commit('SET_MUNICIPALITIES', '')
    commit('SET_ADDRESS', '')
  },
  async searchEmployeeList({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')
      const { data } = await api('searchEmployeeList', payload)
      const employeeData = data.data.map(el => ({
        id: el.id,
        name: el.name,
        key: el.name,
        value: el.id,
        ...el,
      }))
      commit('SET_EMPLOYEE_LIST', employeeData)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async updateUnitDepartment({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')
      const temp = {
        id: getters.getDataDetail.Unit.id,
        ...payload,
      }
      const { data } = await api('updateUnit', temp)
      if (data.Unit) {
        ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.update'))
      }
      if (data.response.data.error) {
        data.response.data.error.details.forEach(el => {
          ppCommon.peopleFloatingMessage(el.message, 'alert-error2')
        })
      }
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async createDepartment({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')
      let formData = new FormData()
      formData.append('_Token[key]', window.CSRF_TOKEN)
      formData.append('employeeId', store.state['main-page'].myaccount.id)
      Object.keys(getters.getDataCreate).forEach(el => {
        if (el === 'EmployeeFile') {
          formData.append(`${el}`, getters.getDataCreate[el])
          return
        }
        Object.keys(getters.getDataCreate[el]).forEach(key => {
          if (
            Array.isArray(getters.getDataCreate[el][key]) &&
            getters.getDataCreate[el][key].length > 0
          ) {
            getters.getDataCreate[el][key].forEach((item, idx) => {
              formData.append(`${el}[${key}][${idx}][id]`, item.id)
              formData.append(`${el}[${key}][${idx}][name]`, item.name)
            })
            return
          }

          if (key === 'start_date') {
            formData.append(`Unit[active_${key}]`, getters.getDataCreate[el][key])
            formData.append(`${el}[${key}]`, getters.getDataCreate[el][key])
            return
          }

          if (getters.getDataCreate[el][key]) {
            formData.append(`${el}[${key}]`, getters.getDataCreate[el][key])
            return
          }
        })
      })

      Object.keys(omit(getters.getPosition, 'building_name')).forEach(el => {
        if (getters.getPosition[el]) {
          formData.append(`UnitHistory[${el}]`, getters.getPosition[el])
        }
      })

      const { data } = await api('createDepartment', formData)

      if (data.UnitHistory) {
        commit('SET_MESSAGE_ERROR_UNIT_CD', '')
        commit('SET_MESSAGE_ERROR_UNIT_CD2', '')
        ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.register'))
        router.push({ name: constants.ROUTESNAME.UNIT_LIST })
      }
      if (data.response.data.error) {
        data.response.data.error.details.forEach(el => {
          ppCommon.peopleFloatingMessage(el.message, 'alert-error2')

          if (el.key.includes('unit_cd2')) {
            commit('SET_MESSAGE_ERROR_UNIT_CD2', el.message)
            return
          }

          if (el.key.includes('unit_cd')) {
            commit('SET_MESSAGE_ERROR_UNIT_CD', el.message)
          }
        })
      }
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async updateUnitHistoryDepartment({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')
      let formData = new FormData()
      formData.append('_Token[key]', window.CSRF_TOKEN)
      formData.append('employeeId', store.state['main-page'].myaccount.id)
      Object.keys(getters.getDataCreate).forEach(el => {
        if (el === 'EmployeeFile') {
          formData.append(`${el}`, getters.getDataCreate[el])
          return
        }

        if (el === 'UnitHistory') {
          Object.keys(getters.getDataCreate[el]).forEach(key => {
            if (
              Array.isArray(getters.getDataCreate[el][key]) &&
              getters.getDataCreate[el][key].length > 0
            ) {
              getters.getDataCreate[el][key].forEach((item, idx) => {
                formData.append(`${el}[${key}][${idx}][id]`, item.id)
                formData.append(`${el}[${key}][${idx}][name]`, item.name)
              })
              return
            }

            if (getters.getDataCreate[el][key]) {
              formData.append(`${el}[${key}]`, getters.getDataCreate[el][key])
              return
            }
          })
        }
      })

      Object.keys(omit(getters.getPosition, 'building_name')).forEach(el => {
        if (getters.getPosition[el]) {
          formData.append(`UnitHistory[${el}]`, getters.getPosition[el])
        }
      })

      const { data } = await api('updateUnitHistory', {
        payload: formData,
        id: getters.getDataDetail.UnitHistory.id,
      })

      if (data.UnitHistory) {
        ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.update'))

        commit('SET_MESSAGE_ERROR_UNIT_CD2', '')
      }

      if (data.response.data.error) {
        data.response.data.error.details.forEach(el => {
          ppCommon.peopleFloatingMessage(el.message, 'alert-error2')

          if (el.key.includes('unit_cd2')) {
            commit('SET_MESSAGE_ERROR_UNIT_CD2', el.message)
          }
        })
      }
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async removeUnitHistory({ commit, getters, state }, payload) {
    try {
      store.dispatch('share/startLoading')
      const { data } = await api('deleteUnitHistory', payload)
      ppCommon.peopleFloatingMessage(data.message, 'alert-error2')
      if (data.completed) {
        router.push({ name: constants.ROUTESNAME.UNIT_LIST })
      }
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async getUnitHistoryMostRecent({ commit, getters, dispatch }, payload) {
    try {
      store.dispatch('share/startLoading')
      const { data } = await api('getUnitHistoryMostRecent', payload)

      let newDataDetail = cloneDeep(data)

      if (data && data.UnitHistory && !data.UnitHistory.unit_cd) {
        newDataDetail = {
          ...getters.getDataDetail,
          ...newDataDetail,
          UnitHistory: {
            ...getters.getDataDetailDefault.UnitHistory,
            start_date: data.UnitHistory.start_date,
          },
        }
        dispatch('resetDataDetail')
      }

      commit('SET_DATA_DETAIL', newDataDetail)
      commit('SET_CONDITION_DETAIL_HISTORY', true)
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
  async registerUnitHistory({ commit, getters, dispatch }, payload) {
    try {
      store.dispatch('share/startLoading')
      let formData = new FormData()
      formData.append('_Token[key]', window.CSRF_TOKEN)
      formData.append('employeeId', store.state['main-page'].myaccount.id)
      formData.append('Unit[id]', getters.getDataDetail.Unit.id)

      Object.keys(getters.getDataCreate).forEach(el => {
        if (el === 'EmployeeFile') {
          formData.append(`${el}`, getters.getDataCreate[el])
          return
        }

        if (el === 'UnitHistory') {
          Object.keys(
            omit(getters.getDataCreate[el], [
              'prefecture',
              'municipality',
              'address',
              'address_map',
              'id',
            ]),
          ).forEach(key => {
            if (
              Array.isArray(getters.getDataCreate[el][key]) &&
              getters.getDataCreate[el][key].length > 0
            ) {
              getters.getDataCreate[el][key].forEach((item, idx) => {
                formData.append(`${el}[${key}][${idx}][id]`, item.id)
                formData.append(`${el}[${key}][${idx}][name]`, item.name)
              })
              return
            }

            if (getters.getDataCreate[el][key]) {
              formData.append(`${el}[${key}]`, getters.getDataCreate[el][key])
              return
            }
          })
        }
      })

      Object.keys(omit(getters.getPosition, 'building_name')).forEach(el => {
        if (getters.getPosition[el]) {
          formData.append(`UnitHistory[${el}]`, getters.getPosition[el])
        }
      })
      const { data } = await api('registerUnitHistory', formData)
      if (data.UnitHistory) {
        ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.update'))
        commit('SET_MESSAGE_ERROR_UNIT_CD2', '')
        router.push({ name: constants.ROUTESNAME.UNIT_DETAIL, params: { id: data.UnitHistory.id } })
      }

      if (data.response.data.error) {
        data.response.data.error.details.forEach(el => {
          ppCommon.peopleFloatingMessage(el.message, 'alert-error2')

          if (el.key.includes('unit_cd2')) {
            commit('SET_MESSAGE_ERROR_UNIT_CD2', el.message)
          }
        })
      }
    } catch (error) {
      console.log(error, 'error')
    } finally {
      store.dispatch('share/finishLoading')
    }
  },
}

const getters = {
  getIndustriesList: state => state.optionsIndustries,
  getLanguageList: state => state.optionsLanguages,
  getDepartmentRankList: state => state.optionsDeparmentRank,
  getCategoriesList: state => state.optionsCategories,
  getPosition: state => state.position,
  getPositionDefault: state => state.positionDefault,
  getDataDetail: state => state.dataDetail,
  getDataDetailDefault: state => state.dataDetailDefault,
  getUnitId: state => state.unitId,
  getHistoryByUnitList: state => state.historyByUnitList,
  getSearchDepartmentList: state => state.searchDepartmentList,
  getRouterNearList: state => state.routerNearList,
  getStationNearList: state => state.stationNearList,
  getErrorPostalCode: state => state.errorPostalCode,
  getPageSize: state => state.paging.pageSize,
  getOffSet: state => state.paging.offSet,
  getTotal: state => state.paging.total,
  getEmployeeList: state => state.employeeList,
  getDataCreate: state => state.dataCreate,
  checkIsDetailHistory: state => state.isDetailHistory,
  getMessageErrorUnitCD: state => state.messageErrorUnitCD,
  getMessageErrorUnitCD2: state => state.messageErrorUnitCD2,
}

const detail = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default detail
