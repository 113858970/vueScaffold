export const state = {
  personInfo: {
    name: '',
    sex: ''
  }
}

export const mutations = {
  setPersonInfo (state, data) {
    if (data) {
      state.personInfo = {
        ...state.personInfo,
        ...data
      }
    }
  }
}
export const actions = {

}
