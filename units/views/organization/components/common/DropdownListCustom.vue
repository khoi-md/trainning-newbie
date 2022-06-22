<template>
  <div class="options-container" v-if="!hidden">
    <div v-for="option in options" :key="option.id" @mousedown.stop="select(option)">
      <div class="option">
        <Avatar :data="option" />
        <div class="name">{{ option.name }}</div>
        <div class="job_pos">{{ option.job_pos }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/units/components/common/Avatar'
import CheckboxSVG from '@/discovery/components/list/svg/CheckboxSVG'

export default ({
  name: 'DropdownListEmployee',
  components: {
    CheckboxSVG,
    Avatar,
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

    /deep/ .avatar-wrap {
      .avatar {
        height: 32px;
        width: 32px;
        .text {
          height: 32px;
          width: 32px;
        }
      }
    }

    .name {
      width: 280px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .job_pos {
      width: 160px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

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