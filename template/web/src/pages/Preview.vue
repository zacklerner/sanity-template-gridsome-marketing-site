<template>
  <Layout>
    <div class="preview-watermark">Preview!</div>
    <Post
      v-if="previewData && previewData._type == 'post'"
      :post="previewData"
    />
    <Homepage
      v-if="previewData && previewData._type == 'homepage'"
      :content="previewData"
    />
  </Layout>
</template>

<script>
import Post from '~/components/Post'
import * as queryString from 'query-string'
import sanityClient from '@sanity/client'
import Homepage from '~/components/Homepage'

const clientConfig = require('../../client-config')

const client = sanityClient({
  ...clientConfig.sanity,
  useCdn: false,
  withCredentials: true
})

export default {
  metaInfo: {
    title: 'Previews',
    titleTemplate: '%s | Gridsome Blog Starter',
    meta: [
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  },
  components: {
    Post,
    Homepage
  },
  data () {
    return {
      previewData: null
    }
  },
  async mounted () {
    const query = queryString.parse(location.search);
    const { pageId, isDraft } = query;
    const id = query.pageId
    const queryDraft = `*[_id == "${id}"] { ... }`

    try {
      const results = await client.fetch(queryDraft)
      this.previewData = results[0]
      console.log('preview data:', this.previewData)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss">
.preview-watermark {
  @include h1;
  text-align: center;
}
</style>
