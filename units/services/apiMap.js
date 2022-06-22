import { omit } from 'lodash'

const api = config => ({
  // Get
  getDepartmentList: payload => config('get', 'api/units/departments', payload),
  getUnitDetail: payload => config('get', `api/units/edit/${payload.id}`),
  getPageInfo: payload => config('get', 'api/units/pageInfo', payload),
  getHistoryByUnit: payload => config('get', `/api/units/getHistoryByUnit/${payload.id}`),
  getRouterNear: payload => config('get', `api/external/ekispert/operation-line`, payload),
  getStationNear: payload => config('get', `api/external/ekispert/station`, payload),
  getManagerList: id => config('get', `api/units/getManagerList/${id}`),
  searchEmployeeList: payload => config('get', `api/search/employees`, payload),
  getUnitHistoryMostRecent: payload => config('get', `api/units/getHistoryMostRecent`, payload),

  // Post
  registerAbolitionDate: payload => config('post', 'api/unit/registAbolitionDate', payload),
  deleteObsoleteDate: payload => config('post', 'api/unit/deleteAbolitionDate', payload),
  updateAbolitionDate: payload => config('post', 'api/unit/updateAbolitionDate', payload),
  registerUnitHistory: payload => config('post', 'api/units/addHistory', payload),
  createDepartment: payload => config('post', 'api/units/create', payload),
  updateUnit: payload =>
    config('put', `api/units/updateUnit/${payload.id}`, {
      _Token: {
        key: window.CSRF_TOKEN,
      },
      ...omit(payload, 'id'),
    }),
  updateUnitHistory: ({ payload, id }) =>
    config('post', `api/units/updateUnitHistory/${id}`, payload),
  setUnitManager: payload =>
    config('post', `api/units/addManager`, {
      _Token: {
        key: window.CSRF_TOKEN,
      },
      ...payload,
    }),
  deleteUnitManager: id =>
    config('delete', 'api/units/deleteManager', {
      _Token: {
        key: window.CSRF_TOKEN,
      },
      id,
    }),
  deleteUnitHistory: history_id =>
    config('delete', 'api/units/deleteHistory', {
      _Token: {
        key: window.CSRF_TOKEN,
      },
      history_id,
    }),
})
export default api
