<template>
  <Modal
    name="DeleteObsoleteDate"
    :hideClose="true"
    :title="$t('unit.organization.list.modal.delete_of_obsolete_date')"
    class="modal-bg"
  >
    <template v-slot:footer>
      <div class="modal-btn-wrap">
        <div @click="cancel" class="btn-cancel">
          {{ $t('unit.organization.list.button.cancel') }}
        </div>
        <div @click="submit" class="btn btn-delete">
          {{ $t('unit.organization.list.button.delete') }}
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/units/components/common/Modal'
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      default: ''
    },
    employee: {
      default: () => {
        return {
          active_end_date: "2100/12/31",
          id: "887",
          modified: "2022/04/28",
          start_date: "2021/01/01",
          status: "使用中",
          unit_cd: "kodamatestka",
          unit_name: "児玉テスト課",
        }
      },
    },
  },
  components: {
    Modal,
  },
  data() {
    return {
      targetDate: '',
    }
  },
  methods: {
    ...mapActions('organization', [
      'deleteObsoleteDate',
      'setDepartmentList'
    ]),
    async submit() {
      const params = {
        unit_id: this.employee.unit_id,
      }
      await this.deleteObsoleteDate(params)
      this.cancel()
      await this.setDepartmentList()
    },
    cancel() {
      this.$modal.hide('DeleteObsoleteDate')
    },
  }
}
</script>

<style lang="scss" scoped>
.modal {
  &-bg {
    border-top: 4px solid #486581;

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

    .btn-delete {
      height: 32px;
      padding-top: 2px;
      background: #dae2ec;
      border: 1px solid #dae2ec;
      color: #617d98;
      font-weight: 700;

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
