import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './constant/route';

Vue.use(Router);

// 初始化路由并定义滚动行为
const router = new Router({
  mode: 'history',
  base: '',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

// 页面切换时设置标题
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  setTimeout(() => {
    document.title = title;
  }, 300);
  next();
});

export {
  router,
};
