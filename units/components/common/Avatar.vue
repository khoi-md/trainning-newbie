<template>
  <div>
    <div class="avatar-wrap">
      <div class="avatar" @click.stop="popup">
        <img :class="{ square: isSquare }" v-if="data.photo && data.photo" :src="data.photo" alt="" />
        <div v-else class="text" :class="[uuidCls, {square: isSquare}]">{{ data.name_face_image }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'search', 'isSquare'],
  computed: {
    uuidCls() {
      const uuid = this.data.uuid || this.data.id
      const result = parseInt(uuid, 16) % 7
      return `pp_avatar-color-${result}`
    },
  },
  methods: {
    popup(event) {
      const uuid = this.data.uuid
      this.$emit('uuid', { uuid, pageY: event.pageY, data: this.data })
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-wrap {
  display: flex;
  align-items: center;
  .name {
    font-size: 16px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 154px;
  }
}
.avatar {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  cursor: pointer;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .text {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fff;
    font-size: 10px;
    border-radius: 50%;
    background-color: #999;
  }

  .square {
    border-radius: 5px;
  }
}
</style>
