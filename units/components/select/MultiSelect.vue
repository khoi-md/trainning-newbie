<template>
  <div
    class="multi-select"
    :id="id"
    :class="['anchor-search', isFocusClass]"
    :style="{ border: hasSearch ? '' : 'none' }"
    v-click-outside="onClickOutside"
  >
    <div v-if="hasSearch" class="search-icon">
      <SearchIcon />
    </div>
    <div class="list-selected" @click="onFocusSearch">
      <div
        class="selected-item"
        v-for="(item, index) in optionHaveDataSelected"
        :key="index"
      >
        <div :title="item[keyName]">{{ item[keyName] }}</div>
        <div class="close-icon" @click="handleDeleteItem(item)">
          <CloseIconBold />
        </div>
      </div>
      <div v-if="hasSearch" class="d-flex search-input" :style="{ flex: '1 1 0%' }">
        <input
          type="text"
          :placeholder="!value.length && !optionHaveDataSelected.length ? placeholder : ''"
          :readonly="disabled"
          v-model="textSearch"
          @input="onSearchItem"
          @focus="onFocusSearch"
          :class="[isFocusClass]"
        />
        <div class="icon-dropdown" v-show="!hideIcon" @click="onFocusSearch">
          <CaretDownBold />
        </div>
      </div>
    </div>
    <div id="listOption" class="list-option" v-show="toggleOptions">
      <div
        v-for="(option, indexOption) in optionsRender"
        :key="indexOption"
        class="list-option__element"
        :class="{ selected: onSelected(option) }"
        @click="handleSelected(option)"
        :title="option[keyName]"
      >
        {{ option[keyName] }}
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import CloseIconBold from '@/share/components/icons/CloseIconBold.vue'
import SearchIcon from '@/share/components/icons/SearchIcon.vue'
import CaretDownBold from '@/share/components/icons/CaretDownBold.vue'
import { unionBy, compact } from 'lodash'

