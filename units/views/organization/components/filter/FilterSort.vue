<template>
  <div class="action d-flex-between">
    <div class="sort">
      <SortTable :newOptions="getSortFilter" @onSortBy="onSortBy" :currentValue="getCurrentSort" />
    </div>
    <div class="page">
      <PageSize @changePageSize="changePageSize" />
    </div>
  </div>
</template>

<script>
import SortTable from '@/units/components/filters/SortTable.vue'
import PageSize from '@/units/components/filters/PageSize.vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    SortTable,
    PageSize,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('organization', [
      'getSortFilter',
      'getCurrentSort',
    ]),
  },
  methods: {
    ...mapMutations('organization', [
      'SET_SORT_INFO',
      'SET_PAGE_SIZE',
      'SET_OFF_SET',
      'SET_CURRENT_SORT',
    ]),
    ...mapActions('organization', ['setDepartmentList']),
    changePageSize(pageSize) {
      this.SET_PAGE_SIZE(pageSize)
      this.SET_OFF_SET(0)
      this.setDepartmentList()
    },
    async onSortBy(item) {
      const sortInfo = `${item.key}:${item.type}`
      this.SET_CURRENT_SORT(item)
      this.SET_SORT_INFO(sortInfo)
      this.SET_OFF_SET(0)
      await this.setDepartmentList()
      this.SET_CURRENT_SORT(item)
    },
  }
}
</script>

<style lang="scss" scoped>
.action {
  gap: 24px;
}
</style>