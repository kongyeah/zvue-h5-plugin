<template>
  <loading v-if="loading" />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Loading from './components/Loading';

export default {
  name: '##name##',

  components: {
    [Loading.name]: Loading
  },

  computed: {},

  created() {},

  mounted () {
    document.title = this.$route.meta.name || '';
  },

  methods: {}
};
</script>
