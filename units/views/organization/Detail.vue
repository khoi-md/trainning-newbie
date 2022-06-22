<template>
  <div id="unit-organization-detail">
    <div class="go-back">
      <span class="back" @click="goBack()">
        <ArrowBackSVG />
      </span>
    </div>
    <div class="header-group">
      <div class="header-title">
        {{
          isDetail
            ? `${getDataDetail.UnitHistory ? getDataDetail.UnitHistory.unit_cd : ''} ${
                getDataDetail.UnitHistory ? getDataDetail.UnitHistory.unit_name : ''
              }`
            : $t('unit.organization.detail.title')
        }}
      </div>
      <!-- <div class="header-action">
        <FilterListPeople />
      </div> -->
    </div>
    <div v-if="isDetail" class="header-tag">
      <FilterTag :tagItems="tagItems" :value="currentTag" @change="changeTag" />
      <PlusWithName
        v-if="currentTag.key === constants.TAG.AFFLIATION_MANAGER"
        :name="$t('unit.organization.detail.add_affliation_manager')"
        @clickButton="openModalAddManager"
      />
    </div>

    <template v-if="currentTag.key === constants.TAG.DEPARTMENT">
      <ValidationObserver tag="form" ref="form-detail" v-slot="{ invalid }">
        <div class="body">
          <FormIntelligence :isDetail="isDetail" />
          <ChooseHistory v-if="isDetail" />
          <FormSetting :isDetail="isDetail" />
          <FormAddress :isDetail="isDetail" />
          <FormMemo :isDetail="isDetail" />
        </div>

        <div class="footer">
          <div class="" v-if="!isDetail">
            <div class="btn btn-update" :class="{ disabled: invalid }" @click="submit('create')">
              {{ $t('unit.organization.list.button.register') }}
            </div>
          </div>
          <div class="button-group" v-else-if="!checkIsDetailHistory">
            <div class="btn btn-update" :class="{ disabled: invalid }" @click="submit('update')">
              {{ $t('unit.organization.detail.button.update') }}
            </div>
            <div class="btn btn-delete" @click="deleteUnitHistory">
              {{ $t('unit.organization.detail.button.delete') }}
            </div>
          </div>
          <div class="" v-else>
            <div class="btn btn-update" :class="{ disabled: invalid }" @click="submit('register')">
              {{ $t('unit.organization.list.button.register') }}
            </div>
          </div>
        </div>
      </ValidationObserver>
    </template>

    <template v-if="currentTag.key === constants.TAG.AFFLIATION_MANAGER">
      <div class="body">
        <OrganizationDetailTable />
      </div>
    </template>
  </div>
</template>

<script>
import ArrowBackSVG from '@/discovery/components/list/svg/ArrowBackSVG'
import FilterListPeople from './components/filter/FilterListPeople'
import FilterTag from './components/filter/FilterTag'
import FormIntelligence from './components/form/FormIntelligence'
import FormSetting from './components/form/FormSetting'
import FormAddress from './components/form/FormAddress'
import FormMemo from './components/form/FormMemo'
import ChooseHistory from './components/ChooseHistory'
import OrganizationDetailTable from './components/OrganizationDetailTable'
import PlusWithName from './components/common/PlusWithName'
import ModalAddUnitManager from './components/modal/ModalAddUnitManager'

import { ValidationObserver } from 'vee-validate'
import constants from '@/units/constants/index'
import i18n from '@/units/i18n'
import { mapActions, mapGetters } from 'vuex'
import { isEqual } from 'lodash'

export default {
  components: {
    ArrowBackSVG,
    FilterListPeople,
    FilterTag,
    FormIntelligence,
    FormSetting,
    FormAddress,
    FormMemo,
    ChooseHistory,
    OrganizationDetailTable,
    PlusWithName,
    ValidationObserver,
  },
  data() {
    return {
      constants: constants,
      isDetail: false,
      tagItems: [
        {
          key: constants.TAG.DEPARTMENT,
          name: i18n.t('unit.organization.detail.tag.department'),
        },
        {
          key: constants.TAG.AFFLIATION_MANAGER,
          name: i18n.t('unit.organization.detail.tag.affliation_manager'),
        },
      ],
      currentTag: {
        key: constants.TAG.DEPARTMENT,
      },
    }
  },
  computed: {
    ...mapGetters('organization/detail', [
      'getPosition',
      'getDataDetail',
      'getDataCreate',
      'checkIsDetailHistory',
      'getMessageErrorUnitCD',
      'getMessageErrorUnitCD2',
    ]),
  },
  watch: {
    '$route.params.id': {
      handler(val, oldVal) {
        if (val && val !== oldVal) {
          this.setUnitDetail({
            id: val,
          })
        }
      },
    },
    '$route.name': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.resetDataDetail()
        }
      },
    },
  },
  created() {
    window.scroll({
      top: 0,
    })
    this.setIndustriesList()
    if (this.$route.name === constants.ROUTESNAME.UNIT_DETAIL) {
      this.isDetail = true
    }

    this.resetDataDetail()

    if (this.$route.params.id) {
      this.setUnitDetail({
        id: this.$route.params.id,
      })
    }
  },
  methods: {
    ...mapActions('organization/detail', [
      'setIndustriesList',
      'setUnitDetail',
      'resetDataDetail',
      'createDepartment',
      'updateUnitHistoryDepartment',
      'removeUnitHistory',
      'registerUnitHistory',
    ]),
    goBack() {
      this.$router.push({ name: constants.ROUTESNAME.UNIT_LIST })
    },
    changeTag(item) {
      this.currentTag = item
    },
    openModalAddManager() {
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
    async submit(type) {
      const isValid = await this.$refs['form-detail'].validate()
      if (!isValid) {
        this.$nextTick(() => {
          const el = document.querySelector('.error-form:first-of-type')
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        })
        return
      }
      switch (type) {
        case 'update':
          await this.updateUnitHistoryDepartment()
          break
        case 'register':
          await this.registerUnitHistory()
          break

        default:
          await this.createDepartment()
          break
      }

      if (this.getMessageErrorUnitCD || this.getMessageErrorUnitCD2) {
        const el2 = document.querySelector('.error-form:first-of-type')
        el2.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    deleteUnitHistory() {
      this.removeUnitHistory(this.$route.params.id)
    },
  },
}
</script>

<style lang="scss">
@import '@/units/assets/scss/detail.scss';
.header-tag {
  display: flex;
}

.footer {
  margin-top: 24px;

  .button-group {
    display: flex;
    gap: 16px;
  }
}
</style>
