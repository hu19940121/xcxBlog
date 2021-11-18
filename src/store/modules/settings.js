import { getSetting } from '@/api'
const state = {
  settingInfo: {
  }
}

const mutations = {
  CHANGE_SETTING: (state, settingInfo) => {
    state.settingInfo = settingInfo
  }
}

const actions = {
  getSetting({ commit } ) {
    return new Promise((resolve)=>{
      getSetting().then((res)=>{
        resolve(res.data)
        commit('CHANGE_SETTING', res.data)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

