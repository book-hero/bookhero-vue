import axios from 'axios'
const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : ''

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

async function makeCall(apiCall, params) {
  console.log(...params)
  if (!isFunction(apiCall)) throw Error('apiCall is not a function')
  try {
    const response = await apiCall(...params)
    return response.data
  } catch (e) {
    // console.error({ error: e.response.data })
    return { errors: e.response.data }
  }
}

function calls(base) {
  return {
    get(additionalUrl) {
      const url = base + (additionalUrl || '') + '/'
      return makeCall(axios.get, [url])
    },
    post(additionalUrl, body) {
      const url = base + (additionalUrl || '') + '/'
      return makeCall(axios.post, [url, body])
    },
    put(url) {
      axios.put(base + url || '')
    },
    delete(url) {
      axios.delete(base + url || '')
    },
    patch(url) {
      axios.patch(base + url || '')
    }
  }
}

export const booksApi = (() => {
  return calls(BASE_URL + 'books')
})()

export const authApi = (() => {
  return calls(BASE_URL + 'auth')
})()
