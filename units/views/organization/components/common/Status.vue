<template>
  <div class="status" :style="[boxActiveStyle]">
    <i :class="`icon icf-${iconFollowValue}`"></i>
    <span class="status-value">{{ value }}</span>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import constants from '@/units/constants/index'

export default {
  data() {
    return {
      constants: constants,
    }
  },
  props: {
    value: {
      type: [String, Number],
      require: true,
      default: 'test',
      index: 1,
    },
  },
  computed: {
    point() {
      if (typeof this.value == 'number') {
        return String(this.value)
      }
      return this.value ? this.value.toUpperCase() : ''
    },
    colorPoint() {
      let color = {
        avator: null,
        color: '#F86A6A',
      }

      if (this.value !== constants.ORGANIZATION.STATUS.UNUSED) {
        color.color = '#617D98'
      }

      return color?.color || '#C4C4C4'
    },
    iconFollowValue() {
      if (this.value === constants.ORGANIZATION.STATUS.INUSE) {
        return 'ClockClockwise'
      }
      if (this.value === constants.ORGANIZATION.STATUS.ABOLITION) {
        return 'FlagBanner'
      }
      return 'Clock'
    },
    hexToRgb() {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.colorPoint)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null
    },
    boxActiveStyle() {
      if (!this.hexToRgb) {
        return {}
      }
      const borderColor = `rgb(${this.hexToRgb.r}, ${this.hexToRgb.g}, ${this.hexToRgb.b})`
      const backgroundColor = `rgba(${this.hexToRgb.r}, ${this.hexToRgb.g}, ${this.hexToRgb.b},0.15)`

      let result = {
        'border-color': borderColor,
        'background-color': backgroundColor,
        color: borderColor,
      }

      return result
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  border: 1px solid;
  border-radius: 4px;
  gap: 4px;
  padding: 4px;
  width: 82px;
  white-space: nowrap;
  height: 32px;
}
</style>