<template>
  <div class="two-way-calendar">
    <ymd
      @changeDate="changTargetDate"
      type="targetDate"
      key="targetDate"
      :value="targetDate"
      :yearEnd="2100"
    />

    <DatepickerInput
      class="date-picker"
      :value="targetDateAll"
      format="yyyy/MM/dd"
      @input="onSelectedDatePicker($event)"
    />
  </div>
</template>

<script>
import DatepickerInput from '@/share/components/inputs/DatepickerInput/DatepickerInput.vue'
import Ymd from '@/advanced-search2/components/advanced-search/YMD.vue'
import {
  getDateObjHelp,
  dateObjToStrHelp,
} from '@/advanced-search2/components/advanced-search/help'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    DatepickerInput,
    Ymd,
  },
  props: {
    isDetail: {
      default: false,
    },
  },
  data() {
    return {
      targetDate: '',
      targetDateAll: '',
      maxDate: new Date('2100-12-31'),
      minDate: new Date('1900-01-01'),
    }
  },
  computed: {
    ...mapGetters('organization/detail', ['getDataDetail', 'getDataCreate']),
  },
  watch: {
    'getDataDetail.UnitHistory.start_date': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.onSelectedDatePicker(val)
        }
      },
      deep: true,
    },
    targetDate(val) {
      if (val) {
        const newData = {
          ...this.getDataCreate,
          Unit: {
            ...this.getDataCreate.Unit,
            active_start_date: val,
          },
        }
        this.SET_DATA_CREATE(newData)
        this.$emit('selected', val)
      }
    },
  },
  mounted() {
    if (this.isDetail && this.getDataDetail.UnitHistory) {
      this.onSelectedDatePicker(this.getDataDetail.UnitHistory.start_date)
    }
  },
  methods: {
    ...mapMutations('organization/detail', ['SET_DATA_CREATE']),
    async changTargetDate(obj) {
      let targetDate = this.targetDate
      const targetDateObj = getDateObjHelp(targetDate)
      const { type, value } = obj.data
      targetDateObj[type] = value
      if (type === 'year' || type === 'month') {
        targetDateObj['day'] = ''
      }
      this.targetDate = dateObjToStrHelp(targetDateObj)

      if (this.targetDate.length !== 10) {
        return
      }
    },
    onSelectedDatePicker(date) {
      this.targetDate = date
    },
  },
}
</script>

<style lang="scss" scoped>
.two-way-calendar {
  display: flex;
  align-items: center;

  .icon-calendar {
    margin-left: 12px;
    position: relative;
    top: 2px;
    cursor: pointer;
  }

  .date-picker {
    /deep/ .input-container {
      border: 0;
      padding-left: 0;

      &:focus {
        box-shadow: none;
      }
    }
    /deep/ .content {
      display: none;
    }

    /deep/ .calendar-icon {
      color: #333;
    }
  }
}
</style>
