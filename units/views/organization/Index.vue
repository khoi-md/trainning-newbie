<template>
  <div id="unit-organization-list">
    <OrganizationFilter />
    <OrganizationTable />
  </div>
</template>

<script>
import OrganizationFilter from './components/OrganizationFilter'
import OrganizationTable from './components/OrganizationTable'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import i18n from '@/units/i18n'

export default {
  name: 'unit-organization',
  components: {
    OrganizationFilter,
    OrganizationTable,
  },
  created() {
    this.resetData()
    this.SET_SORT_STATUS(i18n.t('unit.organization.list.tag.in_use'))
    this.setDepartmentList()
  },
  computed: {
    ...mapGetters('organization', ['getListEmployee']),
  },
  methods: {
    ...mapMutations('organization', ['SET_SORT_STATUS']),
    ...mapActions('organization', ['setDepartmentList', 'resetData']),
  },
}
</script>

<style lang="scss" scoped></style>
