<template>
  <section class="base-slider" v-if="images.length">
    <div class="base-slider__pagination-wrapper">
      <div class="swiper-nav swiper-nav--mobile">
        <span class="swiper-prev"></span>
        <span class="swiper-next"></span>
      </div>
      <div class="base-slider__pagination swiper-pagination"></div>
    </div>
    <swiper
      class="swiper"
      :options="swiperOption"
      @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
    >
      <swiper-slide
        v-for="image in images"
        :key="image._key"
        :data-caption="image.caption"
      >
        <BaseImage
          :src="image"
          :columns="1"
          :x="776"
          :y="517"
          :alt="image.alt"
        />
      </swiper-slide>
    </swiper>
    <div class="base-slider__info-wrapper">
      <div class="swiper-nav swiper-nav--desktop">
        <span class="swiper-prev"></span>
        <span class="swiper-next"></span>
      </div>
      <div class="base-slider__caption">{{ activeCaption }}</div>
    </div>
  </section>
</template>

<style lang="scss">
.base-slider {
  .swiper {
    width: 100%;

    .swiper-slide {
      width: 80%;
      margin-right: 20px;
      margin-bottom: 15px;
    }
  }

  .swiper-nav {
    @include noselect;

    position: relative;
    min-width: 54px;

    .swiper-prev,
    .swiper-next {
      @include noselect;

      display: inline-block;
      width: 15px;
      height: 15px;
      border-top: 2px solid;
      border-right: 2px solid;
      outline: none;
      cursor: pointer;
      transform: rotate(45deg);
    }

    .swiper-prev {
      transform: rotate(-135deg);
    }

    &--mobile {
      margin-bottom: 10px;

      @include lg {
        display: none;
      }
    }

    &--desktop {
      display: none;

      @include lg {
        display: inline-block;
      }
    }
  }
}

.base-slider__pagination-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  z-index: 1;
}

.base-slider__pagination {
  width: unset;
  position: static;

  @include lg {
    margin-bottom: 12px;
    margin-left: auto;
  }
}

.base-slider__info-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import BaseImage from '~/components/BaseImage'

export default {
  components: {
    Swiper,
    SwiperSlide,
    BaseImage
  },
  props: {
    images: Array
  },
  data() {
    return {
      activeCaption: '',
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
              '/' +
              '<span class="' + totalClass + '"></span>';
          }
        },
        threshold: 4
      }
    }
  },
  methods: {
    onSwiperSlideChangeTransitionStart() {
      this.getActiveCaption()
    },
    getActiveCaption() {
      [...document.getElementsByClassName('swiper-slide')].forEach((element) => {
        let classes = element.classList
        if (classes.contains('swiper-slide-active') ) {
          const captionData = element.getAttribute('data-caption')
          // console.log('CAPTION:', captionData)
          this.activeCaption = captionData
        }
      })
    },
  },
  mounted() {
    this.getActiveCaption()
  }
}
</script>
