<template>
  <Layout>
    <TheLoadingAnimation />
    <TheHeader />
    <main class="main">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>

    <TheFooter />
  </Layout>
</template>

<script>
import TheLoadingAnimation from '~/components/TheLoadingAnimation'
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'

export default {
  props: {
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TheLoadingAnimation,
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
.main {
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 calc(var(--space) / 2);
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
