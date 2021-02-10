<template>
  <figure class="base-image">
    <div
      class="base-image__inner"
      :style="{ paddingBottom: aspectRatio + '%', backgroundImage: `url(${src.asset.url})` }"
    >
      <g-image
        v-if="src.asset != null"
        class="base-image__image"
        v-bind="$gImageMap(src, $static.metadata.sanityOptions, columns)"
      />
    </div>
    <figcaption v-if="caption" class="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script>

export default {
  props: {
    src: Object,
    alt: String,
    caption: String,
    columns: Number,
    x: Number,
    y: Number
  },
  computed: {
    aspectRatio() {
      if (this.x && this.y) {
        return (this.y / this.x) * 100
      } else {
        return 76
      }
    }
  }
}
</script>

<style lang="scss">
.base-image {
  width: 100%;
}

.base-image__inner {
  position: relative;
  padding-bottom: 76%;
  background-color: var(--color--green);
  background-repeat: no-repeat;
  background-size: cover;
}

.base-image__image {
  position: absolute;
  object-fit: cover;
  object-position: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
}
</style>

<static-query>
query {
  metadata {
    sanityOptions{
      projectId
      dataset
    }
  }
}
</static-query>
