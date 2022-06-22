<template>
  <div class="form-memo">
    <FormOrganization :title="$t('unit.organization.detail.memo')">
      <FormCustom
        rules="max:500"
        :noLabel="true"
        :label="$t('unit.organization.detail.memo')"
        :error="$t('unit.organization.detail.error.please_enter_500_characters')"
      >
        <textarea
          ref="textareaFormOrganization"
          v-model.trim="remarks"
          class="input-memo"
          :placeholder="$t('unit.organization.detail.placeholder.500_characters')"
          oninput="this.style.height = ''; this.style.height = this.scrollHeight +'px'"
        />
      </FormCustom>
    </FormOrganization>
  </div>
</template>

<script>
import FormOrganization from '@/units/components/layout/FormOrganization'
import FormCustom from '@/units/components/layout/FormCustom'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    FormOrganization,
    FormCustom,
  },
  props: {
    isDetail: {
      default: false,
    },
  },
  computed: {
    ...mapGetters('organization/detail', ['getDataDetail', 'getDataCreate']),
  },
  watch: {
    'getDataDetail.UnitHistory.remarks': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.remarks = val
          this.$nextTick(() => {
            this.$refs.textareaFormOrganization.dispatchEvent(new Event('input'))
          })
        }
      },
      deep: false,
    },
    remarks: {
      handler(val) {
        const dataCreate = {
          ...this.getDataCreate,
          UnitHistory: {
            ...this.getDataCreate.UnitHistory,
            remarks: val,
          },
        }
        this.SET_DATA_CREATE(dataCreate)
      },
      immediate: true,
    },
  },
  data() {
    return {
      remarks: '',
    }
  },
  mounted() {
    if (this.isDetail && this.getDataDetail && this.getDataDetail.UnitHistory) {
      this.remarks = this.getDataDetail.UnitHistory.remarks
    }
  },
  methods: {
    ...mapMutations('organization/detail', ['SET_DATA_CREATE']),
  },
}
</script>

<style lang="scss" scoped>
.form-memo {
  .input-memo {
    margin-top: 16px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    max-width: unset;
    resize: none;
    width: 100%;
    padding: 0 12px;
    overflow: hidden;
  }
}
</style>
