<template>
  <div class="choose-history">
    <div class="label">
      {{ $t('unit.organization.detail.change_history') }}
    </div>
    <div class="select-group">
      <InputSelect
        v-model="selectHistory"
        class="select"
        :placeholder="$t('unit.organization.detail.placeholder.select_history')"
        :options="getHistoryByUnitList"
        @select="changeHistoryByUnit"
      />
      <div @click="openModalHistory" class="btn btn-choose-history">
        {{ $t('unit.organization.detail.button.add_history') }}
      </div>
    </div>
  </div>
</template>

<script>
import ModalHistory from './modal/ModalHistory'
import InputSelect from '@/units/components/select/InputSelect'

import constants from '@/units/constants'
import { mapGetters, mapActions } from 'vuex'
import { isEqual } from 'lodash'

export default {
  components: {
    ModalHistory,
    InputSelect,
  },
  data() {
    return {
      constants: constants,
      optionsInput: [
        {
          key: 'a',
          name: 'a',
          value: 'a',
        },
      ],
      selectHistory: '',
      unitId: '',
    }
  },
  computed: {
    ...mapGetters('organization/detail', ['getHistoryByUnitList', 'getUnitId']),
  },
  watch: {
    getHistoryByUnitList: {
      handler(val, oldVal) {
        if (!isEqual(val, oldVal)) {
          const index = val.findIndex(el => el.id == this.$route.params.id)
          this.selectHistory = val[index] ? val[index].name : ''
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.unitId = this.$route.params.id
    if (
      this.$route.params.id &&
      this.getHistoryByUnitList &&
      this.getHistoryByUnitList.length > 0
    ) {
      const index = this.getHistoryByUnitList.findIndex(el => el.value == this.$route.params.id)
      this.selectHistory = this.getHistoryByUnitList[index] && this.getHistoryByUnitList[index].name
    }
  },
  methods: {
    ...mapActions('organization/detail', ['setUnitDetail']),
    openModalHistory() {
      this.$modal.show(
        ModalHistory,
        {
          submit: this.addNewHistory,
        },
        {
          name: 'ModalHistory',
          width: '640px',
          height: 'auto',
        },
      )
    },
    changeHistoryByUnit(item) {
      if (this.$route.params.id !== item.value) {
        this.$router.push({ name: constants.ROUTESNAME.UNIT_DETAIL, params: { id: item.value } })
        return
      }

      this.setUnitDetail({
        id: this.$route.params.id,
      })
    },
    addNewHistory() {
      this.selectHistory = ''
      this.unitId = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.choose-history {
  margin-top: 24px;
  margin-bottom: 24px;
  .label {
    margin-bottom: 8px;
  }

  .select-group {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    .select {
      max-width: 528px;
      width: 100%;

      /deep/ .input {
        height: 40px;
        margin-top: 0;
        border: 1px solid #dbdbdb;
        padding-right: 50px;
        text-overflow: ellipsis;

        &:focus-visible {
          outline: unset;
          background: #f0f4f8;
          border: 1px solid #dbdbdb;
        }
      }

      /deep/ .options-container {
        width: calc(100% - 12px);
        position: absolute;
        .option {
          background: #f0f4f8;
          color: #486581;

          .value {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:hover {
            background: #627d98;
            color: #fff;
          }
        }
      }
    }

    .btn {
      &-choose-history {
        padding: 8px;
        color: #fff;
        border-radius: 4px;
        background: #48647f;
        border: 1px solid #48647f;
        font-size: 16px;
        line-height: 20px;
        white-space: nowrap;
        width: 102px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
