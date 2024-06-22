import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './utils/androidBack'
import http from './utils/http'

import './utils/safeArea' // safeArea
import './utils/rem' // rem
// import ws from './utils/webSocket' // webSocket
import VConsole from 'vconsole'
if (process.env.VUE_APP_DEBUG == '1' && /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  new VConsole()
}
// Vue.prototype.$ws = ws

// fastclick
import FastClick from 'fastclick'
FastClick.attach(document.body)

// directive
import './directive/help'
import clipboard from './directive/clipboard'
clipboard.install(Vue)

// vant ui
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
Vue.use(Vant)
Vue.use(Lazyload, {
  lazyComponent: true
})
import Img from '@/components/Img.vue'
Vue.component('Img', Img)
import NoData from '@/components/NoData'
import CoinImg from '@/components/CoinImg'
import ScrollMore from '@/components/ScrollMore'

import { toNumber } from '@/utils/helper'
Vue.prototype.toNumber = toNumber

import './assets/css/index.scss'
import './assets/css/var-bluma.css'

Vue.config.productionTip = false
Vue.prototype.$http=http
import 'vue-list-marquee/dist/vue-list-marquee.css'
import VueListMarquee from 'vue-list-marquee'
Vue.use(VueListMarquee)
Vue.use(NoData)
Vue.use(CoinImg)
Vue.use(ScrollMore)
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
// 状态栏调成黑色
document.addEventListener('plusready', () => {
  plus.navigator.setStatusBarStyle('dark')
}, false)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
