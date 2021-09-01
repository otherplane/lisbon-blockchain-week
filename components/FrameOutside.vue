<script>
export default {
  mounted() {
    const listener = (e) => {
      if (e.target === this.$el || e.target.classList[0] === 'trigger') {
        return
      }
      this.$emit(e.type, e)
    }

    document.addEventListener(`click`, listener)
    document.addEventListener(`focus`, listener, true)
    this.$once(`hook:beforeDestroy`, () => {
      document.removeEventListener(`click`, listener)
      document.removeEventListener(`focus`, listener, true)
    })
  },
  render() {
    return this.$slots.default[0]
  },
}
</script>
