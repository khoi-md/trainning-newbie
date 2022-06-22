<template>
  <div
    class="side-menu"
    :class="{ 'menu-active': getSidebarToggle }"
  >
    <SideMenuTop />
    <SideMenuDepartment />
    <SideMenuSetting />
  </div>
</template>

<script>
import SideMenuTop from './side-menu/SideMenuTop'
import SideMenuDepartment from './side-menu/SideMenuDepartment'
import SideMenuSetting from './side-menu/SideMenuSetting'
import { mapGetters } from 'vuex'

export default {
  components: {
    SideMenuTop,
    SideMenuDepartment,
    SideMenuSetting,
  },
  computed: {
    ...mapGetters('entry', ['getSidebarToggle'])
  },
}
</script>

<style>
.side-menu {
  position: fixed;
  left: 72px;
  padding: 28px 12px;
  top: 64px;
  width: 240px;
  height: 100%;
  font-size: 18px;
  background: #f8f8f8;
  color: #333;
  transition: all 0.3s;
  z-index: 9;
}

.menu-active {
  left: -168px;
}
</style>
