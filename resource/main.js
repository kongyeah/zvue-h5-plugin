
import Vue from 'vue';
import App from './App';
import { createStore } from './store';
import { createRouter } from './router';
import { vueFilter } from './common/filter';
import { init as initShare } from './common/share';

const router = createRouter();
const store = createStore();

// filter方法
vueFilter();

// 初始化分享
initShare();

// 初始化 Vue
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
