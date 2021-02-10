<template>
  <div class="the-loading-animation">
    <LogoMonogram class="the-loading-animation__logo" />
  </div>
</template>

<script>
  import LogoMonogram from '~/components/LogoMonogram'
  export default {
    components: {
      LogoMonogram
    },
    mounted() {
      const wrapper = document.querySelector('.the-loading-animation')
      const theBody = document.body
      theBody.classList.add('loading-animation--active')
      setTimeout(() => wrapper.classList.add('loading'), 500)
      setTimeout(() => wrapper.classList.remove('loading'), 2000)
      setTimeout(() => wrapper.classList.add('leaving'), 2750)
      setTimeout(() => wrapper.classList.add('gone'), 4500)
      setTimeout(() => theBody.classList.remove('loading-animation--active'), 3500)
    }
  }
</script>
<style lang="scss">
  .loading-animation--active {
    overflow-y: hidden;
    height: 100vh;
  }

  .the-loading-animation {
    width: 100vw;
    height: 100vh;
    background-color: var(--color--primary-dk);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 1.5s ease-in-out 0.5s;
  }

  .the-loading-animation__logo {
    opacity: 0;
    transition: opacity 0.5s ease-in-out 0.5s;

    .loading & {
      opacity: 1;
    }
  }

  .leaving {
    opacity: 0;
  }

  .gone {
    display: none;
  }
</style>
