import Vue from 'vue'
import store from './store/index'
// import '@tarojs/taro/html.css';
import 'vant/lib/index.css';
import Taro from '@tarojs/taro'
import './app.scss'
import './styles/common.scss'
import Vant from 'vant';
Vue.prototype.$Taro = Taro
Vue.use(Vant);

// Vue.config.productionTip = false

const App = {
  store,
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
