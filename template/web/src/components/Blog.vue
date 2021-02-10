<template>
  <Layout>
    <div class="blog">
      <div class="container">
        <!-- Author intro -->
        <AuthorCard :show-title="true" />

        <div class="f aic blog__filter-wrapper">
          <span class="mr-1">Filler: </span>
          <BaseSelect
            :options="categoryTitles()"
            :default="filterDefault"
            class="select"
            @input="updateFilter($event)"
          />
        </div>

        <!-- List posts -->
        <div class="blog__posts columns" id="blogPosts">
          <div
            class="column is-one-third blog__posts-item"
            v-for="edge in filteredPosts" :key="edge.node.id"
          >
            <PostCard
              :post="edge.node"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<style lang="scss">
.blog__posts {
  flex-wrap: wrap;
}

.blog__filter-wrapper {
  margin-bottom: 20px;
}

.blog__posts-item {
  opacity: 1;
  transition: all 0.5s ease-in-out;

  &:nth-child(2) {
    transition-delay: 0.1s;
  }
  &:nth-child(3) {
    transition-delay: 0.2s;
  }
  &:nth-child(4) {
    transition-delay: 0.3s;
  }
  &:nth-child(5) {
    transition-delay: 0.4s;
  }
  &:nth-child(6) {
    transition-delay: 0.5s;
  }

  .loaded.filtering & {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
<script>
import AuthorCard from '~/components/AuthorCard'
import PostCard from '~/components/PostCard'
import BaseSelect from '~/components/BaseSelect'

export default {
  components: {
    AuthorCard,
    PostCard,
    BaseSelect
  },
  props: {
    posts: Array
  },
  data() {
    return {
      categories: [],
      filterDefault: 'View All',
      viewAll: 'View All',
      currentFilter: this.filterDefault
    }
  },
  computed: {
    filteredPosts() {
      if (this.currentFilter == this.filterDefault || this.currentFilter == this.viewAll) {
        return this.posts
      } else {
        return this.postsOfCategory(this.currentFilter)
      }
    }
  },
  methods: {
    categoryTitles() {
      let postsCopy = [...this.posts]
      let categories = []
      let categoryTitles = []

      postsCopy.forEach((post) => {
        categories.push(post.node.categories)
      })

      categories.flat().forEach((category) => {
        categoryTitles.push(category.title)
      })

      return this.uniqueCategories(categoryTitles)
    },
    uniqueCategories(categories) {
      let categoryArray = []

      categories.forEach((category) => {
        categoryArray.push(category)
      })

      let organizedCategories = [...new Set(categoryArray.sort())]
      organizedCategories.unshift(this.viewAll)

      return organizedCategories
    },
    updateFilter(e) {
      const postWrapper = document.getElementById('blogPosts')

      if (postWrapper && postWrapper.classList.contains('loaded')) {
        postWrapper.classList.add('filtering')
        setTimeout(() => this.currentFilter = e, 750)
        setTimeout(() => postWrapper.classList.remove('filtering'), 800)
      } else {
        this.currentFilter = e
      }
    },
    postsOfCategory(category) {
      return this.posts.filter(post =>
        [...post.node.categories.map(cat => cat.title)].includes(category))
    }
  },
  mounted() {
    const postWrapper = document.getElementById('blogPosts')
    if (postWrapper) {
      setTimeout(() => postWrapper.classList.add('loaded'), 250)
    }
    this.categoryTitles()
  },
  beforeDestroy() {
    const postWrapper = document.getElementById('blogPosts')
    if (postWrapper) {
      postWrapper.classList.remove('loaded')
    }
  }
}
</script>
