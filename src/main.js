// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
import './mock'

import created from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import { ACCESS_TOKEN } from '@/store/mutation-types'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

if (process.env.VUE_APP_SINGLE_SPA) {
  console.log('single spa mode!!')
  Vue.ls.set(ACCESS_TOKEN, '4291d7da9005377ec9aec4a71ea837f', 7 * 24 * 60 * 60 * 1000)
}

if (!process.env.VUE_APP_SINGLE_SPA) {
  new Vue({
    router,
    store,
    created: created,
    render: h => h(App)
  }).$mount('#app')
}

// 参考：https://github.com/CanopyTax/single-spa-examples/tree/master/src/vue
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    router,
    store,
    created: created,
    render: h => h(App)
  }
})

export const bootstrap = vueLifecycles.bootstrap

export const mount = function (props) {
  props.domElement = domElementGetter()
  return vueLifecycles.mount(props)
}

export const unmount = function (props) {
  console.debug('Vue app unmount')
  document.querySelector('#app5').remove();
  return vueLifecycles.unmount(props)
}

function domElementGetter () {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app5')
  if (!el) {
    el = document.createElement('div')
    el.id = 'app5'
    document.querySelector('.ant-layout-content').appendChild(el)
  }
  return el
}
