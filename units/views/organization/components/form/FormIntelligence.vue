<template>
  <div class="form-intelligence">
    <FormOrganization
      :title="$t('unit.organization.detail.department_info')"
    >
      <FormCustom
        :label="$t('unit.organization.detail.business_content')"
      >
        <div class="input">
          <cp-dropdown
            class="select-dropdown"
            mode="table"
            v-model.trim="dataForm.Unit.industry_code"
            :options="getIndustriesList"
            :placeholder="$t('unit.organization.detail.placeholder.select')"
          />
        </div>
      </FormCustom>
      <FormCustom
        :label="$t('unit.organization.detail.priority_classification')"
      >
        <div class="input">
          <cp-dropdown
            class="select-dropdown"
            mode="table"
            v-model.trim="dataForm.Unit.category_code"
            :options="getCategoriesList"
            :placeholder="$t('unit.organization.detail.placeholder.select')"
          />
        </div>
      </FormCustom>
      <FormCustom
        :label="$t('unit.organization.detail.related_department')"
      >
        <MultiSelect
          v-model="searchSelect"
          class="multi-select"
          keyName="name"
          :options="getSearchDepartmentList"
          :placeholder="$t('unit.organization.detail.placeholder.select_related_dept')"
          :dataSelected="dataForm.Unit.related_dept"
          :hasSearchAPI="true"
          :hideIcon="true"
          @search="searchMultiSelect"
          @change="selectRelated"
        />
      </FormCustom>

      <FormCustom
        :required="true"
        v-model="dataForm.Unit.language_cdkey"
        :label="$t('unit.organization.detail.language')"
        :error="$t('unit.organization.detail.error.field', {field: $t('unit.organization.detail.language')})"
      >
        <div class="input">
          <cp-dropdown
            class="select-dropdown"
            mode="table"
            v-model.trim="dataForm.Unit.language_cdkey"
            :options="getLanguageList"
            :placeholder="$t('unit.organization.detail.placeholder.select')"
          />
        </div>
      </FormCustom>

      <template v-if="isDetail" v-slot:footer>
        <div class="footer">
          <div class="btn btn-update" @click="updateUnit">
            {{ $t('unit.organization.detail.button.update') }}
          </div>
        </div>
      </template>
    </FormOrganization>
  </div>
</template>

<script>
import FormInput from '@/units/components/layout/FormInput'
import FormCustom from '@/units/components/layout/FormCustom'
import FormOrganization from '@/units/components/layout/FormOrganization'
import CpDropdown from '@/share/components/inputs/CpDropdown/CpDropdown'
import MultiSelect from '@/units/components/select/MultiSelect'

import { mapGetters, mapActions, mapMutations } from 'vuex'
import { debounce, isEqual, pick, cloneDeep } from 'lodash'

export default {
  components: {
    FormInput,
    FormCustom,
    FormOrganization,
    CpDropdown,
    MultiSelect,
  },
  props: {
    isDetail: {
      default: false,
    },
  },
  data() {
    return {
      searchSelect: [],
      dataMultiSelect: [],
      dataForm: {
        Unit: {
          industry_code: '',
          category_code: '',
          language_cdkey: '',
          related_dept: [],
        },
      },
    }
  },
  computed: {
    ...mapGetters('organization/detail', [
      'getIndustriesList',
      'getCategoriesList',
      'getDataDetail',
      'getSearchDepartmentList',
      'getLanguageList',
      'getDataCreate',
    ]),
  },
  watch: {
    getDataDetail: {
      handler(val, oldVal) {
        if(val && !isEqual(val, oldVal)) {
          this.dataForm = val
        }
      },
      deep: true,
    },
    dataForm: {
      handler(val) {
        if (!this.isDetail) {
          const dataCreate = {
            ...this.getDataCreate,
            ...val,
          }
          this.SET_DATA_CREATE(dataCreate)
        }
      },
      deep: true,
    },
  },
  created() {
    this.searchDepartmentList({ 
      name: '',
    })

    if (this.isDetail && this.getDataDetail && this.getDataDetail.UnitHistory) {
      this.dataForm = cloneDeep(this.getDataDetail)
    }
  },
  methods: {
    ...mapActions('organization/detail', [
      'searchDepartmentList',
      'updateUnitDepartment',
    ]),
    ...mapMutations('organization/detail', [
      'SET_DATA_CREATE',
    ]),
    selectRelated(item) {
      this.dataForm.Unit.related_dept = item
    },
    updateUnit() {
      const payload = {
        Unit: {
          ...pick(this.dataForm.Unit, [
            'industry_code',
            'category_code',
            'language_cdkey',
            'related_dept',
          ]),
        },
      }
      this.updateUnitDepartment(payload)
    },
    searchMultiSelect(item) {
      this.debounce(() => {
        this.searchDepartmentList({ 
          name: item,
        })
      })
    },
    debounce: debounce(function(callBack) {
      callBack()
    }, 300),
  },
}
</script>

<style lang="scss" scoped>
.form-intelligence {
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
      cursor: pointer;
    }
  }

  .footer {
    background: #f7f7f7;
    padding: 12px 32px;
    margin-top: 0;
  }

  .select {
    &-dropdown {
      max-width: 528px;

      /deep/ .cp-dropdown {
        border-radius: 4px;
        height: 40px;
        .options {
          z-index: 3;
        }
        
        .option {
          background: #f0f4f8;
          color: #486581;
          &:hover {
            background: #627d98;
            color: #fff;
          }
        }

        .dropdown-button {
          margin-right: 8px;
          font-size: 40px;
          position: relative;
          top: 2px;
        }
      }
    }
  }

  .multi-select {
    max-width: 528px;
    border-color: #dcdcdc;
    gap: 8px;

    /deep/ {
      .options-container {
        .option {
          background: #f0f4f8;
          color: #486581;

          .value {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 22px;
          }
          
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
