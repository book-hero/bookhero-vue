import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : ''

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

async function makeCall(apiCall, params) {
  if (!isFunction(apiCall)) throw Error('apiCall is not a function')
  console.log(...params)
  try {
    const response = await apiCall(...params)
    return response.data
  } catch (e) {
    console.error({ errors: e.response.data })
    return { errors: e.response.data }
  }
}

function calls(base) {
  return {
    get(additionalUrl, params) {
      const url = base + (additionalUrl || '') + '/'
      return makeCall(axios.get, [url, { params }])
    },
    post(additionalUrl, body) {
      const url = base + (additionalUrl || '') + '/'
      return makeCall(axios.post, [url, body])
    },
    put(url) {
      axios.put(base + url || '')
    },
    delete(additionalUrl, params) {
      const url = base + (additionalUrl || '') + '/'
      return makeCall(axios.delete, [url, { params }])
    },
    patch(additionalUrl, body) {
      const url = base + (additionalUrl || '') + '/'
      return makeCall(axios.patch, [url, body])
    }
  }
}

export const booksApi = (() => {
  return calls(BASE_URL + 'books')
})()

export const authApi = (() => {
  return calls(BASE_URL + 'auth')
})()

export const userApi = (() => {
  return calls(BASE_URL + 'user')
})()
