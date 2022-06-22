<template>
  <div class="postal_code-group">
    <input
      v-model="postal_code"
      v-only-numbers
      type="text"
      class="input"
      maxLength="7"
      :placeholder="$t('unit.organization.detail.placeholder.half_size')"
      @input="handleInput"
      @keydown.enter="getPostalCodeAPI"
    />
    <div class="btn btn-get" :class="{ disabled: !postal_code }" @click="getPostalCodeAPI">
      {{ $t('unit.organization.detail.button.address_acquisition') }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { OnlyNumber } from '@/units/directives/onlyNumbers'

export default {
  props: {
    value: {
      default: '',
    },
  },
  directives: {
    OnlyNumber,
  },
  data() {
    return {
      postal_code: '',
    }
  },
  computed: {
    ...mapGetters('organization/detail', ['getDataDetail']),
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.postal_code = val
      }
    },
  },
  methods: {
    ...mapActions('organization/detail', ['setPostalCode']),
    getPostalCodeAPI() {
      if (this.postal_code) {
        this.setPostalCode(this.postal_code)
      }
    },
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.postal_code-group {
  display: flex;
  gap: 16px;

  .input {
    max-width: 200px;
    height: 40px;
    border-radius: 4px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .btn-get {
    width: 112px;
    font-weight: 400;
    padding-top: 8px;
    &.disabled {
      background-color: #dcdcdc;
      border: 1px solid #dcdcdc;
    }
  }
}
</style>
