<template>
  <Blog :posts="$page.posts.edges" />
</template>

<script>
import Blog from '~/components/Blog'

export default {
  components: {
    Blog
  },
  metaInfo() {
    return {
      title: 'Hello, world!',
      meta: [
        {
          key: 'title',
          name: 'title',
          content: this.$page.settings.title ? this.$page.settings.title : this.$static.metadata.siteName
        },
        {
          key: 'description',
          name: 'description',
          content: this.$page.settings.description ? this.$page.settings.description : this.$static.metadata.siteDescription
        },
        {
          key: 'og:image',
          name: 'og:image',
          content: this.$page.settings.ogImage ? this.$page.settings.ogImage.asset.url : ''
        },
        {
          key: 'twitter_image',
          name: 'twitter_image',
          cItent: this.$page.settings.twitterImage ? this.$page.settings.twitterImage.asset.url : ''
        }
      ]
    }
  }
}
</script>

<page-query>
{
  metadata {
    siteName
    siteDescription
    sanityOptions {
      projectId
      dataset
    }
  }
  settings: sanitySiteSettings(id: "siteSettings") {
    title
    description
    ogImage {
      asset {
        url
      }
    }
    twitterImage {
      asset {
        url
      }
    }
  }
  posts: allSanityPost(sortBy: "publishedAt") {
    edges {
      node {
        id
        title
        slug {
          current
        }
        categories {
          id
          title
        }
        publishedAt(format: "D. MMMM YYYY")
        _rawExcerpt
        mainImage {
          asset {
            _id
            url
          }
          caption
          alt
          hotspot {
            x
            y
            height
            width
          }
          crop {
            top
            bottom
            left
            right
          }
        }
      }
    }
  }
}
</page-query>
