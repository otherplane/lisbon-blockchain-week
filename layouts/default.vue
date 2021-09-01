<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
<style lang="scss">
html {
  background-color: $beige;
  font-family: 'SourceCode-Light', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
