<template>
  <div class="common-modal">
    <div class="body">
      <div v-if="!hideClose" class="close-btn" @click="closeModal">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0002 15.0578L21.5288 9.52925C21.7891 9.2689 22.2112 9.2689 22.4716 9.52925C22.7319 9.7896 22.7319 10.2117 22.4716 10.4721L16.943 16.0007L22.4716 21.5292C22.7319 21.7896 22.7319 22.2117 22.4716 22.4721C22.2112 22.7324 21.7891 22.7324 21.5288 22.4721L16.0002 16.9435L10.4716 22.4721C10.2112 22.7324 9.78911 22.7324 9.52876 22.4721C9.26841 22.2117 9.26841 21.7896 9.52876 21.5292L15.0574 16.0007L9.52876 10.4721C9.26841 10.2117 9.26841 9.7896 9.52876 9.52925C9.78911 9.2689 10.2112 9.2689 10.4716 9.52925L16.0002 15.0578Z"
            fill="#666666"
          />
        </svg>
      </div>
      <div class="modal-title" :class="classTitle">
        <slot name="icon"></slot>
        <span v-html="title"></span>
      </div>
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>

<script>

export default {
  components: {},
  name: 'Modal',
  props: ['name', 'title', 'hideClose', 'classTitle'],
  methods: {
    closeModal() {
      this.$modal.hide(this.name)
    },
  },
}
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.common-modal {
  position: relative;
  box-shadow: 0px 4px 20px rgba(102, 102, 102, 0.3);
  border-radius: 2px;
  width: 100%;
  height: auto;
  background-color: #fff;

  .body {
    padding: 32px 32px 24px 32px;
  }

  .modal-title {
    font-size: 24px;
    line-height: 24px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 24px;

  }
  &-bg {
    background: rgba(0, 0, 0, 0.55);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
}
.close-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  opacity: 0.5;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 14px;
    color: #fff;
  }
}
</style>
