import { routeMeta } from './meta';

const routes = [
  {
    name: 'demo',
    path: '/demo',
    component: () => import(/* webpackChunkName: 'resource/demo' */'../view/demo'),
    meta: routeMeta["demo"] || {}
  }
];

export {
  routes
};
