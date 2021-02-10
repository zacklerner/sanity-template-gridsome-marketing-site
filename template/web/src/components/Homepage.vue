<template>
  <Layout>
    <div class="container">
      <section class="home-hero-video">
        <HeroVideo
          :videoSrc="content.heroVideo"
          :videoPoster="content.heroPoster"
        />
      </section>
      <div class="intro-text" v-if="content._rawIntroText">
        <BaseBlockContent :blocks="content._rawIntroText" />
      </div>
      <section class="home-gallery" v-if="content.imageGallery.length > 0">
        <BaseSlider :images="content.imageGallery" />
      </section>
    </div>
  </Layout>
</template>

<style lang="scss">
.intro-text,
.home-hero-video {
  position: relative;
  margin-bottom: 20px;
}
</style>

<script>
import BaseBlockContent from '~/components/BaseBlockContent'
import HeroVideo from '~/components/HeroVideo'
import BaseSlider from '~/components/BaseSlider'

export default {
  components: {
    BaseSlider,
    BaseBlockContent,
    HeroVideo
  },
  props: {
    content: Object
  }
}
</script>
