<template>
  
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: '##name##',

  components: {},

  computed: {},

  mounted () {
    document.title = this.$route.meta.name || '';
  },

  methods: {}
};
</script>
