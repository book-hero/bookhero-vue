<template>
  <div>
    <h1>{{code}}</h1>
    <h6>{{message}}</h6>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      default: 100
    },
    message: {
      type: String,
      default: 'hello?'
    }
  }
}
</script>
