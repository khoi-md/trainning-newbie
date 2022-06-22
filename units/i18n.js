import Vue from 'vue'
import VueI18n from 'vue-i18n'
import shareEnTranslation from '@/share/locales/en.json'
import shareJaTranslation from '@/share/locales/ja.json'
import yuiEnTranslation from '@/yui/locales/en.json'
import yuiJaTranslation from '@/yui/locales/ja.json'
import localEnTranslation from './locales/en.json'
import localJaTranslation from './locales/ja.json'

const enTranslation = { ...shareEnTranslation, ...yuiEnTranslation, ...localEnTranslation }
const jpTranslation = { ...shareJaTranslation, ...yuiJaTranslation, ...localJaTranslation }

Vue.use(VueI18n)

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'ja',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ja',
  messages: {
    en: enTranslation,
    ja: jpTranslation,
  },
})
