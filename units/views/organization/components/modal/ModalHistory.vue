<template>
  <Modal
    name="ModalHistory"
    :hideClose="true"
    :title="$t('unit.organization.detail.modal.add_history.title')"
    class="modal-bg"
  >
    <template v-slot:icon>
      <TreeUserSVG class="icon" />
    </template>
    <template>
      <div class="modal-description">
        <FormCustom
          :label="$t('unit.organization.detail.modal.add_history.start_date')"
        >
          <DatepickerInput
            class="date-picker"
            :value="targetDate"
            format="yyyy/MM/dd"
            @input="onSelectedDatePicker($event)"
          />
          <div class="error" v-show="targetDate && errorDate">{{ $t('unit.organization.detail.error.date') }}</div>
        </FormCustom>
      </div>
    </template>
    <template v-slot:footer>
      <div class="modal-btn-wrap">
        <div @click="cancelHistory" class="btn-cancel">
          {{ $t('unit.organization.detail.modal.button.cancel') }}
        </div>
        <div @click="addHistory" class="btn btn-add" :class="{ disabled: inValidDate }">
          {{ $t('unit.organization.detail.modal.button.add') }}
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/units/components/common/Modal'
import TreeUserSVG from '@/units/components/svg/TreeUserSVG'
import FormCustom from '@/units/components/layout/FormCustom'
import DatepickerInput from '@/share/components/inputs/DatepickerInput/DatepickerInput.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Modal,
    TreeUserSVG,
    FormCustom,
    DatepickerInput,
  },
  props: ['submit'],
  data() {
    return {
      targetDate: '',
    }
  },
  computed: {
    ...mapGetters('organization/detail', [
      'getDataDetail',
    ]),
    isHaveTargetDate() {
      return this.targetDate ? true : false
    },
    errorDate() {
      const date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
      if (!(date_regex.test(this.targetDate.split('/').join('-')))) {
        return true
      }
      return false
    },
    inValidDate() {
      return !this.isHaveTargetDate || this.errorDate
    },
  },
  methods: {
    ...mapActions('organization/detail', [
      'getUnitHistoryMostRecent',
    ]),
    onSelectedDatePicker(item) {
      this.targetDate = item
    },
    addHistory() {
      if (this.inValidDate) {
        return
      }

      this.getUnitHistoryMostRecent({
        unit_id: this.getDataDetail.Unit.id,
        start_date: this.targetDate,
      })

      this.submit()

      this.cancelHistory()
    },
    cancelHistory() {
      this.$modal.hide('ModalHistory')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  &-bg {
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

    /deep/ .form-input {
      margin-top: 0;
      margin-bottom: 0;
    }

    .error {
      color: #ed5d5d;
      margin-top: 4px;
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
      background: #dae2ec;
      color: #617d98;

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
