import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';

import 'vue-tel-input/dist/vue-tel-input.css';

import VeeValidate from 'vee-validate';
import axios from 'axios'


Vue.config.productionTip = false

Vue.use(KeenUI);
Vue.use(VeeValidate);
window.axios = axios;
axios.defaults.baseURL = 'https://api.rubiesbank.io/dev';
// axios.defaults.baseURL = 'https://api.rubiesbank.io/prod';


export const enrollmentEventBus = new  Vue();



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
