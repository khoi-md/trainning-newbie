<template>
  <tr>
    <td>
      <Status :status="employee.status" :value="employee.status" />
    </td>
    <td class="pointer" @click="goToDetail(employee.id)">
      <span>{{ employee.unit_cd }}</span>
    </td>
    <td>
      <span>{{ employee.unit_name }}</span>
    </td>
    <td>
      <span>{{ dateFormat(employee.start_date) }}</span>
    </td>
    <td v-if="!conditionChangeValue()">
      <span>
        {{ dateFormat(employee.modified) }}
      </span>
    </td>
    <td>
      <span>{{
        dateFormat(employee.active_end_date) !== '2100/12/31'
          ? dateFormat(employee.active_end_date)
          : '-'
      }}</span>
    </td>
    <td>
      <ActionThreeDots
        :options="getOptionsAction(employee.active_end_date)"
        @select="selectAction"
      />
    </td>
  </tr>
</template>
<script>
import { mapGetters } from 'vuex'
import Status from '../common/Status'
import mixin from '@/units/mixins/mixin'
import constants from '@/units/constants'
import RegisterUpdateAbolitionDate from '../modal/RegisterUpdateAbolitionDate'
import DeleteObsoleteDate from '../modal/DeleteObsoleteDate'
import ActionThreeDots from '../../components/action/ActionThreeDots'
import i18n from '@/units/i18n'

export default {
  components: {
    Status,
    ActionThreeDots,
    RegisterUpdateAbolitionDate,
    DeleteObsoleteDate,
  },
  mixins: [mixin],
  props: {
    employee: {
      type: Object,
    },
  },
  data() {
    return {
      constants: constants,
    }
  },
  computed: {
    ...mapGetters('organization', ['getSortStatus']),
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: constants.ROUTESNAME.UNIT_DETAIL, params: { id } })
    },
    conditionChangeValue() {
      return this.getSortStatus === constants.ORGANIZATION.STATUS.ABOLITION
    },
    getOptionsAction(item) {
      if (item !== '2100/12/31') {
        return [
          {
            name: i18n.t('unit.organization.list.action_threedots.change_of_abolition_date'),
            value: constants.ORGANIZATION.ACTIONSTHREEDOTS.UPDATE,
          },
          {
            name: i18n.t('unit.organization.list.action_threedots.delete_of_abolition_date'),
            value: constants.ORGANIZATION.ACTIONSTHREEDOTS.DELETE,
          },
        ]
      } else {
        return [
          {
            name: i18n.t('unit.organization.list.action_threedots.registration_of_abolition_date'),
            value: constants.ORGANIZATION.ACTIONSTHREEDOTS.REGISTER,
          },
        ]
      }
    },
    selectAction(item) {
      switch (item.value) {
        case 'delete':
          this.openModalDelete(item)
          break

        default:
          this.openModalRegister(item)
          break
      }
    },
    openModalRegister(item) {
      this.$modal.show(
        RegisterUpdateAbolitionDate,
        {
          item,
          employee: this.employee,
          title:
            item.value === constants.ORGANIZATION.ACTIONSTHREEDOTS.REGISTER
              ? i18n.t('unit.organization.list.modal.register_of_abolition_date')
              : i18n.t('unit.organization.list.modal.change_of_abolition_date'),
        },
        {
          name: 'RegisterUpdateAbolitionDate',
          width: '480px',
          height: 'auto',
        },
      )
    },
    openModalDelete(item) {
      this.$modal.show(
        DeleteObsoleteDate,
        {
          item,
          employee: this.employee,
        },
        {
          name: 'DeleteObsoleteDate',
          width: '480px',
          height: 'auto',
        },
      )
    },
  },
}
</script>
<style lang="scss" scoped>
td {
  border-radius: 0px 4px 0px 0px;
  padding: 12px;
  border: 1px solid #e4e7eb;
  border-left: 0;
  border-right: 0;
  &.pointer {
    cursor: pointer;
  }
}
</style>
