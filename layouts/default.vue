<template>
  <div class="MainPopso">
    <div class="layouts" :class="{ layoutsHide: !layout }">
      <nuxt-link to="/">
        <img v-if="layout" src="@/assets/images/logo.svg" alt="popso" />
        <img v-else src="@/assets/images/Plogo.svg" alt="popso" />
      </nuxt-link>
      <div class="buttonArrow" :class="{ turn: !layout }" @click="hideLayouts">
        <img src="@/assets/images/arrow.svg" alt="popsoLogo" />
      </div>
      <app-navbar />
    </div>
    <div class="mobileLayout">
      <div class="mobileLayoutMain">
        <svg
          width="20"
          height="10"
          viewBox="0 0 20 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="mobileLayout = !mobileLayout"
        >
          <rect width="20" height="2" fill="#BD0D22" />
          <rect y="8" width="20" height="2" fill="#BD0D22" />
        </svg>

        <img
          class="mobileLayout--logo"
          src="@/assets/images/logo.svg"
          alt="popso"
        />
      </div>
      <div v-if="mobileLayout" class="MobileMenu">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          class="MobileMenu--item"
          :to="link.to"
          >{{ link.title }}</NuxtLink
        >
      </div>
    </div>
    <main class="content">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppNavbar from '@/components/AppNavBar.vue'
export default {
  components: {
    AppNavbar,
  },
  data: () => ({
    links: [
      { title: 'Мой профиль', to: '/' },
      { title: 'Список задач', to: '/task' },
      { title: 'Статистика', to: '/statistics' },
    ],
    windowWidth: 0,
    mobileLayout: false,
  }),
  watch: {
    windowWidth() {
      if (this.windowWidth <= 1040 && this.layout)
        this.$store.commit('layout/setLayout')
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)

      this.getWindowWidth()
    })
  },
  computed: {
    ...mapGetters({
      layout: 'layout/layout',
    }),
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    hideLayouts() {
      this.$store.commit('layout/setLayout')
    },
  },
}
</script>

<style>
.mobileLayout {
  display: none;
  background: white;
  flex-flow: column;
  min-height: 64px;

  width: 100%;
  padding: 0 22px;
}
.mobileLayoutMain {
  height: 100%;
  display: flex;
  margin-top: 20px;
  align-items: center;
}

.MobileMenu {
  display: flex;
  flex-flow: column;
  text-align: center;

  margin-top: 20px;

  transition: 0.5s, display 1s;
}

.MobileMenu--item {
  margin: 5px 0;
  font-weight: 500;
}

.MainPopso {
  display: flex;
}
.layouts {
  position: relative;
  width: 256px;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 24px;
  transition: width 0.3s;
  -moz-transition: width 0.3s;
  -webkit-transition: width 0.3s;
}

.buttonArrow {
  position: absolute;
  right: -20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  background: #ffffff;
  border-radius: 100%;
  cursor: pointer;
  transition: 0.3s ease all;
  -moz-transition: 0.3s ease all;
  -webkit-transition: 0.3s ease all;
  transform: rotate(180deg);
}
.buttonArrow:hover {
  transform: scale(1.1);
  transform: rotate(0);
}

.content {
  background: #eff1f9;
  width: 100%;
  height: 100vh;
  padding: 60px 0;
}
.layoutsHide {
  width: 80px;
}
.turn {
  transform: rotate(0deg);
}
.turn:hover {
  transform: rotate(180deg);
}

@media (max-width: 991px) {
  .buttonArrow {
    display: none;
  }
}
@media screen and (max-width: 450px) {
  .layouts {
    display: none;
  }
  .MainPopso {
    display: block;
  }
  .mobileLayout {
    display: flex;
  }
  .mobileLayout--logo {
    width: 100px;
    margin: 0 46px;
  }
  .content {
    padding: 30px 0;
  }
}
</style>
