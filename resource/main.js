import Vue from 'vue';
import { vueFilter } from '@utils/filter';
import App from './App';
import { store } from './store';
import { router } from './router';

// filter方法
vueFilter();

// 初始化 Vue
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
});
