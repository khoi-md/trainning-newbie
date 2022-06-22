<template>
  <div id="unit-organization" :class="{ 'menu-toggle': getSidebarToggle }">
    <GlobalNavigation
      :isOpenNavigation="!getSidebarToggle"
      :isShowCommentBar="isShowCommentBar"
      @mousOverMemberShare="onMousOverMemberShare"
      @mousLeaveMemberShare="onMousLeaveMemberShare"
      @toggleMenu="handleToggleMenu"
    />
    <SideMenu />
    <router-view></router-view>

    <!-- area tooltip start -->
    <div
      class="ballon-title"
      :class="{ active: flagBallon, reserve: reserveTooltip }"
      id="ballonTitle"
      ref="ballonTitle"
      :style="{
        position: 'fixed',
        display: displayElementShare,
        top: topElementShare,
        left: leftElementShare,
        width: widthElementTooltip,
        zIndex: 999,
      }"
    >
      {{ contentTooltip }}
    </div>
    <!-- area tooltip end -->
  </div>
</template>

<script>
import GlobalNavigation from '@/share/components/GlobalNavigation'
import SideMenu from './components/SideMenu'
import { mapMutations ,mapGetters } from 'vuex'

export default {
  name: 'UnitOrganizationLayout',
  components: {
    GlobalNavigation,
    SideMenu,
  },
  data() {
    return {
      flagBallon: false,
      displayElementShare: 'block',
      topElementShare: '',
      leftElementShare: '',
      widthElementTooltip: 0,
      contentTooltip: '',
      reserveTooltip: false,
      fixedHeightTooltip: 22,
      isShowCommentBar: false,
    }
  },
  computed: {
    ...mapGetters('entry', ['getSidebarToggle'])
  },
  methods: {
    ...mapMutations('entry', ['SET_SIDEBAR_TOGGLE']),
    handleToggleMenu() {
      this.SET_SIDEBAR_TOGGLE(!this.getSidebarToggle)
      this.$emit('toggleMenu', this.getSidebarToggle)
    },
    onMousOverMemberShare({ e, content, rollback }) {
      this.contentTooltip = content
      const idElement = e.target.id
      if (idElement) {
        let div = document.getElementById(idElement)
        const rect = div?.getBoundingClientRect()
        const clientX = rect?.left
        const clientY = rect?.top
        let offsetWidth = content?.length * 16
        if (content?.length > 3) {
          offsetWidth = content?.length * 20
        }
        this.$nextTick(() => {
          this.displayElementShare = 'block'
          this.leftElementShare = clientX + 42 + 'px'
          if (rollback) {
            this.topElementShare = clientY - this.fixedHeightTooltip - 5 + 'px'
          } else {
            this.topElementShare = clientY - this.fixedHeightTooltip + 28 + 'px'
          }
          this.widthElementTooltip = offsetWidth + 'px'
          this.flagBallon = true
          this.reserveTooltip = rollback ? true : false
        })
      }
    },
    onMousLeaveMemberShare(e) {
      this.flagBallon = false
    },
  }
}
</script>

<style lang="scss">
@import '@/share/assets/scss/variables.scss';
@import '@/units/assets/scss/index.scss';

.ballon-title {
  height: 22px !important;
  min-height: unset !important;
  background-color: #5f6479 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  color: #fff !important;
  border-radius: 3px;
  text-align: center;
  padding: 3px 8px !important;
  white-space: nowrap;
  width: fit-content !important;
  visibility: hidden;
  z-index: 100;

  &.active {
    visibility: visible;
  }

  .arrow {
    background: $color-grey-f8;
    border-bottom-color: $color-grey-f8;
    border: 1px solid $color-grey-dc;
    -webkit-transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
    transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
    width: 8px;
    height: 8px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -8px;
    border-top: none;
    border-right: none;
    top: -5px;
    left: 15px;
    position: absolute;
  }

  &.reserve {
    .arrow {
      background: $color-grey-f8;
      border-bottom-color: $color-grey-f8;
      border: 1px solid $color-grey-dc;
      -webkit-transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
      transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
      width: 8px;
      height: 8px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: -8px;
      border-bottom: none;
      border-left: none;
      top: 30px;
      left: 15px;
      position: absolute;
    }
  }
}
</style>