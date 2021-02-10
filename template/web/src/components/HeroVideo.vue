<template>
  <div
    class="hero-video__wrapper js-hero"
    :class="{'has-video': hasVideo}"
    id="heroVideoWrapper"
  >
    <div class="hero-video__content">
      <button class="hero-video__play-button play-button" v-if="hasVideo" @click="playPause"><span></span> Play Video</button>
    </div>
    <div class="hero-video__poster">
      <BaseImage
        v-if="videoPoster"
        :src="videoPoster"
        :x="16"
        :y="9"
        :columns="1"
        :alt="videoPoster.alt"
      />
    </div>
    <div class="hero-video__video" v-if="hasVideo">
      <BaseVideo
        :source="videoSrc"
        :poster="videoPoster.asset.url"
        @ended="onEndedChild"
      />
    </div>
  </div>
</template>

<script>
import BaseVideo from '~/components/BaseVideo'
import BaseImage from '~/components/BaseImage'

export default {
  components: {
    BaseVideo,
    BaseImage
  },
  props: {
    videoSrc: String,
    videoPoster: Object
  },
  data () {
    return {
      breakpoint: 1023
    }
  },
  computed: {
    hasVideo () {
      return (this.videoSrc !== null)
    }
  },
  mounted () {
    this.heroImageHeight()
    window.addEventListener('resize', this.heroImageHeight)
  },
  methods: {
    playPause () {
      let vid = document.getElementById('Video')
      let wrapper = document.getElementById('heroVideoWrapper')
      if (wrapper.classList.contains('video--playing')) {
        vid.pause()
        wrapper.classList.remove('video--playing')
      } else {
        // this.fullScreen()
        vid.play()
        vid.setAttribute("controls","controls")
        vid.muted = !vid.muted
        vid.currentTime = 0
        wrapper.classList.remove('video--ended')
        wrapper.classList.add('video--playing')
      }
    },
    onEndedChild () {
      let wrapper = document.getElementById('heroVideoWrapper')
      wrapper.classList.remove('video--playing')
      wrapper.classList.add('video--ended')
    },
    heroImageHeight () {
      const windowHeight = window.innerHeight
      const headerEl = document.querySelector('.js-header')
      const videoHero = document.getElementById('heroVideoWrapper')
      if (videoHero && (window.innerWidth > this.breakpoint) && !this.hasVideo) {
        videoHero.style.height = headerEl ? (windowHeight - headerEl.clientHeight + 'px') : `${windowHeight}px`
      } else {
        videoHero.style.height = 'auto'
      }
    }
  }
}
</script>

<style lang="scss">
.hero-video__wrapper {
  position: relative;
  display: flex;

  &::before {
    content: '';
    display: block;
    padding-bottom: calc(9 / 16 * 100%);
  }

  video {
    height: 100%;
  }

  &.has-video {
    &::before {
      content: none;
    }

    video {
      position: relative;
      outline: none;
    }
  }
}

.hero-video__video {
  display: flex;
  width: 100%;
}

.hero-video__content {
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  color: var(--color--white);

  .video--playing & {
    pointer-events: none;
  }
}

.play-button {
  width: 136px;
  height: 38px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: transparent;
  box-shadow: none;
  border: 2px solid var(--color--white);
  color: var(--color--white);
  transition: all 0.5s ease-in-out;
  outline: none;

  @include lg {
    margin-left: 50px;
    margin-bottom: 50px;
  }

  .video--playing & {
    opacity: 0;
    transform: translateY(30%);
  }
}

.hero-video__wrapper video,
.hero-video__content,
.hero-video__poster,
.hero-video__overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.hero-video__poster {
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;

  @include lg {
    opacity: 1;

    .has-video & {
      opacity: 0;
    }

    .has-video.video--ended & {
      opacity: 1;
    }
  }

  .base-image__inner,
  .base-image {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.video--playing .hero-video__overlay,
.video--playing .hero-video__poster {
  opacity: 0;
}
</style>
