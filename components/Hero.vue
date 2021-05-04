<template>
  <div class="hero">
    <img class="logo" src="~/assets/logo.jpg" />
    <h1 class="title">
      {{ $t('hero.title') }}
    </h1>
    <p class="text">{{ $t('hero.date') }}</p>
    <p class="text">{{ $t('hero.place') }}</p>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .logo {
    width: 300px;
  }
  .title {
    color: black;
  }

  .text {
    margin-bottom: 1rem;
    max-width: 400px;
  }
}
</style>
