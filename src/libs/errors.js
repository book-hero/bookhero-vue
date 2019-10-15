import router from '../router'
import * as R from 'ramda'

function getKeyFromValue (obj, value) {
  return R.invertObj(obj).value
}

const severities = {
  MAJOR: 1,
  MODERATE: 2,
  MINOR: 3
}

const type = {
  GENERIC_API: '10'
}

const displayError = R.curry((severity, type, code, message) => {
  if (severity === severities.MAJOR) {
    // navigate to page with code and message
    router.push({ name: 'error', params: { code: type + code, message } })
  } else {
    console.log(
      `Unable to handle error of ${getKeyFromValue(
        severities,
        severity
      )} severity`
    )
  }
})

// Severity
// - Full Screen -> major = 1
// - Modal -> moderate = 2
// - Toaster -> minor = 3

const majorError = displayError(severities.MAJOR)

// const moderateError = displayError(severities.MODERATE)

// const minorError = displayError(severities.MINOR)

export const majorApiError = majorError(type.GENERIC_API)
