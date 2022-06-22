<template>
  <div>
    <div class="side-menu-top-group">
      <TreeUserSVG />
      <div>{{ $t('unit.organization.list.side_bar.organization_management') }}</div>
    </div>
    <div
      class="side-menu-top-list"
      :class="{ active: routeName === constants.ROUTESNAME.UNIT_LIST }"
      @click="goToRouter(constants.ROUTESNAME.UNIT_LIST)"
    >
      <i class="icon icf-ListDashes"></i>
      <div>{{ $t('unit.organization.list.department_list') }}</div>
    </div>
    <div
      class="side-menu-top-part"
      :class="{ active: routeName === constants.ROUTESNAME.UNIT_DETAIL || routeName === constants.ROUTESNAME.UNIT_CREATE}"
      @click="goToRouter(constants.ROUTESNAME.UNIT_CREATE)"
    >
      {{ $t('unit.organization.list.side_bar.department_register') }}
    </div>
    <div class="side-menu-top-part">{{ $t('unit.organization.list.side_bar.bulk_registration') }}</div>
  </div>
</template>

<script>
import TreeUserSVG from '@/units/components/svg/TreeUserSVG'
import constants from '@/units/constants/index'

export default {
  components: {
    TreeUserSVG,
  },
  data() {
    return {
      constants: constants,
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
  },
  methods: {
    goToRouter(item) {
      if (this.routeName === item) {
        return
      }

      if (this.routeName === constants.ROUTESNAME.UNIT_DETAIL
        && item === constants.ROUTESNAME.UNIT_CREATE
      ) {
        return
      }

      this.$router.push({ name: item })
    },
  },
}
</script>

<style lang="scss" scoped>
.side-menu-top {
  &-group {
    display: flex;
    font-weight: 700;
    gap: 4px;
  }
  &-list {
    display: flex;
    font-weight: 700;
    align-items: baseline;
    cursor: pointer;
    margin-top: 24px;
    gap: 4px;
    div {
      position: relative;
      top: -4px;
    }

    &.active {
      color: #007BC3;
      font-weight: 700;
    }
  }
  &-part {
    margin-top: 16px;
    margin-bottom: 16px;
    cursor: pointer;
    &:last-child {
      padding-bottom: 16px;
      border-bottom: 1px solid #dcdcdc;
    }
    
    &.active {
      color: #007BC3;
      font-weight: 700;
    }
  }
}
</style>
