<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">{{ post.title }}</h1>

      <PostMeta :post="post" v-if="post" />
    </div>

    <div class="post content-box">
      <div class="post__header">
        <BaseImage
          v-if="post.mainImage"
          :src="post.mainImage"
          :x="16"
          :y="9"
          :columns="1"
          :alt="post.mainImage.alt"
        />
      </div>

      <BaseBlockContent
        class="post__content"
        :blocks="post._rawBody"
        v-if="post._rawBody"
      />

      <div class="post__footer">
        <PostTags :post="post" v-if="post" />
      </div>
    </div>

    <div class="post-comments">
      <!-- Add comment widgets here -->
    </div>

    <AuthorCard class="post-author" />
  </Layout>
</template>

<style lang="scss">
.post-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.post {
  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--color--black);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}

.post-comments {
  padding: calc(var(--space) / 2);

  &:empty {
    display: none;
  }
}

.post-author {
  margin-top: calc(var(--space) / 2);
}
</style>

<script>
import BaseBlockContent from '~/components/BaseBlockContent'
import PostMeta from '~/components/PostMeta'
import PostTags from '~/components/PostTags'
import AuthorCard from '~/components/AuthorCard'
import BaseImage from '~/components/BaseImage'

export default {
  components: {
    BaseImage,
    AuthorCard,
    PostMeta,
    PostTags,
    BaseBlockContent
  },
  props: {
    post: Object
  },
  metaInfo() {
    return {
      title: this.post.title,
      meta: [
        {
          key: 'title',
          name: 'title',
          content: this.post.title
        },
        {
          key: 'description',
          name: 'description',
          content: this.post.description ? this.post.description : this.$static.metadata.siteDescription
        },
        {
          key: 'og:image',
          name: 'og:image',
          content: this.post.mainImage ? this.post.mainImage.asset.url : (this.$static.settings.ogImage ? this.$static.settings.ogImage.asset.url : '')
        },
        {
          key: 'twitter:image',
          name: 'twitter:image',
          content: this.post.mainImage ? this.post.mainImage.asset.url : (this.$static.settings.ogImage ? this.$static.settings.ogImage.asset.url : '')
        },
      ]
    }
  }
}
</script>

<static-query>
{
  metadata {
    sanityOptions {
      projectId
      dataset
    }
    siteDescription
    siteName
  }
  settings: sanitySiteSettings(id: "siteSettings") {
    ogImage {
      asset {
        url
      }
    }
  }
}
</static-query>
