import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store'
import { Locale } from 'vant'
import en from './lang/en'
import zh_hk from './lang/zh_hk'
// import de from './lang/de'
import es from './lang/es'
import tr from './lang/tr'
import vtr from './lang/vtr'
import ar from './lang/ar'
import vary from './lang/var'

import iny from './lang/iny'
import viny from './lang/viny'

import id from './lang/id'
import vid from './lang/vid'

import ven from 'vant/lib/locale/lang/en-US'
import vzh_hk from 'vant/lib/locale/lang/zh-HK'
// import vde from 'vant/lib/locale/lang/de-DE'
import ves from 'vant/lib/locale/lang/es-ES'

const messages = {
  id: { ...id, ...vid },
  tr: { ...tr, ...vtr },
  en: { ...en, ...ven },
  iny: { ...iny, ...viny },
  es: { ...es, ...ves },
  ar: { ...ar, ...vary },
  // de: { ...de, ...vde },
  zh_hk: { ...zh_hk, ...vzh_hk },
  // fr: { ...fr, ...vfr },
  // ita: {...ita, ...vita },
}

Vue.use(VueI18n)
//从localStorage中拿到用户的语言选择。
const locale = localStorage.lang || 'en'
const i18n = new VueI18n({ messages })
store.set('lang', locale)

i18n.changeLang = function(lang) {
  Locale.use(lang, messages[lang])
  localStorage.lang = i18n.locale = lang
  store.set('lang', lang)
}

i18n.changeLang(locale)

export const langs = [
  { id: 'en', name: 'English' },
  { id: 'id', name: 'Bahasa Indonesia' },
  { id: 'es', name: 'Español' },
  { id: 'ar', name: 'عربي' },
  { id: 'tr', name: 'Türkçe' },
  { id: 'iny', name: 'हिंदी' },
  // { id: 'zh_hk', name: '中文繁體' },
  // { id: 'de', name: 'Deutsch' },
  // { id: 'fr', name: 'Français'},
  // { id: 'ita', name: 'Italiano' },
]

export default i18n
window.i18n = i18n
