<template>
  <!-- https://qvault.io/2020/09/25/how-to-make-a-custom-select-component-in-vue-js/ -->
  <div
    class="base-select"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div
      class="selected"
      :class="{ open: open }"
      @click="open = !open"
    >
      {{ selected }}
    </div>
    <div
      class="items"
      :class="{ selectHide: !open }"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  }
};
</script>

<style lang="scss">
.base-select {
  position: relative;
  width: 100%;
  height: 38px !important;
  max-width: 200px !important;
  text-align: left;
  outline: none;
  line-height: 38px;

  &::after {
    content: none !important;
  }

  .selected {
    border-radius: 0;
    border: 1px solid currentColor;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &:after {
      position: absolute;
      content: "";
      top: 18px;
      right: 1em;
      width: 0;
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color: var(--color--primary) transparent transparent transparent;
      transition: transform .25s ease-out;
      transform-origin: center 2px;
    }

    &.open::after {
      transform: rotate(180deg);
    }
  }

  .items {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background: var(--color--white);

    div {
      padding-left: 1em;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--color--white);
        background-color: var(--color--primary);
      }
    }
  }
}

.selectHide {
  display: none;
}
</style>
