<template>
  <tr>
    <td>
      <AvatarDetail :value="item" />
    </td>
    <td>
      <span>{{ dateFormat(item.start_date) || '-' }}</span>
    </td>
    <td>
      <span>{{ dateFormat(item.end_date) || '-' }}</span>
    </td>
    <td>
      <span class="status">{{ item.status || '-' }}</span>
    </td>
    <td>
      <div @click="openModalDelete" class="btn btn-remove">
        {{ $t('unit.organization.detail.button.remove') }}
      </div>
    </td>
  </tr>
</template>
<script>
// import { mapMutations, mapGetters } from 'vuex'
import AvatarDetail from '../common/AvatarDetail'
import mixin from '@/units/mixins/mixin'
import ModalRemoveUnitManager from '../modal/ModalRemoveUnitManager'

export default {
  components: { 
    AvatarDetail,
    ModalRemoveUnitManager,
  },
  mixins: [mixin],
  props: {
    item: {
      type: Object,
    },
  },

  watch: {
  },
  computed: {
    
  },
  methods: {
    openModalDelete() {
      this.$modal.show(
        ModalRemoveUnitManager,
        {
          id: this.item.id,
        },
        {
          name: 'ModalRemoveUnitManager',
          width: '480px',
          height: 'auto',
        },
      )
    }
  },
}
</script>
<style lang="scss" scoped>
td {
  border-radius: 0px 4px 0px 0px;
  padding: 12px;
  border: 1px solid #e4e7eb;
  border-left: 0;
  border-right: 0;

  .status {
    background: #f1f5f8;
    border-radius: 10px;
    padding: 0 7px;
    color: #617d98;
  }
}
td.checkbox {
  text-align: center;
}

.btn-remove {
  font-weight: 400;
  height: 32px;
}
</style>
