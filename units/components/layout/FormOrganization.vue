<template>
  <div class="form">
    <div class="form-group">
      <div class="title">{{ title }}</div>
      <slot></slot>
    </div>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      default: 'department',
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  border: 1px solid #dcdcdc;
  border-radius: 4px;

  &-group {
    padding: 20px 32px;

    .title {
      background: #f8f8f8;
      border-radius: 4px;
      height: 48px;
      font-size: 18px;
      line-height: 26px;
      color: #333;
      padding: 12px;
    }
  }
}
</style>
