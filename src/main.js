import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
import axios from "axios";
Vue.prototype.$axios = axios;
/*导入ElementUI*/
import elementUI from 'element-ui';
/*导入ElementUI的CSS样式*/
import 'element-ui/lib/theme-chalk/index.css';
/*Vue使用ElementUI*/
Vue.use(elementUI);
import Echart from './components/echart/index.vue'
import "echarts-gl";
import ItemWrap from './components/item-wrap/item-wrap.vue'
import Message from './components/message/message.vue'
import Reacquire from './components/reacquire/reacquire.vue'
import Messages from './components/message/message'
import "vue-easytable/libs/theme-default/index.css";
import '@/assets/css/public.scss'
import "@/assets/css/index.scss"

import * as filters from '@/directives/filters'

// import VueAMap from "vue-amap";
import "echarts-gl";
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import VueAMap from "vue-amap";
Vue.use(VueAMap);
import AMapLoader from "@amap/amap-jsapi-loader";
Vue.use(AMapLoader);
require('./mock/mock') //是否使用mock
Vue.config.productionTip = false;
import highcharts from 'highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(highcharts)

// 自定义组件
Vue.component("Echart", Echart)
Vue.component("ItemWrap", ItemWrap)
Vue.component("Message", Message)
Vue.component("Reacquire", Reacquire)
Vue.prototype.$Message = Messages



// datav组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

// 全局数据过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");