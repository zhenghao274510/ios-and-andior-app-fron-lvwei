import Vue from 'vue'
import App from './App'
import api from "@/common/api.js"
import http from "@/common/request.js"
import sPullScroll from '@/components/s-pull-scroll/index.vue';
Vue.component('s-pull-scroll',sPullScroll);
Vue.prototype.$api = api;
Vue.prototype._reqw = http;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
