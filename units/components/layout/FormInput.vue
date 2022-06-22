<template>
  <ValidationProvider
    :rules="`${required ? 'required' : ''}|${rulesOutside}`"
    :name="name || label"
    v-slot="{ errors }"
    tag="div"
    class="form-input"
  >
    <label class="label" :for="label">
      <div class="tag-required" v-if="required">
        {{ $t('unit.organization.detail.tag.required') }}
      </div>
      {{ label }}
    </label>
    <div :class="{ 'error-form': errors[0] }">
      <input
        :name="label"
        v-model="content"
        class="input"
        :placeholder="placeholder"
        @input="change"
      />
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

export default {
  components: {
    ValidationProvider,
  },
  props: {
    name: {
      default: '',
    },
    label: {
      default: 'label',
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
    placeholder: {
      default: '',
    },
    error: {
      default: '',
    },
    rulesOutside: {
      default: '',
    },
  },
  data() {
    return {
      content: '',
      errorRuleOutSide: false,
    }
  },
  computed: {
    errorContent() {
      return this.error && this.errorRuleOutSide ? this.error : ''
    },
    // isValidate() {
    //   return this.error && this.rules
    // },
  },
  watch: {
    value(val, oldVal) {
      if (val !== oldVal) {
        this.content = val
      }
    },
    content(val, oldVal) {
      if (val !== oldVal) {
        this.rules = false
        if (!val) {
          this.rules = true
        }
      }
    },
    rulesOutside(val) {
      this.errorRuleOutSide = !!val
    },
  },
  created() {
    if (this.value) {
      this.content = this.value
    }
  },
  methods: {
    change(event) {
      event.preventDefault()
      this.$emit('change', event.target.value)
      this.$emit('input', event.target.value)
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
}

.error-form {
  font-size: 14px;
  /deep/ input {
    border-color: #ed5d5d;
    &:focus-visible {
      outline: unset;
    }
  }
}
</style>
