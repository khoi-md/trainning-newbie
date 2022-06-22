<template>
  <div class="table-options" v-click-outside="hideDropdown">
    <div class="button" @click="showDropdown">
      <span>{{ pageSize }}件</span>
      <i class="icon  icf-chevron-down"></i>
    </div>
    <div class="dropdown" v-show="isShowDropdown">
      <div
        class="item"
        v-for="(item, typeIndex) in options"
        :key="typeIndex"
        @click="setPageSize(item)"
      >
        <span>{{ item.value }}件</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      isShowDropdown: false,
      pageSize: 10,
      options: [
        {
          value: 10,
        },
        {
          value: 20,
        },
        {
          value: 50,
        },
        {
          value: 100,
        },
      ],
    }
  },
  methods: {
    ...mapMutations('organization', ['SET_PAGE_SIZE']),
    setPageSize(item) {
      this.pageSize = item.value
      this.SET_PAGE_SIZE(item.value)
      this.$emit('changePageSize', item.value)
      this.hideDropdown()
    },
    onExport() {
      this.hideDropdown()
    },
    showDropdown() {
      this.isShowDropdown = true
    },
    hideDropdown() {
      this.isShowDropdown = false
    },
  },
}
</script>
<style lang="scss" scoped>
.table-options {
  display: flex;
  position: relative;
}
.button {
  height: 32px;
  align-items: center;
  display: flex;
  gap: 4px;
  cursor: pointer;
  .icon {
    margin-left: 4px;
  }
}
.dropdown {
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  min-width: 75px;
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    color: #666;
    text-align: center;
    padding: 0 15px;

    &:hover {
      background: #627d98;
      color: white;
    }
  }
}
.icon {
  height: 24px;
  min-width: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  i:before {
    font-size: 24px;
  }
}
.icf-chevron-down:before {
  font-size: 32px;
}
</style>
