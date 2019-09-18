import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import demo from '../view/order/store/index';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    modules: {
      common,
      demo
    }
  })
}
