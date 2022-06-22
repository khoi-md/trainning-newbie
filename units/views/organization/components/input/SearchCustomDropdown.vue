<template>
  <div class="wrap">
    <i class="icon icf-magnifier"></i>
    <div v-if="multiple" class="badge-group">
      <template v-for="(item, index) in selectedList">
        <div :key="index" class="badge">
          <span class="badge-name">{{ item.name }}</span>
          <span>
            <a @click="deleteSelected(item, index)"> × </a>
          </span>
        </div>
      </template>
    </div>
    <div v-if="addBadge" class="badge-group">
      <div class="badge">
        <span class="badge-name">{{ addBadge }}</span>
        <span>
          <a @click="deleteBadge"> × </a>
        </span>
      </div>
    </div>
    <div class="wrap-input" @click="clickOpenDropdown">
    </div>
    <input
      v-model="content"
      ref="searchCustomDropDown"
      class="input-search"
      :class="{ classInput, havePlaceholderWhenHaveData: hidePlaceholder }"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="onKeydownEnter"
    />
    <div v-if="error" class="error">
      {{ errorMessage }}
    </div>
    <template v-if="useVisibleExternal">
      <DropdownListCustom
        v-show="isVisibleExternal"
        :class="classDropdown"
        :options="newOptions"
        @select="select"
      />
    </template>

    <template v-else>
      <DropdownListCustom
        v-show="isVisible"
        :class="classDropdown"
        :options="newOptions"
        @select="select"
      />
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import DropdownListCustom from '../common/DropdownListCustom'
import ClickOutside from 'vue-click-outside'
import { debounce, includes, isEqual, uniqBy, differenceBy } from 'lodash'
import { mapGetters } from 'vuex'

const request = axios.create({
  withCredentials: true,
})

export default {
  name: 'InputSelect',
  components: {
    DropdownListCustom,
  },
  directives: {
    ClickOutside,
  },
  props: {
    options: {
      default: () => [],
      required: false,
    },
    value: {
      default: '',
      required: true,
    },
    isVisibleExternal: {
      default: false,
    },
    handleVisibleList: {
      default: () => {},
    },
    classDropdown: {
      default: '',
    },
    placeholder: {
      default: '',
    },
    haveIcon: {
      default: true,
    },
    useVisibleExternal: {
      default: false,
    },
    error: {
      default: false,
    },
    multiple: {
      default: false,
    },
    addBadge: {
      default: '',
    },
    classInput: {
      default: '',
    },
    havePlaceholderWhenHaveData: {
      default: false,
    },
    propertyId: {
      default: 'id',
    },
    dataSelected: {
      default: () => [],
    },
    searchByAPI: {
      default: false,
    },
  },
  data() {
    return {
      content: this.value,
      newOptions: this.options,
      isVisible: false,
      errorMessage: '',
      selectedList: [],
    }
  },
  computed: {
    ...mapGetters('share', ['loading']),
    hidePlaceholder() {
      return this.selectedList && this.selectedList.length > 0 ? true : false
    },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.content = val
      }
    },
    options: {
      handler(val, oldVal) {
        if (!isEqual(val, oldVal)) {
          this.newOptions = val
          if (this.selectedList && this.selectedList.length) {
            this.newOptions = differenceBy(this.newOptions, this.selectedList, 'id')
          }
        }
      },
      deep: true,
    },
    selectedList: {
      handler(val) {
        this.$emit('selected', val)
      },
      deep: true,
    },
    dataSelected: {
      handler(val) {
        if (val) {
          this.selectedList = val
        }
      },
      deep: true,
    },
  },
  methods: {
    select(option) {
      this.content = ''
      this.$emit('select', option)
      if (!this.multiple) {
        this.content = option.name
        if (this.addBadge) {
          this.$emit('input', '')
        }
        return
      }

      const selectedListIndex = this.selectedList ? this.selectedList.findIndex((el) => el.id === option.id) : -1
      const itemOptionIndex = this.newOptions.findIndex((el) => el.id === option.id)

      if (selectedListIndex < 0) {
        this.selectedList.push(option)
        this.newOptions.splice(itemOptionIndex, 1)
      } else {
        this.deleteSelected(option, selectedListIndex)
      }
      this.newOptions = uniqBy(this.newOptions, 'id')
    },
    deleteSelected(option, index) {
      this.newOptions.push(option)
      this.selectedList.splice(index, 1)
    },
    deleteBadge() {
      this.$emit('deleteBadge')
    },
    onFocus() {
      this.isVisible = true
      this.$emit('focus')
    },
    onBlur() {
      this.isVisible = false
      this.$emit('blur')
    },
    onKeydownEnter(e) {
      this.$emit(
        'keydown',
        new KeyboardEvent('keydown', {
          keyCode: 13,
        }),
      )
    },
    handleInput(e) {
      this.$emit('input', e.target.value)
      if (this.options && this.options.length && !this.searchByAPI) {
        this.newOptions = this.options.filter((el) => includes(el.name, e.target.value))
        return
      }
    },
    clickOpenDropdown() {
      this.$refs.searchCustomDropDown.focus()
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  background: #fff;
  border: 1px solid #999999;
  border-radius: 4px;
  width: auto;
  min-height: 40px;
  height: auto;
  padding: 0 10px;
  margin-top: 8px;
  position: relative;
  display: flex;
  align-items: center;

  &-input {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    cursor: text;
  }

  .input {
    display: inline-block;
    margin-top: unset !important;
    margin-left: -5px;
    padding-left: 10px;
    height: 40px;
    font-size: 14px;
    color: #333333;
    width: calc(100% - 12px);
    background: #ffffff;
    border: none;
    outline: none;
    &-disabled {
      border: none;
      background-color: #f8f8f8;
    }

    &-search {
      padding-left: 4px;
      border: none;
      width: 100%;
      min-width: 120px;
      font-weight: normal;
      &:focus-visible {
        outline: none;
      }
    }
  }

  .vector {
    border : none;
    background : none;
    position: absolute;
    top: 0px;
    right: 20px;
    color: #666666;
    pointer-events: none;
    ::before {
      font-size: 40px;
    }
  }

  .dropdown-list {
    position: absolute;
    width: 100%;
    overflow: auto;
    max-height: 400px;
    z-index: 10;
    top: 100%;
    margin-left: -10px;
    /deep/ .option {
      .value {
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .badge-group {
    display: inline-flex;
  }

  .badge {
    background: #f0f4f8;
    margin: 4px 0;
    color: #627d98;
    border: 1px solid #dcdcdc;
    padding: 8px;
    border-radius: 4px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    margin-right: 8px;
    position: relative;
    z-index: 2;
    &-name {
      margin-right: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 160px;
    }
    a {
      color: #627d98;
      font-weight: 700;
    }
  }

  .options-container {
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    z-index: 9;
  }

  .havePlaceholderWhenHaveData::placeholder {
    color: transparent;
  }
}
</style>
