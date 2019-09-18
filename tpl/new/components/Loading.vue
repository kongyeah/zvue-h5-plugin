<template>
  <div class="loading">
    <van-loading />
  </div>
</template>

<script>
import { Loading } from 'vant';

export default {
  name: 'loading',

  components: {
    [Loading.name]: Loading
  }
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  padding: 30px 0;
  justify-content: center;
}
</style>
