import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../../share/components/MainPage.vue'
import { name as mainPageNS, actionTypes as mainPageActions } from '@/share/store/main-page'
import NotFound from '@/share/components/NotFound/NotFound.vue'
import store from '@/units/store/index.js'
import constants from '@/units/constants/index.js'

Vue.use(VueRouter)

const el = document.getElementById('people-app')
const company = el.dataset.company
const baseURL = `${company}`
const routes = [
  {
    path: '/units',
    component: MainPage,
    meta: {
      basePathUrl: 'units',
    },
    beforeEnter: async (to, from, next) => {
      store.dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, true)
      await store.dispatch(`${mainPageNS}/${mainPageActions.INIT_DISCOVERY}`)
      store.dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, false)
      next()
    },
    children: [
      {
        path: '',
        component: () => import('../layouts/MainLayout.vue'),
        name: 'MainLayout',
        meta: {
          basePathUrl: 'units',
        },
        beforeEnter: async (to, from, next) => {
          store.dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, true)
          await store.dispatch('header/getMenuHeaderFromAPI')
          store.dispatch(`${mainPageNS}/${mainPageActions.SET_LOADING}`, false)
          next()
        },
        children: [
          {
            path: '',
            component: () => import('../views/organization/Index.vue'),
            name: constants.ROUTESNAME.UNIT_LIST,
            meta: {
              basePathUrl: 'units',
            },
          },
          {
            path: 'create',
            component: () => import('../views/organization/Detail.vue'),
            name: constants.ROUTESNAME.UNIT_CREATE,
            meta: {
              basePathUrl: 'units',
            },
          },
          {
            path: 'detail/:id',
            component: () => import('../views/organization/Detail.vue'),
            name: constants.ROUTESNAME.UNIT_DETAIL,
            meta: {
              basePathUrl: 'units',
            },
          }
        ],
      },
    ],
  },
  { path: '*', component: NotFound },
]
routes.forEach(route => {
  route.meta = {
    basePathUrl: 'unit',
  }
})
const router = new VueRouter({
  mode: 'history',
  base: baseURL,
  routes,
})

export default router;
