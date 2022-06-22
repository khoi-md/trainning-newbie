<template>
  <div class="form-address">
    <FormOrganization :title="$t('unit.organization.detail.department_address')">
      <FormCustom
        :value="dataForm.UnitHistory.post_no"
        rules="max:7"
        :label="$t('unit.organization.detail.postal_code')"
        :error="$t('unit.organization.detail.error.postal_code')"
        :rulesOutsideOutside="getErrorPostalCode"
      >
        <PostalCode v-model.trim="dataForm.UnitHistory.post_no" />
      </FormCustom>

      <FormInput
        :value="getPosition.prefecture"
        rulesOutside="max:100"
        :label="$t('unit.organization.detail.prefectures')"
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
        @change="SET_PREFECTURE"
      />

      <FormInput
        :value="getPosition.municipality"
        rulesOutside="max:100"
        :label="$t('unit.organization.detail.municipalities')"
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
        @change="SET_MUNICIPALITIES"
      />

      <FormInput
        :value="getPosition.address"
        rulesOutside="max:100"
        :label="$t('unit.organization.detail.address')"
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
        @change="SET_ADDRESS"
      />

      <FormInput
        v-model.trim="dataForm.UnitHistory.building_name"
        rulesOutside="max:100"
        :label="$t('unit.organization.detail.building_name')"
        :placeholder="$t('unit.organization.detail.placeholder.please_enter')"
        @change="SET_BUILDING_NAME"
      />

      <!-- Image -->
      <FormCustom :label="$t('unit.organization.detail.address_map')">
        <DragDropImage @chooseFile="chooseAddress" v-model="dataForm.AddressMap" />
      </FormCustom>

      <FormInput
        v-model.trim="dataForm.UnitHistory.tel_no"
        rulesOutside="max:20"
        :label="$t('unit.organization.detail.telephone_number')"
        :placeholder="$t('unit.organization.detail.placeholder.half_width')"
      />

      <FormInput
        v-model.trim="dataForm.UnitHistory.fax_no"
        rulesOutside="max:20"
        :label="$t('unit.organization.detail.fax_number')"
        :placeholder="$t('unit.organization.detail.placeholder.half_width')"
      />

      <FormCustom :label="$t('unit.organization.detail.nearest_route_name')">
        <SearchSelect
          v-model.trim="searchRouter"
          class="multi-select"
          :multiple="true"
          :havePlaceholderWhenHaveData="true"
          :options="getRouterNearList"
          propertyId="value"
          :dataSelected="dataForm.UnitHistory.router_name"
          :hasSearchAPI="true"
          :canSearch="true"
          @select="selectRouterNear"
          @selected="e => selectedTypeNear(e, 'router_name')"
          :placeholder="$t('unit.organization.detail.placeholder.route_name')"
        />
      </FormCustom>

      <FormCustom :label="$t('unit.organization.detail.nearest_station_name')">
        <SearchSelect
          v-model.trim="searchStation"
          :multiple="true"
          :havePlaceholderWhenHaveData="true"
          class="multi-select"
          :options="getStationNearList"
          :dataSelected="dataForm.UnitHistory.station_name"
          @selected="e => selectedTypeNear(e, 'station_name')"
          :placeholder="$t('unit.organization.detail.placeholder.station_name')"
        />
      </FormCustom>
    </FormOrganization>
  </div>
</template>

<script>
import FormInput from '@/units/components/layout/FormInput'
import FormCustom from '@/units/components/layout/FormCustom'
import FormOrganization from '@/units/components/layout/FormOrganization'
import InputUnit from '@/units/components/input/InputUnit'
import SearchSelect from '@/units/components/select/SearchSelect'
import DragDropImage from '@/units/components/common/DragDropImage'
import PostalCode from '../action/PostalCode'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import { isEqual, cloneDeep, omit, debounce, pick } from 'lodash'

export default {
  components: {
    FormInput,
    FormCustom,
    FormOrganization,
    InputUnit,
    SearchSelect,
    DragDropImage,
    PostalCode,
  },
  data() {
    return {
      dataForm: {
        UnitHistory: {
          router_name: '',
          station_name: '',
          building_name: '',
          post_no: '',
          tel_no: '',
          fax_no: '',
        },
        AddressMap: {},
      },
      searchRouter: '',
      searchStation: '',
    }
  },
  props: {
    isDetail: {
      default: false,
    },
  },
  computed: {
    ...mapGetters('organization/detail', [
      'getPosition',
      'getDataDetail',
      'getRouterNearList',
      'getStationNearList',
      'getErrorPostalCode',
      'getDataCreate',
    ]),
  },
  watch: {
    getDataDetail: {
      handler(val, oldVal) {
        if (!isEqual(val, oldVal)) {
          this.dataForm = cloneDeep(val)
        }
      },
      deep: true,
    },
    dataForm: {
      handler(val, oldVal) {
        const dataCreate = {
          ...this.getDataCreate,
          UnitHistory: {
            ...this.getDataCreate.UnitHistory,
            ...pick(val.UnitHistory, ['building_name', 'post_no', 'tel_no', 'fax_no']),
          },
        }
        this.SET_DATA_CREATE(dataCreate)
      },
      deep: true,
    },
    searchRouter: debounce(function(e) {
      this.setRouterNearList(e)
    }, 300),
  },
  mounted() {
    if (this.isDetail && this.getDataDetail && this.getDataDetail.UnitHistory) {
      this.dataForm = cloneDeep(this.getDataDetail)
    }
  },
  methods: {
    ...mapMutations('organization/detail', [
      'SET_PREFECTURE',
      'SET_MUNICIPALITIES',
      'SET_ADDRESS',
      'SET_BUILDING_NAME',
      'SET_DATA_CREATE',
      'SET_DATA_DETAIL',
    ]),
    ...mapActions('organization/detail', ['setRouterNearList', 'setStationNearList']),
    selectRouterNear(item) {
      this.setStationNearList(item.value)
    },
    selectedTypeNear(item, type) {
      const dataCreate = {
        ...this.getDataCreate,
        UnitHistory: {
          ...this.getDataCreate.UnitHistory,
          [type]: item,
        },
      }
      this.SET_DATA_CREATE(dataCreate)
    },
    chooseAddress(item) {
      const dataCreate = {
        ...this.getDataCreate,
        EmployeeFile: item,
      }
      this.SET_DATA_CREATE(dataCreate)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-address {
  .btn {
    &-update {
      padding: 4px 8px;
      color: #fff;
      border-radius: 4px;
      background: #627d98;
      border: 1px solid #627d98;
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

  .input-unit {
    width: 81px;
  }

  .input-halfwidth {
    max-width: 200px;
  }

  .search-select {
    max-width: 528px;
    border-color: #dcdcdc;
  }

  .multi-select {
    max-width: 528px;
    border-color: #dcdcdc;
    gap: 8px;
  }
}
</style>
