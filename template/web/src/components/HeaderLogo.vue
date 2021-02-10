<template>
  <g-link class="logo" to="/" :title="$static.metadata.siteName">
    <h1 hidden>{{ $static.metadata.siteName }}</h1>
    <BaseImage
      v-if="$static.settings.logo"
      class="logo__image"
      :src="$static.settings.logo"
      :x="215"
      :y="81"
      :columns="1"
      alt=""
    />
    <div v-else>
      {{ $static.metadata.siteName }}
    </div>
  </g-link>
</template>

<script>
import BaseImage from '~/components/BaseImage'

export default {
  component: {
    BaseImage
  }
}
</script>
<static-query>
query {
  metadata {
    siteName
  }
  settings: sanitySiteSettings(id: "siteSettings") {
    logo {
      asset {
        url
      }
    }
  }
}
</static-query>

<style lang="scss">
.logo {
  text-decoration: none;

  &__image {
    vertical-align: middle;
    width: 100px;

    @include md {
      width: 155px;
      margin-right: 0.5em;
    }
  }
}
</style>
