<template>
  <div :class="classObj"
       class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside" />

    <div class="content-container">

      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div v-if="showHeader"
             class="header-container">
          <Header></Header>
        </div>
        <div :class="{'fixed-header':fixedHeader}">
          <navbar v-if="showNavbar" />
        </div>
        <app-main />
      </div>
    </div>
     <el-backtop target=".content-container"></el-backtop>
  </div>
</template>

<script>
import { Header, Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Header,
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      showHeader: state => state.settings.showHeader,
      showNavbar: state => state.settings.showNavbar,
      showTagsview: state => state.settings.showTagsview
    }),
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    fixedHeader () {
      return this.$store.state.settings.fixedHeader
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "~@/styles/mixin.scss";
// @import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  /* add by lct on 20190717 */
  display: flex;
  flex-direction: column;

  .content-container {
    flex: 1;
    position: relative;
  }
  /* add by lct on 20190717 */

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .myaudio {
    position: fixed;
    top: -10000px;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.main-container{
  // background: url("../assets/img/mainBg.png");
  background: #fff;
}
</style>
