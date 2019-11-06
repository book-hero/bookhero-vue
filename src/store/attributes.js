import { attributesApi } from '../api'
import * as R from 'ramda'

function shuffleArray(array) {
  let tempArray = array.slice(0)
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]]
  }
  return tempArray
}

export default {
  state: {
    attributes: []
  },
  actions: {
    async getAttributes({ commit }) {
      let result = await attributesApi.get()
      commit('setAttributes', result)
    }
  },
  mutations: {
    setAttributes(state, attributes) {
      state.attributes = attributes
    }
  },
  getters: {
    randomDescriptorList: state => () => {
      return shuffleArray(state.attributes.map(attribute => R.pipe(
        Math.random,
        Math.floor,
        R.nth(R.__, attribute.descriptors),
        R.tap(console.log)
      )(attribute.descriptors.length)))
    }
  }
}
