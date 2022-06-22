<template>
  <div class="add" @click="clickButton">
    <AddPlusSVG color="#627D98" />
    <div class="add-name">{{ name }}</div>
  </div>
</template>

<script>
import AddPlusSVG from '@/discovery/components/list/svg/AddPlusSVG'
import constants from '@/units/constants'
import i18n from '@/units/i18n'

export default {
  props: {
    name: {
      default: i18n.t('unit.organization.detail.add_affliation_manager'),
    },
  },
  components: {
    AddPlusSVG,
  },
  data() {
    return {
      constants: constants,
    }
  },
  methods: {
    clickButton() {
      this.$emit('clickButton')
    },
  },
}
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  align-items: center;
  margin-left: 24px;
  cursor: pointer;

  /deep/ svg {
    top: 0;
  }

  &-name {
    margin-left: 8px;
  }
}
</style>