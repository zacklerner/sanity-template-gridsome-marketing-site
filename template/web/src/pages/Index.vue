<template>
  <Homepage :content="$page.page" />
</template>

<style lang="scss">
.posts {
  flex-wrap: wrap;
}
</style>

<page-query>
{
  metadata {
    sanityOptions {
      projectId
      dataset
    }
    siteDescription
  }
  page: sanityHomepage(id: "10862252-5fa3-11eb-ae93-0242ac130002") {
    title
    heroPoster {
      alt
      asset {
        url
        metadata {
          lqip
        }
      }
    }
    heroVideo
    _rawIntroText
    imageGallery {
      caption
      alt
      asset {
        url
        metadata {
          lqip
        }
      }
    }
    _rawImageGalleryText
  }
}
</page-query>

<script>
import Homepage from '~/components/Homepage'

export default {
  components: {
    Homepage
  },
  metaInfo() {
    return {
      titleTemplate: 'Base',
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$page.page._rawIntroText ? this.$toPlainText(this.$page.page._rawIntroText) : this.$static.metadata.siteDescription
        },
      ],
      bodyAttrs: {
        class: 'home-page loaded'
      }
    }
  }
}
</script>
