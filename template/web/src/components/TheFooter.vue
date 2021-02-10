<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__info">
          <BaseImage
            v-if="$static.settings.logo"
            class="footer__logo"
            :src="$static.settings.logo"
            :x="215"
            :y="81"
            :columns="1"
            alt=""
          />
          <p class="footer__copyright">Copyright © {{ new Date().getFullYear() }}.</p>
          <BaseBlockContent
            class="footer__content"
            :blocks="$metaInfo.infoText"
            v-if="$metaInfo.infoText"
          />
        </div>
        <ul class="footer__menu" v-if="$metaInfo.footerNavigation.length > 0">
          <li class="footer__menu-item" v-for="(item, index) in $metaInfo.footerNavigation" :key="index">
            <g-link
              class="footer__menu-link link"
              :to="item.menuLink"
              v-html="item.menuText"
              :target="[item.newTab ? '_blank' : '_self']"
              :rel="[item.newTab ? 'noopener noreferrer' : '']"
            ></g-link>
          </li>
        </ul>
        <div class="footer__social">
          <h3 class="footer__label">Follow Us</h3>
          <ul class="footer__social-menu">
            <li v-for="(social, index) in $metaInfo.socials" :key="index" class="footer__social-item">
              <a class="footer__social-link" :href="social.socialUrl" target="_blank" rel="noopener noreferrer"><g-image :src="social.image.asset.url" alt /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import BaseBlockContent from '~/components/BaseBlockContent'
import BaseImage from '~/components/BaseImage'


export default {
  components: {
    BaseBlockContent,
    BaseImage
  },
  metaInfo () {
    return {
      infoText: this.$static.settings._rawInfo,
      footerNavigation: this.$static.settings.footerNavigation,
      socials: this.$static.settings.socialFooter
    }
  }
}
</script>
<style lang="scss">
.footer {
  padding: 30px calc(var(--space) / 2);
}
.footer__inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 30px;
  border-top: 1px solid var(--color--gray-lt);

  @include md {
    flex-direction: row;
  }
}
.footer__info {
  order: 1;
  width: 100%;

  @include md {
    order: 0;
    width: calc(3 / 10 * 100%);
  }
}
.footer__menu {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 25px;

  @include md {
    width: calc(5 / 10 * 100%);
    margin-bottom: 0;
    padding-left: 30px;
  }
}
.footer__menu-item {
  width: 50%;

  &:nth-child(odd) {
    padding-right: 20px;
  }

  @include md {
    width: calc(1 / 3 * 100%);
    padding-right: 20px;
  }
}
.footer__social {
  width: 100%;

  @include md {
    width: calc(2 / 10 * 100%);
    margin-bottom: 0;
  }
}
.footer__social-menu {
  display: flex;
  margin-bottom: 25px;

  @include md {
    margin-bottom: 0;
  }
}
.footer__social-item {
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-right: 15px;
  }
}
.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer__content a {
  font-size: inherit;
  line-height: inherit;
  color: var(--color--black);
}
a.footer__menu-link {
  @include paragraph;
  text-decoration: none;
  color: var(--color--black);

  &:hover {
    text-decoration: underline;
  }
}
.footer__logo {
  width: 125px;
  margin-bottom: 15px;
  @include md {
    margin-bottom: 20px;
  }
}
.footer__label {
  margin-bottom: 15px;

  @include md {
    margin-bottom: 15px;
  }
}
</style>
<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }

  settings: sanitySiteSettings(id: "siteSettings") {
    logo {
      asset {
        url
      }
    }
    _rawInfo
    footerNavigation {
      menuText
      menuLink
      newTab
    }
    socialFooter {
      socialUrl
      image {
        asset {
          url
        }
      }
    }
  }
}
</static-query>
