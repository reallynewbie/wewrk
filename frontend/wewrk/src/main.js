import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faTimesCircle, faSearch, faChevronRight, faClock, faTimes, faChevronDown, faList, faThLarge, faSortDown, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './custom.scss'

library.add(faHeart, faTimesCircle, faSearch, faChevronRight, faClock, faTimes, faChevronDown, faList, faThLarge, faSortDown, faSuitcase);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue);

new Vue({
  VueRouter,
  render: h => h(App),
}).$mount('#app')
