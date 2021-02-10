<template>
  <div class="menu" v-if="$static.settings.mainNavigation.length > 0">
    <button v-if="isMobile" class="menu__toggle-slideout" role="button" @click.prevent="toggleMenu"></button>
    <div v-if="isMobile" class="menu__overlay" @click.prevent="closeMenu"></div>
    <ul class="menu__primary">
      <li class="menu__item" v-for="(item, index) in $static.settings.mainNavigation" :key="index">
        <g-link
          class="menu__link h3"
          :to="item.menuLink"
          v-html="item.menuText"
          :target="[item.newTab ? '_blank' : '_self']"
          :rel="[item.newTab ? 'noopener noreferrer' : '']"
        ></g-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.menu__primary {
  padding: 30px;

  @include md-down {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: var(--color--white);
    transform: translate(100%, 0);
    transition: transform 0.3s ease;
  }

  @include md {
    display: flex;
    padding: 0;
  }
}

.menu__item {
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  @include md {
    margin-bottom: 0;
  }
}

a.menu__link {
  color: var(--color--primary);
  text-decoration: none;

  &.active--exact,
  &:hover {
    color: var(--color--secondary-dk);
  }

  @include md {
    padding: 0 15px;
  }
}

.menu__toggle-slideout {
  position: relative;
  z-index: 9999;
  width: 30px;
  height: 20px;
  border-width: 1px 0;
  background: var(--color--white);

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--color--primary);
  }

  .is-toggle-menu & {
    position: absolute;
    top: 20px;
    left: 255px;
    border: none;

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--color--primary);
      transform: rotate(-45deg);
    }
  }
}

.menu__overlay {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color--black03);
}

.is-toggle-menu {
  .menu__primary {
    transform: translate(0, 0);
    transition: transform 0.3s ease;
    z-index: 999;
  }

  .menu__overlay {
    display: block;
  }
}
</style>
<script>
export default {
  data () {
    return {
      toggleClass: 'is-toggle-menu',
      breakpoint: 767,
      isMobile: false
    }
  },
  watch: {
    '$route': 'closeMenu'
  },
  mounted () {
    this.checkMobile()

    window.addEventListener('resize', () => {
      this.checkMobile()
      this.closeMenu()
    })
  },
  methods: {
    toggleMenu () {
      document.body.classList.toggle(this.toggleClass)
    },
    closeMenu () {
      document.body.classList.remove(this.toggleClass)
    },
    checkMobile () {
      this.isMobile = window.innerWidth < this.breakpoint
    }
  }
}
</script>
<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  settings: sanitySiteSettings(id: "siteSettings") {
    title
    description
    mainNavigation {
      menuText
      menuLink
      newTab
    }
    author {
      name
      image {
        asset {
          _id
          url
        }
        hotspot {
          x
          y
          width
          height
        }
        crop {
          top
          left
          right
          bottom
        }
      }
    }
  }
}
</static-query>
