<template>
  <tr>
    <th
      v-for="(item, index) in optionsHeader"
      :key="index"
      :style="{
        width: item.width,
        minWidth: item.width === '115px' ? item.width : 'unset',
        display: conditionChangeValue(item) ? 'none' : 'table-cell',
      }"
    >
      <span v-if="!conditionChangeValue(item)">{{ item.label }}</span>
    </th>
  </tr>
</template>
<script>
import { mapGetters } from 'vuex'
import constants from '@/units/constants'

export default {
  data() {
    return {
      constants: constants,
    }
  },
  props: {
    optionsHeader: {
      default: () => constants.ORGANIZATIONTABLE.tableHeader,
      required: true,
    },
  },
  computed: {
    ...mapGetters('organization', ['getSortStatus']),
  },

  methods: {
    conditionChangeValue(item) {
      return (
        item.key === 'last_updated' &&
        this.getSortStatus === constants.ORGANIZATION.STATUS.ABOLITION
      )
    },
  },
}
</script>
<style lang="scss" scoped>
th {
  border-radius: 0px 4px 0px 0px;
  padding: 12px;
  border: 2px solid #e4e7eb;
  font-weight: 400;
  font-size: 18px;
  color: #333;
  border-left: 0;
  border-right: 0;
  text-align: left;
}
</style>
