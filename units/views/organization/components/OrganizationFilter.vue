<template>
  <div class="filter">
    <div class="header">
      <div class="header-group">
        <div class="header-title">
          {{ $t('unit.organization.list.department_list') }}
        </div>
        <AddNewOrganization />
      </div>
      <!-- <div class="header-action">
        <FilterListPeople />
      </div> -->
    </div>

    <div class="header-search">
      <InputSearch v-model="name" />
    </div>

    <div class="tag-and-sort d-flex-between">
      <FilterTag @change="changeTag" :value="currentTag" />
      <FilterSort />
    </div>
  </div>
</template>

<script>
import FilterListPeople from './filter/FilterListPeople'
import FilterTag from './filter/FilterTag'
import FilterSort from './filter/FilterSort'
import AddNewOrganization from './action/AddNewOrganization'
import InputSearch from './action/InputSearch'

import i18n from '@/units/i18n'
import constants from '@/units/constants'
import { debounce } from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'OrganizationFilter',
  components: {
    FilterListPeople,
    FilterTag,
    FilterSort,
    AddNewOrganization,
    InputSearch,
  },
  data() {
    return {
      name: '',
      currentTag: {
        key: i18n.t('unit.organization.list.tag.in_use'),
      },
      constants: constants,
    }
  },
  watch: {
    name: debounce(function(e) {
      this.SET_SEARCH_NAME(e)
      this.SET_OFF_SET(0)
      this.setDepartmentList()
    }, 300),
  },
  computed: {
    ...mapGetters('organization', [
      'getPageSize',
      'getOffSet',
      'getSortStatus',
      'getSortFilter',
      'getSortInfo',
      'getCurrentSort',
    ]),
  },
  created() {
    this.SET_SORT_STATUS(i18n.t('unit.organization.list.tag.in_use'))
  },
  methods: {
    ...mapMutations('organization', [
      'SET_SEARCH_NAME',
      'SET_OFF_SET',
      'SET_SORT_STATUS',
      'SET_SORT_INFO',
    ]),
    ...mapActions('organization', ['setDepartmentList', 'configParamsWhenChangeTag']),
    changeTag(item) {
      this.currentTag = item
      this.SET_SORT_STATUS(item.key)
      this.SET_OFF_SET(0)
      this.configParamsWhenChangeTag()
      this.SET_SORT_INFO(`${this.getSortFilter[0].key}:${this.getSortFilter[0].type}`)
      this.setDepartmentList()
    },
  },
}
</script>

<style lang="scss" scoped></style>
