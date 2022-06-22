<template>
  <div class="side-menu-setting">
    <div class="side-menu-setting-info">
      <i class="icon icf-CaretDown"></i>
      <span>{{ $t('unit.organization.list.side_bar.basic_information_settings')}}</span>
    </div>
    <div>
      {{ $t('unit.organization.list.side_bar.list_of_administrators')}}
    </div>
    <div>
      {{ $t('unit.organization.list.side_bar.master_setting')}}
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.side-menu-setting {
  margin-top: 24px;
  &-info {
    font-weight: 700;
    display: flex;
    align-items: center;
    span {
      margin-left: 12px;
    }
  }
  div {
    margin-top: 12px;
    cursor: pointer;
  }
}
</style>
