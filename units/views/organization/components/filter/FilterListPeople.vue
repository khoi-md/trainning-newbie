<template>
  <a class="member">
    <MemberSVG />
    <span class="member-number">1</span>
  </a>
</template>

<script>
import MemberSVG from '@/discovery/components/list/svg/MemberSVG'

export default {
  components: {
    MemberSVG,
  }
}
</script>

<style lang="scss" scoped>
.member {
  border: 1px solid #dcdcdc;
  display: flex;
  width: 54px;
  height: 32px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 16px;

  &-number {
    position: relative;
    top: 3px;
    margin-left: 8px;
  }
}
</style>