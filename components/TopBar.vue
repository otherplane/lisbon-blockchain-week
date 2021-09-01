<template>
  <div class="bar">
    <h1 class="title">
      <SvgIcon name="LBW" />
    </h1>
    <Button>Submit event</Button>
  </div>
</template>

<style lang="scss" scoped>
.bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  .title {
    color: $blue;
  }
}

@media (max-width: 1200px) {
  .title {
    padding-bottom: 24px;
  }
}
</style>
