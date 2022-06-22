<template>
  <div class="table-options" v-click-outside="hideDropdown">
    <div class="button" @click="showDropdown">
      <div class="icon">
        <i v-if="currentSort.type == 'asc'" class="icf-SortDescending" />
        <i class="icf-SortAscending" v-else />
      </div>
      <span>{{ currentSort.label }}</span>
      <i class="icon icf-chevron-down"></i>
    </div>
    <div class="dropdown" v-show="isShowDropdown">
      <div class="item" v-for="(item, typeIndex) in currentOptions" :key="typeIndex" @click="sortBy(item)">
        <div class="icon">
          <i v-if="item.type == 'asc'" class="icf-SortDescending" />
          <i class="icf-SortAscending" v-else />
        </div>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { isEqual } from 'lodash'

export default {
  props: ['newOptions', 'currentValue'],
  data() {
    return {
      isShowDropdown: false,
      currentSort: {
        key: 'last_updated',
        type: 'desc',
        label: '最終更新日',
      },
      options: [
        {
          key: 'last_updated',
          type: 'asc',
          label: '最終更新日',
        },
        {
          key: 'employee_number',
          type: 'desc',
          label: '部署コード',
        },
        {
          key: 'department_code',
          type: 'desc',
          label: '部署名',
        },
        {
          key: 'department_code',
          type: 'asc',
          label: '部署名',
        },
      ],
    }
  },
  computed: {
    currentOptions() {
      return this.newOptions ? this.newOptions : this.options
    },
  },
  watch: {
    currentValue: {
      handler(val, oldVal) {
        if (!isEqual(val, oldVal)){
          this.currentSort = val
        }
      },
      deep: true,
    }
  },
  methods: {
    sortBy(item) {
      this.$emit('onSortBy', item)
      this.currentSort = item
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
  background: #f1f5f8;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  width: 188px;
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  background: #f1f5f8;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  .item {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    color: #666;

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
