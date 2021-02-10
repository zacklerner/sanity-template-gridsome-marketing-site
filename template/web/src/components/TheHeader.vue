<template>
  <header class="header js-header">
    <div class="container">
      <div class="header__inner">
        <div class="header__left">
          <HeaderLogo />
        </div>
        <div class="header__right">
          <TheMenu />

          <div id="headerIcons" class="header__icons">
            <SearchInput />
            <button
              @click="toggleSearch()"
              class="header__icon header__icon--search">
              <BaseIconSearch />
              <span class="icon__text is-hidden">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import HeaderLogo from '~/components/HeaderLogo'
import TheMenu from '~/components/TheMenu'
import SearchInput from '~/components/SearchInput'
import BaseIconSearch from '~/components/BaseIconSearch'

export default {
  components: {
    HeaderLogo,
    TheMenu,
    SearchInput,
    BaseIconSearch
  },
  methods: {
    toggleSearch() {
      const nav = document.getElementById('headerIcons')
      nav.classList.toggle('search--open')

      // Check if it's the browser to avoid Gridsome build errors
      if (typeof window !== 'undefined') {
        const searchInput = document.getElementById('search')
        const theBody = document.body

        if (!nav.classList.contains('search--open')) {
          // Clear the input and close the search overlay
          searchInput.value = ''
          theBody.classList.remove('search-overlay--active')
        } else {
          // Add something to focus the input. Maybe an else?
          searchInput.focus()
        }
      }
    }
  }
}
</script>
<style lang="scss">
.header {
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;

  &__left {
    display: flex;
    align-items: center;
  }

  @include lg {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
    background: var(--color--white);
  }

  &__right {
    display: flex;
    flex-direction: row-reverse;

    @include md {
      flex-direction: row;
    }
  }
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);

  .search-input {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 9;
  }
}

.header__icons {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 15px;

  @include md {
    margin-right: 0;
    margin-left: 10px;
  }
}

.header__icon {
  padding: 0;
  border: none;
  background: transparent;

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
