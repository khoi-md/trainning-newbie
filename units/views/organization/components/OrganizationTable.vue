<template>
  <div class="table-wrapper">
    <table class="table-organization">
      <thead class="table-thead">
        <TableHeader :optionsHeader="constants.ORGANIZATIONTABLE.tableHeader" />
      </thead>
      <tbody v-if="hasData">
        <TableRow
          v-for="(employee, index) in getListEmployee"
          :key="`${employee.uuid}-${index}`"
          :employee="employee"
          :value="employee"
        />
      </tbody>

      <tbody v-else>
        <tr class="table_no_content-body-tr">
          <td class="table_no_content-body-td" colspan="5">
            <NoContentSVG />
            <div class="description">{{ $t('unit.organization.list.no_content.description') }}</div>
            <div @click="goToCreate" class="btn btn-register">
              {{ $t('unit.organization.list.button.register') }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <TableFooter
      v-if="hasData"
      :currentPage="currentPage"
      :start="start"
      :end="end"
      :totalRecord="totalRecord"
      @prevPage="prevPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import TableHeader from './table/TableHeader'
import TableFooter from './table/TableFooter'
import TableRow from './table/TableRow'
import NoContentSVG from '@/units/components/svg/NoContentSVG'

import { mapGetters, mapActions, mapMutations } from 'vuex'
import { chunk } from 'lodash'
import constants from '@/units/constants/index'

export default {
  name: 'OrganizationTable',
  components: {
    TableHeader,
    TableFooter,
    TableRow,
    NoContentSVG,
  },
  data() {
    return {
      constants: constants,
      currentPage: 0,
    }
  },
  watch: {
    getOffSet(val, oldVal) {
      if (val == 0) {
        this.currentPage = 0
      }
    },
  },
  computed: {
    ...mapGetters('organization', [
      'getListEmployee',
      'getSearchName',
      'getTotal',
      'getOffSet',
      'getPageSize',
    ]),
    hasData() {
      return this.getListEmployee && this.getListEmployee.length !== 0
    },
    start() {
      const result = this.currentPage * this.getPageSize + 1
      return result > this.getTotal ? result - this.getPageSize : result
    },
    end() {
      const result = this.start + this.getPageSize - 1
      return result >= this.getTotal ? this.getTotal : result
    },
    totalRecord() {
      return this.getTotal ? this.getTotal : this.getListEmployee ? this.getListEmployee.length : 0
    },
  },
  methods: {
    ...mapMutations('organization', ['SET_OFF_SET']),
    ...mapActions('organization', ['setDepartmentList']),
    prevPage() {
      if (this.currentPage <= 0) {
        return
      }
      this.currentPage = this.currentPage - 1
      this.getData()
    },
    nextPage() {
      if (this.end >= this.getTotal) {
        return
      }
      this.currentPage = this.currentPage + 1
      this.getData()
    },
    getData() {
      try {
        this.SET_OFF_SET(this.currentPage * this.getPageSize)
        this.setDepartmentList()
      } catch (error) {
        console.log(error, 'error')
      }
    },
    goToCreate() {
      this.$router.push({ name: constants.ROUTESNAME.UNIT_CREATE })
    },
  },
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  .table-organization {
    width: 100%;
    border-collapse: separate;

    .table-thead {
      position: sticky;
      background: #fff;
      top: 269px;
      z-index: 3;
    }
  }

  table,
  th,
  td {
    border-collapse: collapse;
  }
}
</style>
