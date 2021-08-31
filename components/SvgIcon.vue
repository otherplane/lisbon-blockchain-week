<template>
  <!-- We are using v-html assuming we never use user-provided content -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div :class="currentClass" v-html="require(`~/assets/svg/${name}.svg?raw`)" />
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    currentClass: { type: String, default: 'disable' },
  },
}
</script>

<style lang="scss">
.fav {
  .fill {
    fill: $blue;
    stroke: transparent;
  }
}

.disable {
  .fill {
    fill: transparent;
    stroke: $grey;
  }
}
</style>
