<template>
  <Modal
    name="ModalRemoveUnitManager"
    :hideClose="true"
    :title="$t('unit.organization.detail.modal.remove_a_manager.title')"
    class="modal-bg"
  >
    <template v-slot:icon>
      <CircleCaution class="icon" />
    </template>
    <template>
      <div class="modal-description">
        <div class="modal-description-1">
          {{ $t('unit.organization.detail.modal.remove_a_manager.description') }}
        </div>
        <div>{{ $t('unit.organization.detail.modal.remove_a_manager.description_2') }}</div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="modal-btn-wrap">
        <div @click="cancelUnitManager" class="btn-cancel">
          {{ $t('unit.organization.detail.modal.button.cancel_2') }}
        </div>
        <div @click="removeUnitManager" class="btn btn-remove">
          {{ $t('unit.organization.detail.modal.button.remove') }}
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/units/components/common/Modal'
import CircleCaution from '@/units/components/svg/CircleCaution'
import { mapActions, mapGetters } from 'vuex'
import { debounce } from 'lodash'

export default {
  components: {
    Modal,
    CircleCaution,
  },
  props: {
    id: {
      default: '',
      required: true,
    },
  },
  data() {
    return {
      targetDate: '',
      selected: '',
    }
  },
  computed: {
    ...mapGetters('organization/detail', ['getDataDetail']),
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
      return !this.isHaveTargetDate || (this.errorDate && this.selected)
    },
  },
  methods: {
    ...mapActions('organization/detail', ['searchEmployeeList']),
    ...mapActions('organization/manager', ['removeUnitManagerList', 'setUnitManagerList']),
    onSelectedDatePicker(item) {
      this.targetDate = item
    },
    async removeUnitManager() {
      await this.removeUnitManagerList(this.id)
      this.cancelUnitManager()
      await this.setUnitManagerList(this.getDataDetail.Unit.id)
    },
    cancelUnitManager() {
      this.$modal.hide('ModalRemoveUnitManager')
    },
    selectEmployee(item) {
      this.selected = item
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
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 16px;
    background: #f1f2f7;
    color: #333;
    &-1 {
      margin-bottom: 8px;
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

    .btn-remove {
      height: 32px;
      padding-top: 2px;
      background: #ffe5e5;
      color: #8b041b;
      border-color: #ffe5e5;
      font-weight: 400;
      font-size: 14px;

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
