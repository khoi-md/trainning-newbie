<template>
  <div class="form-setting">
    <FormOrganization :title="$t('unit.organization.detail.department_name_setting')">
      <FormCustom
        :required="true"
        v-validate="'date_format:yyyy/MM/dd'"
        :label="$t('unit.organization.detail.start_date')"
        :error="$t('unit.organization.detail.error.date')"
      >
        <TwoWayCalendar
          v-model="dataForm.UnitHistory.start_date"
          v-validate="'date_format:yyyy/MM/dd'"
          :name="$t('unit.organization.detail.start_date')"
          :isDetail="isDetail"
          @selected="selectedTwoWayCalendar"
        />
      </FormCustom>

      <FormCustom
        v-model.trim="dataForm.UnitHistory.unit_cd"
        :required="true"
        rules="max:20"
        :label="$t('unit.organization.detail.department_code')"
        :name="$t('unit.organization.detail.department_code')"
        :error="getMessageErrorUnitCD"
        :rulesOutside="getMessageErrorUnitCD"
      >
        <div class="form-description">
          <div class="description">
            {{ $t('unit.organization.detail.please_enter_alphanumerical') }}
          </div>
          <input
            v-model.trim="dataForm.UnitHistory.unit_cd"
            class="input-halfwidth"
            :placeholder="$t('unit.organization.detail.placeholder.half_width')"
          />
        </div>
      </FormCustom>

      <FormCustom
        v-model.trim="dataForm.UnitHistory.unit_cd2"
        rules="max:20"
        :label="`${$t('unit.organization.detail.department_code')} 2`"
        :name="`${$t('unit.organization.detail.department_code')} 2`"
        :error="getMessageErrorUnitCD2"
        :rulesOutside="getMessageErrorUnitCD2"
      >
        <div class="form-description">
          <div class="description">
            {{ $t('unit.organization.detail.please_enter_alphanumerical') }}
          </div>
          <input
            v-model.trim="dataForm.UnitHistory.unit_cd2"
            class="input-halfwidth"
            :placeholder="$t('unit.organization.detail.placeholder.half_width')"
          />
        </div>
      </FormCustom>

      <FormInput
        v-model.trim="dataForm.UnitHistory.unit_name"
        :required="true"
        rulesOutside="max:100"
        :label="$t('unit.organization.detail.department_name')"
        :error="
          $t('unit.organization.detail.error.field', {
            field: $t('unit.organization.detail.department_name'),
          })
        "
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
      />

      <FormInput
        v-model.trim="dataForm.UnitHistory.unit_name_en"
        :required="true"
        rulesOutside="max:100"
        :label="$t('unit.organization.detail.department_alphabetic_name')"
        :error="
          $t('unit.organization.detail.error.field', {
            field: $t('unit.organization.detail.department_alphabetic_name'),
          })
        "
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
      />

      <FormInput
        v-model.trim="dataForm.UnitHistory.unit_short_nm"
        rulesOutside="max:50"
        :label="$t('unit.organization.detail.department_abbreviation')"
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
      />

      <FormInput
        v-model.trim="dataForm.UnitHistory.unit_short_nm_en"
        rulesOutside="max:50"
        :label="$t('unit.organization.detail.department_abbreviation_english')"
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
      />

      <FormCustom :label="$t('unit.organization.detail.department_rank')">
        <InputSelect
          class="select-department_rank"
          v-model="dataForm.UnitHistory.rank_code"
          @select="selectRankCode"
          :options="getDepartmentRankList"
          :placeholder="$t('unit.organization.detail.placeholder.select')"
        /> 
      </FormCustom>

      <FormCustom :label="$t('unit.organization.detail.appropriate_personnel')" rules="numeric">
        <InputUnit
          v-model.trim="dataForm.UnitHistory.reasonable_personnel"
          v-only-numbers
          type="text"
          classInput="input-unit"
          :placeholder="$t('unit.organization.detail.placeholder.input_zero')"
        />
      </FormCustom>
    </FormOrganization>
  </div>
</template>

<script>
import FormInput from '@/units/components/layout/FormInput'
import FormCustom from '@/units/components/layout/FormCustom'
import FormOrganization from '@/units/components/layout/FormOrganization'
import InputSelect from '@/units/components/select/InputSelect'
import InputUnit from '@/units/components/input/InputUnit'
import mixin from '@/units/mixins/mixin'
import TwoWayCalendar from '../calendar/TwoWayCalendar'

import CpDropdown from '@/share/components/inputs/CpDropdown/CpDropdown'
import DatePicker from '@/share/components/DatePicker/DatePicker.vue'

import { mapGetters, mapMutations } from 'vuex'
import { isEqual, cloneDeep, omit, pick } from 'lodash'

