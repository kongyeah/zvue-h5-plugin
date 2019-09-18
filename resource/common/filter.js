import Vue from 'vue';
import fullfillImage from 'zan-utils/fullfillImage';
import format from 'zan-utils/money/format';
import formatDate from 'zan-utils/date/formatDate';

const filter = {
  formatMoney: value => format(value, true, false),
  formatMoneyNotZero: value => +format(value, true, false),
  formatImg: (url, size) => {
    const imgSize = size || '!100x100.jpg';
    return fullfillImage(url, imgSize);
  },
  formatAvatar: url => {
    if (!url) return 'https://img.yzcdn.cn/upload_files/avatar.png';
    return url;
  },
  formatTime: time => formatDate(time, 'YYYY-MM-DD HH:mm:ss')
};

const vueFilter = () => {
  Object.keys(filter).forEach((key) => Vue.filter(key, filter[key]));
};

export { vueFilter };
