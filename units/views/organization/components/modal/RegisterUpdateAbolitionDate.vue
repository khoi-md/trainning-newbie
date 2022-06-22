<template>
  <Modal name="RegisterUpdateAbolitionDate" :hideClose="false" :title="title" class="modal-bg">
    <template v-slot:icon>
      <CircleCaution class="icon" />
    </template>
    <template>
      <div class="modal-description">
        <FormCustom :label="$t('unit.organization.list.modal.department_follow')">
          <div class="item">
            {{ employee.unit_name }}
          </div>
        </FormCustom>

        <FormCustom :label="$t('unit.organization.list.modal.abolition_date')">
          <DatepickerInput
            class="date-picker"
            :class="{ 'error-date': allErrorDate }"
            :value="targetDate"
            format="yyyy/MM/dd"
            @input="onSelectedDatePicker($event)"
          />
          <div class="error" v-show="targetDate && errorDate">
            {{ $t('unit.organization.detail.error.date') }}
          </div>
          <div class="error" v-show="getErrorDateLower">{{ getErrorDateLower }}</div>
        </FormCustom>
      </div>
    </template>
    <template v-slot:footer>
      <div class="modal-btn-wrap">
        <div @click="cancel" class="btn-cancel">
          {{ $t('unit.organization.list.button.cancel') }}
        </div>
        <div @click="submit" class="btn btn-add" :class="{ disabled: inValidDate }">
          {{ $t('unit.organization.list.button.register') }}
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/units/components/common/Modal'
import CircleCaution from '@/units/components/svg/CircleCaution'
import FormCustom from '@/units/components/layout/FormCustom'
import i18n from '@/units/i18n'
import mixin from '@/units/mixins/mixin'
import constants from '@/units/constants'

import DatepickerInput from '@/share/components/inputs/DatepickerInput/DatepickerInput.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    item: {
      default() {
        return {
          value: constants.ORGANIZATION.ACTIONSTHREEDOTS.REGISTER,
        }
      },
    },
    title: {
      default: i18n.t('unit.organization.list.modal.register_of_abolition_date'),
    },
    employee: {
      default() {
        return {
          active_end_date: '2100/12/31',
          id: '887',
          modified: '2022/04/28',
          start_date: '2021/01/01',
          status: '使用中',
          unit_cd: 'kodamatestka',
          unit_name: '児玉テスト課',
        }
      },
    },
  },
  mixins: [mixin],
  components: {
    Modal,
    CircleCaution,
    FormCustom,
    DatepickerInput,
  },
  data() {
    return {
      targetDate: '',
      constants: constants,
    }
  },
  created() {
    this.SET_ERROR_DATE_LOWER('')
    if (this.employee.active_end_date !== '2100/12/31') {
      this.targetDate = this.employee.active_end_date
    }
  },
  computed: {
    ...mapGetters('organization', ['getErrorDateLower']),
    isHaveTargetDate() {
      return this.targetDate ? true : false
    },
    errorDate() {
      const date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
      if (!date_regex.test(this.targetDate.split('/').join('-'))) {
        return true
      }
      return false
    },
    inValidDate() {
      return !this.isHaveTargetDate || this.errorDate
    },
    allErrorDate() {
      return this.getErrorDateLower || (this.targetDate && this.errorDate)
    },
  },
  methods: {
    ...mapMutations('organization', ['SET_ERROR_DATE_LOWER']),
    ...mapActions('organization', ['registerUpdateAbolitionDate', 'setDepartmentList']),
    onSelectedDatePicker(date) {
      this.targetDate = date
    },
    async submit() {
      if (this.inValidDate) {
        return
      }

      const params = {
        unit_id: this.employee.unit_id,
        abolition_date: this.targetDate,
        item: this.item,
      }

      const res = await this.registerUpdateAbolitionDate(params)

      if (!res || !res.completed) {
        return
      }

      this.cancel()

      if (params.item.value === constants.ORGANIZATION.ACTIONSTHREEDOTS.REGISTER) {
        ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.register'))
      } else {
        ppCommon.peopleFloatingMessage(i18n.t('unit.organization.notify.update'))
      }

      await this.setDepartmentList()
    },
    cancel() {
      this.targetDate = ''
      this.$modal.hide('RegisterUpdateAbolitionDate')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  &-bg {
    border-top: 6px solid #cf1124;

    .icon {
      width: 48px;
      height: 48px;
    }
  }
  &-description {
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 24px;

    .date-picker {
      width: 160px;
    }

    .error {
      color: #ed5d5d;
      margin-top: 4px;
    }

    .error-date {
      /deep/ .input-container {
        border-color: #ed5d5d;
      }
    }

    /deep/ .form-input {
      margin-top: 0;
      margin-bottom: 0;
    }

    .item {
      margin-bottom: 24px;
      color: #333;
    }
  }

  &-btn-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    background: #f7f7f7;
    gap: 16px;
    padding: 12px 32px;

    .btn-add {
      height: 32px;
      padding-top: 2px;
      background: #ffe5e5;
      border: 1px solid #ffe5e5;
      color: #8b041b;
      font-weight: 400;

      &.disabled {
        background: #dbdbdb;
        border: 1px solid #dbdbdb;
        cursor: not-allowed;
        color: #fff;
      }
    }

    .btn-cancel {
      cursor: pointer;
    }
  }
}
</style>
