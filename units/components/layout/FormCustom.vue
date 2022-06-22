<template>
  <ValidationProvider
    :rules="`${required ? 'required' : ''}|${rules}`"
    :name="name || label"
    v-slot="{ errors }"
    tag="div"
    class="form-input"
    :class="{ 'no-label': noLabel }"
  >
    <label class="label" :for="label">
      <div class="tag-required" v-if="required">
        {{ $t('unit.organization.detail.tag.required') }}
      </div>
      {{ label }}
    </label>
    <div :class="{ 'error-form': errors[0] || errorRuleOutSide }">
      <slot></slot>
    </div>
    <div class="error" v-if="errorContent">
      {{ errorContent }}
    </div>
    <div class="error" v-if="errors[0]">
      {{ errors[0] }}
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import i18n from '@/units/i18n'

export default {
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      default: '',
    },
    label: {
      default: '',
    },
    value: {
      default: '',
    },
    required: {
      default: false,
    },
    isHorizontal: {
      default: false,
    },
    error: {
      default: '',
    },
    rules: {
      default: '',
    },
    rulesOutside: {
      default: true,
    },
    noLabel: {
      default: false,
    },
  },
  data() {
    return {
      errorRuleOutSide: false,
    }
  },
  computed: {
    errorContent() {
      return this.error && this.errorRuleOutSide ? this.error : ''
    },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.content = val
      }
    },
    rulesOutside(val) {
      this.errorRuleOutSide = !!val
    },
  },
}
</script>

<style lang="scss" scoped>
.form-input {
  margin-top: 24px;
  margin-bottom: 24px;

  .label {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
    color: #333;
  }

  .tag-required {
    width: 42px;
    height: 18px;
    color: #fff;
    background: #627d98;
    font-size: 12px;
    font-weight: bold;
    line-height: 16px;
    padding: 0 8px;
    border-radius: 4px;
  }

  .error {
    color: #ed5d5d;
    margin-top: 4px;
  }

}

.no-label {
  .label {
    display: none !important;
  }
}

.error-form {
  font-size: 14px;
  /deep/ input {
    border-color: #ed5d5d;
    &:focus-visible {
      outline: unset;
    }
  }

  /deep/ .cp-dropdown {
    border-color: #ed5d5d;
  }

  /deep/ .select-dropdown {
    border-color: #ed5d5d;
  }

  /deep/ .dropdown {
    .wrap {
      border-color: #ed5d5d;
    }
  }
}
</style>
