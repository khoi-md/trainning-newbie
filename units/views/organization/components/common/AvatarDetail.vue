<template>
  <div class="avatar">
    <Avatar :data="value" :isSquare="true" />
    <div class="avatar-content">
      <div class="name">
        <span class="unit">{{ value.unit_name || '石原 由梨' }}</span>
        <span class="code">({{ value.job_pos || '123456789' }})</span>
      </div>
      <div class="part">
        {{ value.unit_part || '副本部長' }}
      </div>
      <div class="position">
        {{ value.unit_position || 'HR企画チーム' }}
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/units/components/common/Avatar'

export default {
  components: {
    Avatar,
  },
  props: {
    value: {
      default: () => {
        return {
          id: '',
          job_pos: '',
          name: '',
          name_face_image: '',
          photo: '',
          start_date: '',
          end_date: '',
          uuid: '',
        }
      },
    },
  },
  data() {
    return {
      isSquare: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  gap: 10px;
  align-items: center;

  &-img {
    width: 48px;
    height: 48px;
    border-radius: 5px;
  }
  &-content {
    color: #333;

    .name {
      display: flex;
      
      .code {
        font-size: 12px;
        color: #666;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
