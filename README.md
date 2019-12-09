# zvue-h5-plugin README

vue项目的模板插件

## Features
1. 创建新功能
2. 在当前文件下添加新路由页面

## 创建（创建一个新的单页项目）
1. 在vue项目的pages文件夹右键 选择`‘创建 project’`
2. 输入新建文件夹名
3. 创建成功
4. router.js中的base需要自定义

## 添加新路由view
1. 在view文件夹右键 选择`'添加 view'`
2. 输入新建文件夹名
3. 输入新增路由需要的参数 不需要则直接回车
4. 添加成功
5. 添加页面meta需要手动写入

## 目录结构
```
├── project                     单页项目
│   ├──common
│   │   ├── filter.js           filter方法
│   │   └── index.js            通用方法
│   ├── components              共用组件
│   ├── constant
│   │   ├── index.js            常量集合
│   │   ├── route.js            路由（自动更新）
│   │   └── meta.js             路由meta（需手动写入）
│   ├── store
│   │   ├── index.js            store集合（自动更新）
│   │   ├── common.js           公共store
│   ├── view
│   │   ├── demo                一个单页一个文件夹
│   │   │   ├── api
│   │   │   │   ├── index.js        api文件
│   │   │   ├── components          组件
│   │   │   ├── store
│   │   │   │   ├── index.js
│   │   │   └── index.vue
│   ├── App.vue
│   ├── main.js
│   └── router.js
```

## ssr需要注意的代码
route文件

```
import { routes } from './constant/route';

Vue.use(Router);

routes.push({
  name: 'index',
  path: '*',
  redirect: {
    name: 'demo',
  }
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
```

store文件

```
// 总store文件中
export function createStore() {
  return new Vuex.Store({
    modules: {
      common,
      demo
    }
  })
}

//每个store文件中的state 需要函数返回值来初始化
const state = () => ({
    ...
});
```

main.js文件 客户端渲染和ssr降级时用到

```
import { createStore } from './store';
import { createRouter } from './router';

const router = createRouter();
const store = createStore();

// 初始化 Vue
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});
```