export default {
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
    },
    keyId: {
      type: String,
      default: 'id',
    },
    keyName: {
      type: String,
      default: 'value',
    },
    id: {
      type: String,
      default: 'multiSelect',
    },
    hasSearch: {
      type: Boolean,
      default: true,
    },
    onlySelectOne: {
      type: Boolean,
      default: false,
    },
    hasSearchAPI: {
      type: Boolean,
      default: false,
    },
    dataSelected: {
      default: () => [],
    },
    hideIcon: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CloseIconBold,
    SearchIcon,
    CaretDownBold,
  },
  data() {
    return {
      listSelected: [],
      optionsRender: [],
      textSearch: '',
      toggleOptions: false,
      isFocus: false,
    }
  },
  created() {
    this.listSelected = JSON.parse(JSON.stringify(this.value)) || []
    this.optionsRender = JSON.parse(JSON.stringify(this.options))
    
    if (this.dataSelected) {
      this.listSelected = this.dataSelected.map(el => el.id)
    }
  },
  watch: {
    value() {
      this.listSelected = JSON.parse(JSON.stringify(this.value))
    },
    options() {
      this.optionsRender = JSON.parse(JSON.stringify(this.options))
    },
    dataSelected: {
      handler(val) {
        if (val) {
          this.listSelected = val.map(el => el.id)
        }
      },
      deep: true,
    },
  },
  computed: {
    isFocusClass() {
      return this.isFocus ? 'multi-select--focus' : null
    },
    isCheckInput() {
      return this.options.length === 0
    },
    optionHaveDataSelected() {
      let newOptions = this.options

      if (this.dataSelected && this.dataSelected.length) {
        newOptions = unionBy(this.options, this.dataSelected, 'id')
      }

      return newOptions.filter(e => this.listSelected.includes(e[this.keyId]))
    },
  },
  mounted() {
    setTimeout(() => {
      this.setPositionOptions()
    }, 1)
  },
  methods: {
    setPositionOptions() {
      const domParent = document.getElementById(this.id)
      const listOption = document.querySelectorAll(`#${this.id} #listOption`)
      if (listOption && listOption[0]) {
        listOption[0].style.top = domParent.offsetHeight + 'px'
      }
    },
    handleSelected(option) {
      const listId = this.listSelected
      // remove item selected
      if (listId.includes(option[this.keyId])) {
        const index = listId.indexOf(option[this.keyId])
        // case only select one
        if (this.onlySelectOne) {
          this.listSelected = []
          this.toggleOptions = false
        } else this.listSelected.splice(index, 1)
      }
      // add item selected
      else {
        // case only select one
        if (this.onlySelectOne) {
          this.listSelected = [option[this.keyId]]
          this.toggleOptions = false
        } else this.listSelected.push(option[this.keyId])
      }
      this.textSearch = ''
      setTimeout(() => {
        this.setPositionOptions()
      }, 1)

      const selectedData = this.optionsRender.map(op => {
        const index = this.listSelected.findIndex(el => el === op.id)
        if (index > -1) {
          return {
            id: op.id,
            name: op.name,
          }
        }
      })
      
      this.$emit('change', compact(selectedData))
    },
    onSelected(option) {
      if (!this.listSelected?.length) return false
      return this.listSelected.includes(option[this.keyId])
    },
    onSearchItem(e) {
      if (!e.target.value) {
        this.optionsRender = this.options
      }
      
      if (!this.hasSearchAPI) {
        this.optionsRender = this.options.filter(item =>
          item[this.keyName].includes(e.target.value),
        )
        return
      }

      this.$emit('search', e.target.value)
    },
    onFocusSearch() {
      if (!this.hasSearch) return
      this.isFocus = true
      this.toggleOptions = true
      setTimeout(() => {
        this.setPositionOptions()
      }, 1)
    },
    onClickOutside() {
      this.isShowListSearch = false
      this.toggleOptions = false
      this.isFocus = false
      setTimeout(() => {
        this.setPositionOptions()
      }, 1)
    },
    handleDeleteItem(optionSelected) {
      const listId = this.listSelected
      // remove item selected
      if (listId.includes(optionSelected[this.keyId])) {
        const index = listId.indexOf(optionSelected[this.keyId])
        this.listSelected.splice(index, 1)
      }

      const selectedData = this.optionsRender.map(op => {
        const index = this.listSelected.findIndex(el => el === op.id)
        if (index > -1) {
          return {
            id: op.id,
            name: op.name,
          }
        }
      })
      
      this.$emit('change', compact(selectedData))
      setTimeout(() => {
        this.setPositionOptions()
      }, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.multi-select {
  position: relative;
  min-height: 40px;
  padding: 3px 12px;
  .selected {
    background: #627d98;
    color: #fff;
  }
  .list-option {
    background: #f0f4f8;
    color: #617d98;
    font-size: 12px;
    left: 0;
    padding: 10px 0;
    position: absolute;
    top: 40px;
    width: 100%;
    z-index: 1;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    max-height: 200px;
    overflow: auto;
    &__element {
      padding: 10px 40px;
      height: 36px;
      min-height: 36px;
      cursor: pointer;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;
      white-space: nowrap;
      &:hover {
        background: #627d98;
        color: #fff;
      }
    }
  }
  &--focus {
    background-color: #f0f4f8 !important;
    color: #486581;
  }
  .list-selected {
    display: flex;
    flex-wrap: wrap;
    .search-input {
      min-width: 168px;
      display: inline-block;
      input {
        min-width: 168px;
        min-height: 32px;
        height: 32px;
      }
    }
  }
}
.anchor-search {
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  max-width: 100%;
  padding: 4px 12px 0;
  display: flex;
  gap: 14px;
  position: relative;
  &--on {
    border-color: #999999;
    background: #f0f4f8;
    input {
      background: #f0f4f8;
    }
  }
  input {
    border: none;
    height: unset;
    padding-left: unset;
  }
  .list-selected {
    .selected-item {
      background: #f0f4f8;
      border-radius: 4px;
      display: flex;
      padding: 6px 12px 6px 8px;
      gap: 8px;
      align-items: center;
      color: #627d98;
      font-size: 14px;
      display: inline-flex;
      margin-right: 8px;
      margin-bottom: 4px;
      border: 1px solid #dbdbdb;
      height: 32px;
      max-width: 100%;
      div {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        -webkit-line-clamp: 1 !important;
        -webkit-box-orient: vertical !important;
        white-space: nowrap;
        @media screen and (max-width: 1432px) {
          max-width: 200px;
        }
      }
      .close-icon {
        align-items: center;
        cursor: pointer;
        display: flex;
        margin-top: 2px;
        width: max-content;
      }
    }
  }
}
.d-flex {
  display: flex;
}
.search-icon {
  width: 24px;
  height: 24px;
  margin-top: 3px;
}
</style>

<style lang="scss" scoped>
@import 'cydas-people-uikit/src/styles/variables.scss';
.employee-search-spinner {
  color: $mediumGrey;
  font-size: 24px;
  margin-top: -12px;
  position: absolute;
  top: 50%;
  right: 4px;
  z-index: 1;
  animation-name: kurukuru;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: linear;
}
@keyframes kurukuru {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.icon-dropdown {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 18px;
  top: 0;
}
</style>
