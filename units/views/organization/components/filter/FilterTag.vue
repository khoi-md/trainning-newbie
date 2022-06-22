<template>
  <div class="tag">
    <div
      v-for="(item, index) of tagItems"
      :key="index"
      class="tag-item d-flex-between"
      :class="{ 'is-active': currentTag.key === item.key }"
      @click="changeTag(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import MemberSVG from '@/discovery/components/list/svg/MemberSVG'
import { isEqual } from 'lodash'
import i18n from '@/units/i18n'

export default {
  components: {
    MemberSVG,
  },
  props: {
    tagItems: {
      default: () => ([
        {
          key: 'all',
          name: i18n.t('unit.organization.list.tag.all'),
        },
        {
          key: i18n.t('unit.organization.list.tag.in_use'),
          name: i18n.t('unit.organization.list.tag.in_use'),
        },
        {
          key: i18n.t('unit.organization.list.tag.unused'),
          name: i18n.t('unit.organization.list.tag.unused'),
        },
        {
          key: i18n.t('unit.organization.list.tag.abolished'),
          name: i18n.t('unit.organization.list.tag.abolished'),
        },
        {
          key: i18n.t('unit.organization.list.tag.scheduled_abolished'),
          name: i18n.t('unit.organization.list.tag.scheduled_abolished'),
        },
      ]),
    },
    value: {},
  },
  watch: {
    value(val, oldVal) {
      if (isEqual(val, oldVal)) {
        this.currentTag = val
      }
    },
  },
  data() {
    return {
      currentTag: {
        key: 'department',
      },
    }
  },
  created() {
    if (this.value) {
      this.currentTag = this.value
    }
  },
  methods: {
    changeTag(item) {
      this.currentTag = item
      this.$emit('change', item)
    }
  },
}
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  &-item {
    height: 32px;
    width: 105px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    border: 1px solid #dcdcdc;
    border-right: none;
    &:last-child {
      border-right: 1px solid #dcdcdc;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &.is-active {
      background-color: #52606d;
      color: #fff;
    }
  }
}
</style>
