<template>
  <div class="input-have-unit">
    <input
      v-model="content"
      :type="type"
      class="input"
      :class="classInput"
      :style="styleInput"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <div class="unit">{{ unitName }}</div>
  </div>
</template>

<script>
import i18n from '@/units/i18n'

export default {
  props: {
    classInput: {
      default: '',
    },
    styleInput: {
      default: '',
    },
    unitName: {
      default: i18n.t('unit.organization.detail.name'),
    },
    placeholder: {
      default: '',
    },
    value: {
      default: '',
    },
    type: {
      default: 'number',
    },
  },
  data() {
    return {
      content: '',
    }
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.content = val
      }
    },
  },
  created() {
    if (this.value) {
      this.content = this.value
    }
  },
  methods: {
    handleInput(e) {
      this.content = e.target.value
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-have-unit {
  display: flex;
  align-items: center;
  gap: 4px;

  .unit {
    font-weight: bold;
  }

  .input::-webkit-outer-spin-button,
  .input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input[type=number] {
    -moz-appearance: textfield;
  }
}
</style>