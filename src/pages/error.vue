<template>
  <div>
<<<<<<< HEAD
    <p>This is the generic error page</p>
    <p> We just received a code {{code}}</p>
=======
    <h1>{{code}}</h1>
    <h6>{{message}}</h6>
>>>>>>> ee0c3ae80fd191ec9243c6adc0bfcf4df3aae4f7
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
  props: {
    code: {
      type: Number,
      default: 100
    }
  }
}
</script>
=======
  props: ['code', 'message']
}
</script>
>>>>>>> ee0c3ae80fd191ec9243c6adc0bfcf4df3aae4f7
