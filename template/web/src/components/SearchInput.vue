<template>
  <ClientOnly>
    <div class="search-input">
      <label for="search" class="is-hidden"></label>
      <input
        id="search"
        v-model="searchTerm"
        class="search-input__field"
        type="text"
        placeholder="Search..."
        :change="updateResults(searchResults)"
      />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.search-input__field {
  width: 100%;
  margin: 0;
  padding: 1px 2px;
  line-height: unset;
}
.search--open .search-input {
  opacity: 1;
  width: 200px;
}
.search-input {
  display: flex;
  width: 0;
  height: 30px;
  margin-left: 20px;
  opacity: 0;
  transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out;
  overflow: hidden;
}
body.search-overlay--active,
body.page--secondary {
  .search-input__field,
  .search-input__field:focus {
    color: var(--color--primary);
  }
}
</style>

<script>
import { store } from '~/store.js'

export default {
  data() {
    return {
      searchTerm: ''
    }
  },
  computed: {
    searchResults () {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 1) return []
      return this.$search.search({ query: searchTerm, limit: 0 })
    }
  },
  methods: {
    updateResults(searchResults) {
      if (typeof window !== 'undefined') {
        const theBody = document.body
        if (this.searchTerm != '') {
          theBody.classList.add('search-overlay--active')
        } else {
          theBody.classList.remove('search-overlay--active')
        }
      }
      return store.updateResults(searchResults)
    }
  },
}
</script>
