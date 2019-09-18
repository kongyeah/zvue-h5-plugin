import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './constant/route';
import { routeMeta } from './constant/meta';

Vue.use(Router);

routes.push({
  name: 'index',
  path: '*',
  redirect: {
    name: 'demo',
  }
});

// 页面切换时
router.beforeEach((to, from, next) => {
  next();
});

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '',
    routes,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 };
    }
  })
}
