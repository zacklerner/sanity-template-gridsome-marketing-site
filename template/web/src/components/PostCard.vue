<template>
  <div class="post-card content-box" :class="{'post-card--has-poster' : post.poster}">
    <div class="post-card__header">
      <BaseImage
        v-if="post.mainImage"
        class="post-card__image"
        :src="post.mainImage"
        :x="16"
        :y="9"
        :columns="1"
        :alt="post.mainImage.alt"
      />
    </div>
    <div class="post-card__content">
      <h2 class="post-card__title" v-html="post.title" />
      <BaseBlockContent :blocks="post._rawExcerpt" />

      <PostMeta class="post-card__meta" :post="post" />
      <PostTags class="post-card__tags" :post="post" />

      <g-link class="post-card__link" :to="post.slug.current">Link</g-link>
    </div>
  </div>
</template>

<script>
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import BaseBlockContent from '~/components/BaseBlockContent'
import BaseImage from '~/components/BaseImage'

export default {
  components: {
    BaseImage,
    PostMeta,
    PostTags,
    BaseBlockContent
  },
  props: {
    post: Object,
    metadata: Object
  }
}
</script>

<style lang="scss">
.post-card {
  position: relative;

  &__header {
    overflow: hidden;

    &:empty {
      display: none;
    }
  }

  &__image {
    min-width: 100%;
  }

  &__title {
    margin-top: 0;
  }

  &__tags {
    z-index: 1;
    position: relative;
  }

  &__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
}
</style>
