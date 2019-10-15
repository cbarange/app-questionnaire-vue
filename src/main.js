// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */
// besoin de desactiver eslint le prefix CB_ ne respecte le camel case [15/10/2019]
import Vue from 'vue'
import App from './App'
import router from './router'

import CB_Header from './CB_Header' // Component CB_Header [15/10/2019]
import CB_Footer from './CB_Footer' // Component CB_Footer [15/10/2019]

Vue.config.productionTip = false

// Component App [15/10/2019]
var cb_vm_app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// Component CB_Header [15/10/2019]
var cb_vm_header = new Vue({
  el: '#cb_header',
  router,
  components: { CB_Header },
  template: '<CB_Header/>'
})

// Component CB_Footer [15/10/2019]
var cb_vm_footer = new Vue({
  el: '#cb_footer',
  router,
  components: { CB_Footer },
  template: '<CB_Footer/>'
})