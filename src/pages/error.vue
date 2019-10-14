<template>
  <div>
    <p>This is the generic error page</p>
    <p> We just received a code {{code}}</p>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      default: 100
    }
  }
}
</script>