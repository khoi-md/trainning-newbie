import axios from 'axios'
import myPageApiMap from './apiMap'

export const BASE_URL = process.env.VUE_APP_HOST_URL || ''

const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

const getTenantPath = () => {
  return window.companyPath
}

const config = (method, url, data, header) => {
  let obj = {
    method,
    url,
  }
  if (data) {
    if (method === 'get') {
      obj['params'] = data
    } else {
      obj['data'] = data
    }
  }
  if (header) {
    obj['headers'] = header
  }
  return obj
}

const apiMap = { ...myPageApiMap(config) }

const api = async (apiName, apiParams) => {
  const config = apiMap[apiName](apiParams)
  const tenantPath = getTenantPath()
  config.url = `${tenantPath}${config.url}` 
  try {
    const res = await request(config)

    return {
      ...res,
      success: true,
    }
  } catch (error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      location.reload()
      return
    }
    return {
      success: false,
      data: error,
    }
  }
}

export default api
