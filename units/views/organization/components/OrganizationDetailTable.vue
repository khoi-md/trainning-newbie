<template>
  <div class="table-wrapper">
    <table class="table-organization">
      <thead>
        <TableHeader :optionsHeader="constants.ORGANIZATIONTABLE.tableAffliationManager" />
      </thead>
      <tbody v-if="hasData">
        <TableDetailRow
          v-for="(item, index) in getUnitManagerList"
          :key="`${item.uuid}-${index}`"
          :item="item"
          :value="item"
        />
      </tbody>

      <tbody v-else>
        <tr class="table_no_content-body-tr">
          <td class="table_no_content-body-td" colspan="5">
            <NoContentSVG />
            <div class="description">{{ $t('unit.organization.list.no_content.description') }}</div>
            <div class="btn btn-register" @click="openAddUnitManager">
              {{ $t('unit.organization.list.button.register') }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <TableFooter
      v-if="hasData"
      :currentPage="currentPage"
      :start="start"
      :end="end"
      :totalRecord="totalRecord"
      @prevPage="prevPage"
      @nextPage="nextPage"
    /> -->
  </div>
</template>

<script>
import TableHeader from './table/TableHeader'
import TableFooter from './table/TableFooter'
import TableDetailRow from './table/TableDetailRow'
import NoContentSVG from '@/units/components/svg/NoContentSVG'

import { mapGetters, mapActions, mapMutations } from 'vuex'
import { chunk } from 'lodash'
import constants from '@/units/constants/index'
import ModalAddUnitManager from './modal/ModalAddUnitManager'

export default {
  name: 'OrganizationTable',
  components: {
    TableHeader,
    TableFooter,
    TableDetailRow,
    NoContentSVG,
    ModalAddUnitManager,
  },
  data() {
    return {
      constants: constants,
      currentPage: 0,
      unitId: '',
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
    ...mapGetters('organization/detail', ['getDataDetail']),
    ...mapGetters('organization/manager', [
      'getUnitManagerList',
      'getTotal',
      'getOffSet',
      'getPageSize',
    ]),
    hasData() {
      return this.getUnitManagerList && this.getUnitManagerList.length !== 0
    },
    start() {
      const result = this.currentPage * this.getPageSize + 1
      return result > this.getTotal
        ? result - this.getPageSize > 0
          ? result - this.getPageSize
          : 1
        : result
    },
    end() {
      const result = this.start + this.getPageSize - 1
      return result >= this.getTotal ? this.getTotal : result
    },
    totalRecord() {
      return this.getTotal
        ? this.getTotal
        : this.getUnitManagerList
        ? this.getUnitManagerList.length
        : 0
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getData()
    }
  },
  methods: {
    // ...mapMutations('organization/detail', ['SET_OFF_SET']),
    ...mapActions('organization/manager', ['setUnitManagerList']),
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
        // this.SET_OFF_SET(this.currentPage * this.getPageSize)
        this.setUnitManagerList(this.getDataDetail.Unit.id)
      } catch (error) {
        console.log(error, 'error')
      }
    },
    openAddUnitManager() {
      this.$modal.show(
        ModalAddUnitManager,
        {},
        {
          name: 'ModalAddUnitManager',
          width: '640px',
          height: 'auto',
        },
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  margin-top: 24px;

  .table-organization {
    width: 100%;
    border-collapse: collapse;
  }

  table,
  th,
  td {
    border-collapse: collapse;
  }

  .table {
    &_no_content {
      &-body {
        &-tr {
          height: 700px;
        }

        &-td {
          text-align: center;

          .description {
            color: #333;
            font-size: 24px;
            line-height: 36px;
            margin-top: 40px;
          }

          .btn-register {
            width: 150px;
            min-width: 150px;
            height: 40px;
            padding: 8px 25px;
            border-radius: 4px;
            margin: 24px auto;
            color: #fff;
            background-color: #486581;
            font-size: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
