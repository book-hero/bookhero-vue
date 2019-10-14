import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'https://api.bookhero.net/'

function isFunction (functionToCheck) {
  return functionToCheck && typeof functionToCheck === 'function'
}

async function makeCall (axiosMethod, params) {
  if (!isFunction(axiosMethod)) throw Error('axiosMethod is not a function')
  return axiosMethod(...params)
    .then(response => response.data)
    .catch(error => error.response.data)
}

function apiFactory (base) {
  return {
    get (additionalUrl = '', params = {}) {
      const url = `${base}${additionalUrl}/`
      return makeCall(axios.get, [url, { params }])
    },
    post (additionalUrl = '', body = {}) {
      const url = `${base}${additionalUrl}/`
      return makeCall(axios.post, [url, body])
    },
    put (url) {
      axios.put(base + url || '')
    },
    delete (additionalUrl = '', params = {}) {
      const url = `${base}${additionalUrl}/`
      return makeCall(axios.delete, [url, { params }])
    },
    patch (additionalUrl = '', body = {}) {
      const url = `${base}${additionalUrl}/`
      return makeCall(axios.patch, [url, body])
    }
  }
}

export const booksApi = (() => apiFactory(BASE_URL + 'books'))()

export const authApi = (() => apiFactory(BASE_URL + 'auth'))()

export const userApi = (() => apiFactory(BASE_URL + 'user'))()

export const attributesApi = (() => apiFactory(BASE_URL + 'attributes'))()
