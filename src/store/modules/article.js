import { getCate, getComments } from '@/api'
const state = {
  cates: [],
  articleCount: 0,
  commentsCount: 0
}

const mutations = {
  CHANGE_CATE: (state, cates) => {
    state.cates = cates
  },
  CHANGE_ARTICLE_COUNT: (state, count) => {
    state.articleCount = count
  },
  CHANGE_COMMENTS_COUNT: (state, count) => {
    state.commentsCount = count
  },
}

const actions = {
  getCate({ commit } ) {
    return new Promise((resolve)=>{
      getCate().then((res)=>{
        resolve(res.data)
        commit('CHANGE_CATE', res.data)
      })
    })
  },

  getComments({ commit } ) {
    return new Promise((resolve)=>{
      getComments().then((res)=>{
        resolve(res.data)
        commit('CHANGE_COMMENTS_COUNT', res.data.count)
      })
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

