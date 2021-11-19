import { getSetting,getBanner } from '@/api'
const state = {
  settingInfo: {
  },
  bannerList: []
}

const mutations = {
  CHANGE_SETTING: (state, settingInfo) => {
    state.settingInfo = settingInfo
  },
  CHANGE_BANNER: (state, list) => {
    state.bannerList = list
  },
}

const actions = {
  getSetting({ commit } ) {
    return new Promise((resolve)=>{
      getSetting().then((res)=>{
        resolve(res.data)
        commit('CHANGE_SETTING', res.data)
      })
    })
  },
  getBanner({ commit }) {
    return new Promise((resolve)=>{
      getBanner().then((res)=>{
        resolve(res.data)
        commit('CHANGE_BANNER', res.data)
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

