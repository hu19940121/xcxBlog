import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import article from './modules/article'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    settings,
    article
  }
})

export default store
