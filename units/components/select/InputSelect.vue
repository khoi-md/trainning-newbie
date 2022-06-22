<template>
  <div class="wrap">
    <input
      v-model="content"
      class="input"
      :placeholder="placeholder"
      :readonly="disabledSearch"
      :class="{ pointer: disabledSearch, 'input-disabled': disabled }"
      :disabled="disabled"
      @input="handleInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter="onKeydownEnter"
    />
    <i v-if="haveIcon" class="icf-CaretDown vector"></i>
    <template v-if="useVisibleExternal">
      <DropdownList
        v-show="isVisibleExternal"
        :class="classDropdown"
        :options="newOptions"
        @select="select"
      />
    </template>

    <template v-else>
      <DropdownList
        v-show="isVisible"
        :class="classDropdown"
        :options="newOptions"
        @select="select"
      />
    </template>
  </div>
</template>

<script>
import DropdownList from '@/units/components/common/DropdownList'
import CaretDownSVG from '@/discovery/components/list/svg/CaretDownSVG'
import ClickOutside from 'vue-click-outside'
import { includes, isEqual } from 'lodash'

export default {
  name: 'InputSelect',
  components: {
    DropdownList,
    CaretDownSVG,
  },
  directives: {
    ClickOutside,
  },
  props: {
    options: {
      default: () => [],
      required: true,
    },
    value: {
      default: '',
      required: true
    },
    isVisibleExternal: {
      default: false,
    },
    handleVisibleList: {
      default: () => {},
    },
    inputClass: {
      default: ''
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
    disabledSearch: {
      default: false,
    },
    disabled: {
      default: false,
    },
  },
  data() {
    return {
      content: this.value,
      newOptions: this.options,
      isVisible: false
    }
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
        }
      },
      deep: true
    },
  },
  created() {
    if (this.options && this.value) {
      const index = this.options.findIndex(el => el.id === this.value)
      if (index > -1) {
        this.content = this.select(this.options[index])
      }
    }
  },
  methods: {
    select(option) {
      this.$emit('input', option.name)
      this.$emit('select', option)
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
      this.$emit('keydown', new KeyboardEvent('keydown', {
        keyCode: 13
      }))
    },
    handleInput(e) {
      this.newOptions = this.options.filter(el => includes(el.name, e.target.value))
      this.$emit('input', e.target.value)
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 544px;
  .input {
    padding-left: 8px;
    width: calc(100% - 12px);
    background: #ffffff;
    border: 1px solid #999999;
    box-sizing: border-box;
    border-radius: 4px;
    height: 36px;
    &-disabled {
      border: none;
      background-color: #f8f8f8;
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
    &::before {
      font-size: 40px;
    }
  }

  .dropdown-list {
    position: absolute;
    width: calc(100% - 12px);
    overflow: auto;
    max-height: 400px;
    z-index: 10;
    .value {
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }

  .pointer {
    cursor: pointer;
  }
}
</style>
