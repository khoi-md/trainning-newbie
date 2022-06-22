<template>
  <div class="options-container" v-if="!hidden">
    <div v-for="option in options" :key="option.id" @mousedown.stop="select(option)">
      <div class="option">
        <span class="value">{{ option.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxSVG from '@/discovery/components/list/svg/CheckboxSVG'

export default ({
  name: 'DropdownListEmployee',
  components: {
    CheckboxSVG,
  },
  props: {
    options: {
      default: () => [],
      required: true,
    },
    hidden: {
      default: false,
    },
  },
  methods: {
    select(option) {
      this.$emit('select', option)
    },
    checked(option) {
      if (this.itemSelected.find(el => el.id === option.id)) {
        return true
      }
      return false
    }
  },
})
</script>

<style scoped lang="scss">
@import 'cydas-people-uikit/src/styles/variables.scss';

.options-container {
  @include base();
  @include dropShadow($objectLow);
  color: $darkGrey;
  font-size: $mediumFontSize;
  background-color: $white;
  z-index: 1;

  .option {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    white-space: nowrap;
    justify-content: space-between;
    .value {
      padding-left: 7px;
    }

    &:hover {
      background-color: #515e89;
      color: #fff;
    }
    &.checked {
      font-style: italic;
    }

    &-checked {
      margin-right: 12px;
      width: 32px;
      height: 32px;
    }
  }
}
</style>