<template>
  <div class="side-menu-department">
    <div class="side-menu-department-group">
      <i class="icon icf-ListDashes"></i>
      <div>{{ $t('unit.organization.list.side_bar.organizational_reorganization_list') }}</div>
    </div>
    <div class="side-menu-department-part">
      {{ $t('unit.organization.list.side_bar.reorganization_registration') }}
    </div>
    <div class="side-menu-department-part">
      {{ $t('unit.organization.list.side_bar.bulk_registration') }}
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.side-menu-department {
  margin-top: 24px;
  border-bottom: 1px solid #dcdcdc;
  padding-bottom: 16px;
  &-part {
    margin-top: 12px;
    cursor: pointer;
  }
  &-group {
    display: flex;
    font-weight: 700;
    align-items: baseline;
    margin-top: 24px;
    gap: 4px;
    cursor: pointer;
    div {
      position: relative;
      top: -4px;
    }
  }
}
</style>
