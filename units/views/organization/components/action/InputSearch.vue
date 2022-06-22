<template>
  <div class="search">
    <span class="searchIcon">
      <div class="cp-icon-search"></div>
    </span>
    <input
      type="text"
      class="search-input"
      :value="search"
      @input="handleInput"
      :placeholder="$t('unit.organization.list.placeholder.search')"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'InputSearch',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      search: '',
    }
  },
  watch: {
    value(val) {
      if (this.search !== val) {
        this.search = val
      }
    },
  },
  methods: {
    handleInput(event) {
      this.search = event.target.value
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  border: none;
  &-input {
    padding-left: 36px;
    height: 40px;
    border-radius: 4px;
  }
  .searchIcon {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    .cp-icon-search {
      font-size: 24px;
    }
  }
}
</style>
