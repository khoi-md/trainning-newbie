<template>
  <div class="table-footer">
    <div>
      {{ $t('unit.organization.list.paging', {
        totalRecord, start, end
      }) }}
    </div>
    <div
      class="button prev"
      @click="prevPage"
      :disable="currentPage == 0"
      :class="{ disabled: currentPage == 0 }"
    >
      <i class="icon icf-chevron-left"></i>
    </div>
    <div
      class="button next"
      @click="nextPage"
      :disable="end >= totalRecord - 1"
      :class="{ disabled: end >= totalRecord - 1 }"
    >
      <i class="icon icf-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFooter',
  props: {
    currentPage: { type: Number },
    start: { type: Number },
    end: { type: Number },
    totalRecord: { type: Number },
  },
  methods: {
    prevPage() {
      this.$emit('prevPage')
    },
    nextPage() {
      this.$emit('nextPage')
    },
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
.table-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 15px;
  border-top: 1px solid #dcdcdc;
  gap: 5px;
}
.button {
  cursor: pointer;

  &.disabled {
    opacity: 0;
    cursor: default;
  }
}
</style>
