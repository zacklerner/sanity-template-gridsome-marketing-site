<template>
  <video
    width="100%"
    :poster="poster"
    id="Video"
    @ended="onEnd()"
    autoplay="autoplay"
    muted
  >
    <source v-if="source" :src="source" type="video/mp4">
    <!-- <source v-if="mp4Source" :src="mp4Source" type="video/mp4">
    <source v-if="oggSource" :src="oggSource" type="video/ogg">
    <source v-if="webmSource" :src="webmSource" type="video/webm"> -->
    Your browser does not support the video tag or the file format of this video. Sorry :(
  </video>
</template>

<script>
export default {
  props: {
    source: String,
    // mp4Source: String,
    // oggSource: String,
    // webmSource: String,
    poster: String
  },
  methods: {
    onEnd (event) {
      this.$emit('ended')
    }
  }
}
</script>
