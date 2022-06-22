<template>
  <div class="side-bar">
    <PerfectScrollbar>
      <ul>
        <li>
          <a @click="$router.replace(`/discovery/`)">
            <img src="@/discovery/assets/hr-data/sideBarIcon01.svg" />
          </a>
        </li>
        <li>
          <a class="disabled"><img src="@/discovery/assets/hr-data/sideBarIcon02.svg"/></a>
        </li>
        <li>
          <a @click="$router.replace(`/discovery/list`)">
            <img src="@/discovery/assets/hr-data/sideBarIcon03.svg" />
          </a>
        </li>
        <li>
          <a class="current"><img src="@/discovery/assets/hr-data/sideBarIcon04.svg"/></a>
        </li>
        <li>
          <a class="disabled"><img src="@/discovery/assets/hr-data/sideBarIcon05.svg"/></a>
        </li>
        <li>
          <a class="disabled"><img src="@/discovery/assets/hr-data/sideBarIcon06.svg"/></a>
        </li>
      </ul>
    </PerfectScrollbar>
    <div class="border" />
    <div class="side-bar_toggle">
      <button @click="sideBarToggle">
        <i class="icf-ArrowCircleLeft" v-if="!getSidebarToggle" />
        <i class="icf-ArrowCircleRight" v-else />
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      menuOpen: false,
    }
  },
  computed: {
    ...mapGetters('entry', ['getSidebarToggle']),
  },
  methods: {
    ...mapMutations('entry', ['SET_SIDEBAR_TOGGLE']),
    sideBarToggle() {
      this.$emit('sideBarToggle')
      this.SET_SIDEBAR_TOGGLE(!this.getSidebarToggle)
    },
  },
}
</script>

<style lang="scss" scoped>
.ps {
  height: 488px;
}
.side-bar {
  position: fixed;
  top: 64px;
  left: 0;
  width: 80px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #dcdcdc;
  z-index: 3;

  ul {
    margin-top: 26px;
    text-align: center;
    li {
      width: 100%;
      text-align: center;
      background-color: #fff;
      a {
        display: block;
        padding: 4px 0;
        &.current,
        &:hover {
          background-color: #e7f1fd;
        }
        &.disabled {
          pointer-events: none;
        }
        img {
          width: 100%;
          max-width: 32px;
        }
      }
    }
    li + li {
      margin-top: 32px;
    }
  }

  .border {
    width: 32px;
    height: 1px;
    margin: 0 auto;
    background-color: #dcdcdc;
  }

  &_toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% - 488px);

    button {
      width: 24px;
      height: 24px;
      padding: 0;
      color: #999;
      background-color: transparent;
      border-radius: 0;
      i {
        font-size: 24px;
      }
    }
  }
}
</style>
