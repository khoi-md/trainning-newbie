<template>
  <div class="add" @click="goToCreate">
    <AddPlusSVG color="#627D98" />
    <div class="add-name">{{ $t('unit.organization.list.register_a_department')}}</div>
  </div>
</template>

<script>
import AddPlusSVG from '@/discovery/components/list/svg/AddPlusSVG'
import constants from '@/units/constants'

export default {
  components: {
    AddPlusSVG,
  },
  data() {
    return {
      constants: constants,
    }
  },
  methods: {
    goToCreate() {
      this.$router.push({ name: constants.ROUTESNAME.UNIT_CREATE })
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