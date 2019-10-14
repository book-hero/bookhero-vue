import { attributesApi } from '../api'

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
      const descriptors = state.attributes.map(attribute => {
        const rand = Math.floor(Math.random() * attribute.descriptors.length)
        console.log(rand)
        return attribute.descriptors[rand]
      })
      return shuffleArray(descriptors)
    }
  }
}
