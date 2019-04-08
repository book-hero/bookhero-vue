<template>
  <div>
    <slot>{{emptyText}}</slot>
  </div>
</template>

<script>
export default {
  props: {
    emptyText: {
      type: String,
      required: true
    }
  }
}
</script>
