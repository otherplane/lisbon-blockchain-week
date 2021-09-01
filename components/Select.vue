<template>
  <vSelect
    v-model="selected"
    :clearable="false"
    dir="rtl"
    :filterable="false"
    :options="options"
    :searchable="false"
    class="selector"
    placeholder="Choose an option"
  >
    <template #selected-option-container="{ option }">
      <span class="vs__selected">{{ option.label }}</span>
    </template>

    <template #option="option">
      <span>{{ option.label }}</span>
    </template>
  </vSelect>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    defaultOption: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: this.defaultOption,
    }
  },
  watch: {
    selected: {
      handler(selected) {
        this.$emit('update-selected', selected)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.selector {
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    width: max-content;
    max-width: max-content;
    padding: 0;
    background: $beige;
    border: 2px solid $blue;
    border-radius: 0;
    box-shadow: none;
    color: $blue;
    font-size: 1rem;
    font-weight: 600;
    border-bottom-color: $blue !important;
  }
  .vs__open-indicator {
    font-size: 13px;
    color: $blue;
  }
  .vs__dropdown-menu {
    background: $beige;
    top: 50px;
    right: 0;
    border: 2px solid $blue;
  }

  .vs__dropdown-option {
    font-size: 1rem;
    padding: 12px;
    margin: 4px;
    font-weight: 600;
    color: $blue;
  }

  .vs__dropdown-option--highlight {
    background: $blue;
    color: $beige;
  }

  .vs__clear,
  .vs__open-indicator {
    color: $blue;
  }

  .image {
    height: 25px;
    vertical-align: middle;
  }
  .vs__selected {
    height: 40px;
    color: $blue;
    font-weight: 600;
    margin: 0;
    padding: 0 8px 0 0;
  }
  &:hover {
    .vs__selected {
      color: $blue;
    }
    .vs__open-indicator {
      color: $blue;
    }
  }
  .vs__actions {
    padding: 8px;
  }
  // remove extra space
  .vs__search {
    padding: 0 !important;
  }
}
// avoid decrease size on open
.vs--single.vs--open .vs__selected {
  opacity: 1 !important;
  position: inherit !important;
  &.vs__dropdown-toggle {
    border-bottom-color: $blue !important;
  }
}
</style>
