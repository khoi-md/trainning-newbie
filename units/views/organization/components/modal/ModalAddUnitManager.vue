<template>
  <Modal
    name="ModalAddUnitManager"
    :hideClose="true"
    :title="$t('unit.organization.detail.modal.add_history.title')"
    class="modal-bg"
  >
    <template v-slot:icon>
      <TreeUserSVG class="icon" />
    </template>
    <template>
      <div class="modal-description">
        <FormCustom :label="$t('unit.organization.detail.modal.add_a_manager.affliation_manager')">
          <SearchCustomDropdown
            v-model="searchSelect"
            class="search-select"
            :havePlaceholderWhenHaveData="true"
            :options="getEmployeeList"
            :searchByAPI="true"
            :placeholder="$t('unit.organization.detail.placeholder.search_by_name')"
            @select="selectEmployee"
          />
        </FormCustom>

        <FormCustom :label="$t('unit.organization.detail.modal.add_a_manager.arrival_date')">
          <DatepickerInput
            class="date-picker"
            :class="{ 'error-date': allErrorDate }"
            :value="targetDate"
            format="yyyy/MM/dd"
            @input="onSelectedDatePicker($event)"
            :placeholder="$t('unit.organization.detail.placeholder.date_picker')"
          />
          <div class="error" v-show="targetDate && errorDate">
            {{ $t('unit.organization.detail.error.date') }}
          </div>
          <div class="error" v-show="getErrorStartDate">
            {{ getErrorStartDate }}
          </div>
        </FormCustom>
      </div>
    </template>
    <template v-slot:footer>
      <div class="modal-btn-wrap">
        <div @click="cancelUnitManager" class="btn-cancel">
          {{ $t('unit.organization.detail.modal.button.cancel') }}
        </div>
        <div @click="addUnitManager" class="btn btn-add" :class="{ disabled: inActiveAdd }">
          {{ $t('unit.organization.detail.modal.button.register') }}
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/units/components/common/Modal'
import TreeUserSVG from '@/units/components/svg/TreeUserSVG'
import FormCustom from '@/units/components/layout/FormCustom'
import SearchCustomDropdown from '../input/SearchCustomDropdown'
import DatepickerInput from '@/share/components/inputs/DatepickerInput/DatepickerInput.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'

export default {
  components: {
    Modal,
    TreeUserSVG,
    FormCustom,
    DatepickerInput,
    SearchCustomDropdown,
  },
  data() {
    return {
      targetDate: '',
      searchSelect: '',
      selected: {},
    }
  },
  watch: {
    searchSelect: debounce(function(val, oldVal) {
      if (val !== oldVal) {
        this.searchEmployeeList({
          limit: 10,
          offset: 0,
          name: val,
        })
        this.selected = {}
      }
    }, 300),
  },
  computed: {
    ...mapGetters('organization/detail', ['getDataDetail', 'getEmployeeList']),
    ...mapGetters('organization/manager', ['getErrorStartDate']),
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
    inActiveAdd() {
      return this.inValidDate || !this.selected || !this.selected.unit_name
    },
    allErrorDate() {
      return this.getErrorStartDate || (this.targetDate && this.errorDate)
    },
  },
  created() {
    this.SET_ERROR_START_DATE('')
  },
  methods: {
    ...mapActions('organization/detail', ['searchEmployeeList']),
    ...mapActions('organization/manager', ['setUnitManagerDetail', 'setUnitManagerList']),
    ...mapMutations('organization/manager', ['SET_ERROR_START_DATE']),
    onSelectedDatePicker(item) {
      this.targetDate = item
    },
    async addUnitManager() {
      if (this.inActiveAdd) {
        return
      }

      await this.setUnitManagerDetail({
        UnitManager: {
          start_date: this.targetDate,
          uuid: this.selected.value,
        },
        Unit: {
          id: this.getDataDetail.Unit.id,
        },
      })

      if (!this.getErrorStartDate) {
        this.cancelUnitManager()
      }

      await this.setUnitManagerList(this.getDataDetail.Unit.id)
    },
    cancelUnitManager() {
      this.$modal.hide('ModalAddUnitManager')
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
    margin-bottom: 24px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 24px;

    .date-picker {
      width: 160px;
      /deep/ .input-container {
        height: 40px;
      }
    }

    .search-select {
      margin-bottom: 24px;
      border-color: #dcdcdc;
      /deep/ .options-container {
        overflow: auto;
        overflow-x: hidden;
        max-height: 210px;
      }
    }

    /deep/ .form-input {
      margin-top: 0;
      margin-bottom: 0;
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
