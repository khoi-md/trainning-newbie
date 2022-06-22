import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import CPUIKit from 'cydas-people-uikit'
import VueNotification from 'vue-notification'
import VueJsModal from 'vue-js-modal'
import VeeValidate from 'vee-validate'
import validationMessages from 'vee-validate/dist/locale/ja';
import i18n from './i18n'
import store from './store'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import highchartsSolidGauge from 'highcharts/modules/solid-gauge'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import vClickOutside from 'v-click-outside'

Vue.config.productionTip = false
const el = document.getElementById('people-app')
const company = el ? el.dataset.company : ''
window.companyPath = company
Vue.use(CPUIKit)
Vue.use(PerfectScrollbar)
Vue.use(VueNotification)
Vue.use(VueJsModal, { dynamic: true, injectModalsContainer: true })
Vue.use(HighchartsVue)
Vue.use(vClickOutside)
Vue.use(VeeValidate, {
  events: 'max:20',
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
    ja: validationMessages
  }
})
highchartsMore(Highcharts)
highchartsSolidGauge(Highcharts)
store.$vnotify = Vue.notify

window.CSRF_TOKEN = window.CSRF_TOKEN || process.env.VUE_APP_DEV_CSRF_TOKEN || ''

new Vue({
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#people-app')