export default {
  components: {
    FormInput,
    FormCustom,
    FormOrganization,
    InputSelect,
    InputUnit,
    CpDropdown,
    DatePicker,
    TwoWayCalendar,
  },
  mixins: [mixin],
  props: {
    isDetail: {
      default: false,
    },
  },
  data() {
    return {
      maxDate: new Date('2100-12-31'),
      minDate: new Date('1900-01-01'),
      dataForm: {
        UnitHistory: {
          start_date: '',
          unit_cd: '',
          unit_cd2: '',
          unit_name: '',
          unit_name_en: '',
          unit_short_nm: '',
          unit_short_nm_en: '',
          rank_code: '',
          reasonable_personnel: '',
        },
      },
    }
  },
  computed: {
    ...mapGetters('organization/detail', [
      'getDepartmentRankList',
      'getDataDetail',
      'getDataCreate',
      'getMessageErrorUnitCD',
      'getMessageErrorUnitCD2',
    ]),
  },
  watch: {
    getDataDetail: {
      handler(val, oldVal) {
        if (val && val.UnitHistory && val.UnitHistory.start_date && !isEqual(val, oldVal)) {
          const indexRankCode = this.getDepartmentRankList.findIndex(
            el => el.value === val.UnitHistory.rank_code,
          )
          this.dataForm.UnitHistory = cloneDeep({
            ...val.UnitHistory,
            rank_code: this.getDepartmentRankList[indexRankCode]
              ? this.getDepartmentRankList[indexRankCode].name
              : '',
          })
        }
      },
      deep: true,
    },
    dataForm: {
      handler(val) {
        const dataCreate = {
          ...this.getDataCreate,
          UnitHistory: {
            ...this.getDataCreate.UnitHistory,
            ...pick(val.UnitHistory, [
              'start_date',
              'unit_cd',
              'unit_cd2',
              'unit_name',
              'unit_name_en',
              'unit_short_nm',
              'unit_short_nm_en',
              'reasonable_personnel',
            ]),
          },
        }
        this.SET_DATA_CREATE(dataCreate)
      },
      deep: true,
    },
    'dataForm.UnitHistory.unit_cd': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.SET_MESSAGE_ERROR_UNIT_CD('')
        }
      },
    },
    'dataForm.UnitHistory.unit_cd2': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.SET_MESSAGE_ERROR_UNIT_CD2('')
        }
      },
    },
  },
  created() {
    if (this.isDetail && this.getDataDetail && this.getDataDetail.UnitHistory) {
      this.dataForm = cloneDeep(this.getDataDetail)
    }
  },
  methods: {
    ...mapMutations('organization/detail', [
      'SET_DATA_CREATE',
      'SET_DATA_DETAIL',
      'SET_MESSAGE_ERROR_UNIT_CD',
      'SET_MESSAGE_ERROR_UNIT_CD2',
    ]),
    selectRankCode(item) {
      const dataCreate = {
        ...this.getDataCreate,
        UnitHistory: {
          ...this.getDataCreate.UnitHistory,
          rank_code: item.value,
        },
      }
      this.SET_DATA_CREATE(dataCreate)
    },
    selectedTwoWayCalendar(item) {
      this.dataForm.UnitHistory.start_date = item
    },
  },
}
</script>

<style lang="scss" scoped>
.form-setting {
  .btn {
    &-update {
      padding: 4px 8px;
      color: #fff;
      border-radius: 4px;
      background: #627D98;
      border: 1px solid #627D98;
      font-size: 16px;
      line-height: 24px;
      white-space: nowrap;
      width: 82px;
      height: 32px;
    }
  }

  .footer {
    background: #f7f7f7;
    padding: 12px 32px;
  }

  /deep/ .input-unit {
    width: 81px;
  }

  .two-way-calendar {
    display: flex;
    align-items: center;

    .icon-calendar {
      margin-left: 12px;
      position: relative;
      top: 2px;
      cursor: pointer;
    }
  }

  .form-description {
    .description {
      margin-bottom: 8px;
    }

    .input-halfwidth {
      max-width: 200px;
    }
  }
  
  .select {
    &-dropdown {
      max-width: 200px;
      /deep/ .option {
        background: #f0f4f8;
        color: #486581;
        &:hover {
          background: #627d98;
          color: #fff;
        }
      }
    }

    &-rank {
      max-width: 528px;
    }

    &-department_rank {
      /deep/ input {
        border-color: #dcdcdc;
      }

      /deep/ .options-container {
        position: absolute;
        width: 528px;
        .option {
          background: #f0f4f8;
          color: #486581;
          &:hover {
            background: #627d98;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
