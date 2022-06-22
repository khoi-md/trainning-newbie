import Vue from 'vue'
import Vuex from 'vuex'
import top from './modules/top'
import share from './modules/share'
import organization from './modules/organization'

import mainPageModule, { name as mainPageModuleName } from '@/share/store/main-page'
import toastMessagesModule, { name as toastMessagesModuleName } from '@/share/store/toastMessages'
import entry from './entry'
import header from './header'
import sideBarIcon from './sideBarIcon'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    [mainPageModuleName]: mainPageModule,
    [toastMessagesModuleName]: toastMessagesModule,
    top,
    share,
    [mainPageModuleName]: mainPageModule,
    entry,
    header,
    sideBarIcon,
    organization,
  },
})

store.$vnotify = Vue.notify

export default store
