import Vue from 'vue'
import Vuex from 'vuex'
import pathify from './pathify'
import sys from './sys'
import user from './user'
import hq from './hq'
Vue.use(Vuex)

const store = new Vuex.Store({
  ...sys,
  modules: {
    user,
    hq
  },
  plugins: [pathify.plugin]
})

export default store
window.store = store