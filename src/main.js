import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import eCharts from 'echarts'
Vue.prototype.$echarts = eCharts

// 引入axios - 自己封装的
import {get,post} from './utils/ajax';
Vue.prototype.$http = {get,post};

//import VueQuillEditor from 'vue-quill-editor'
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.snow.css'
//import 'quill/dist/quill.bubble.css'
//Vue.use(VueQuillEditor);

// 引入mock
if (process.env.NODE_ENV !== 'production') require('./mock');

Vue.directive('focus', { // 自定义指令
  inserted: function (el) {
    // 聚焦元素 - 一定要找到input
    el.querySelector('input').focus()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
