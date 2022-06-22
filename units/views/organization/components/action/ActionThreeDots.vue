<template>
  <div class="header-options" v-click-outside="hideDropdown">
    <div class="button" @click="showDropdown">
      <i class="icon icf-DotsThree"></i>
    </div>
    <div class="dropdown" v-show="isShowDropdown">
      <div
        class="item"
        v-for="(item, index) in options"
        :key="index"
        @click="selectDropdown(item)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    options: {
      default: () => [
        {
          key: '',
          name: '',
          value: '',
        },
      ],
    }
  },
  data() {
    return {
      isShowDropdown: false,
    }
  },
  methods: {
    selectDropdown(item) {
      this.$emit('select', item)
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
.header-options {
  display: flex;
  position: relative;

  .icf-DotsThree::before {
    background: #f2f2f2;
    color: #333;
    border: 1px solid #f2f2f2;
    border-radius: 50%;
    position: relative;
    left: -1.25px;
    top: 0.5px;
  }
}
.button {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  min-width: 32px;
  align-items: center;
  justify-content: center;
  background: #617d98;
  color: white;
  cursor: pointer;
}
.dropdown {
  background: #f1f5f8;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  width: 188px;
  position: absolute;
  z-index: 2;
  right: 120%;
  top: 0;
  background: #f1f5f8;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  z-index: 2;
  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    color: #666;
    span {
      display: inline-block;
      white-space: nowrap;

      padding-right: 10px;
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &:hover {
      background: #627d98;
      color: white;
    }
  }
}
</style>
