import mapKeysToCamelCase from 'zan-utils/string/mapKeysToCamelCase';

const global = window._global && mapKeysToCamelCase(window._global); // eslint-disable-line
const kdtId = global.kdtId; // eslint-disable-line
const buyerInfo = get(global, 'buyer', {});

export {
  kdtId,
  buyerInfo
};
