import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'



//引入vuex
import store from 'store/store.js'
Vue.prototype.$store = store

//引入loading
import loading from './components/comment/loading.vue'
Vue.component('load-list',loading)

//引入pageLoad
import pageLoad from './components/comment/pageLoad.vue'
Vue.component('pageLoad',pageLoad)

const app = new Vue({
    ...App,
	store
})
app.$mount()
