<template>
  <div class="unit">
    <router-view />
    <Loading />
    <ToastMessages />
    <div class="loading" v-if="loading">
      <img :src="`${company}css/app_share/images/cydas_loading_logo.gif`" class="image" />
    </div>
  </div>
</template>
<script>
import Loading from '@/share/components/Loading'
import ToastMessages from '@/share/components/ToastMessages.vue'
import { mapGetters } from 'vuex'
import mixin from '@/share/mixins/mixin'

export default {
  components: {
    Loading,
    ToastMessages,
  },
  mixins: [mixin],

  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters('share', {
      loading: 'loading',
    }),
    locale() {
      return this.$store.state['main-page'].myaccount?.locale
    },
  },
  watch: {
    locale: {
      immediate: true,
      handler(locale) {
        this.$i18n.locale = locale || 'ja'
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.unit {
  .loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0.5;
    img {
      height: 110px;
      width: 110px;
    }
  }
  /deep/ .content {
    background-color: #fff;
  }
}
@import '@/share/assets/scss/variables.scss';
</style>
