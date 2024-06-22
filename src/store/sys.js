import { make } from 'vuex-pathify'
import http from '@/utils/http'

const state = {
  config: localStorage['config'] || {
    see: true
  },
  klineOpt: localStorage['klineOpt'] ? JSON.parse(localStorage['klineOpt']) : { kType: '5min', technical1: 'MA', technical2: 'MACD' },
  version: '-',
  newVersion: localStorage.newVersion ? JSON.parse(localStorage.newVersion) : {},
  lang: localStorage.lang,
  wsData: {}
}

const mutations = make.mutations(state)


const actions = {
  ...make.actions('newVersion'),
  checkVersion ({ dispatch }, opt) {
    let appType = (navigator.userAgent.indexOf('Android') > -1
        || navigator.userAgent.indexOf('Adr') > -1) ? 'android' : 'ios'
    http.get('common/version').then(data => {
      // http.get('common/getVersionInfo?app=' + appType).then(data => {
      data.type = appType
      localStorage.newVersion = JSON.stringify(data)
      dispatch('setNewVersion', data)
      if (opt && opt.callback) {
        opt.callback(data)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
