<template>
  <div id="login">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="login">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="serverErrors.length > 0">
              <span v-for="(error, index) in serverErrors" :key="index">{{error}}</span>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              >
              <small class="text-danger" v-if="emailError">Please enter a valid email</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
              >
              <small class="text-danger" v-if="passwordError">Please enter a password</small>
            </div>
          </div>
          <div class="modal-footer">
            <button id="register" type="button" class="btn btn-secondary">Register</button>
            <button id="login-button" type="submit" class="btn btn-primary">Login</button>
            <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      serverErrors: []
    }
  },
  methods: {
    async login() {
      this.errors = []
      if (!this.validForm()) return false
      let result = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      if (result !== undefined && result.errors !== undefined) {
        this.serverErrors = result.errors.non_field_errors || []
      } else {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push({ name: 'feed' })
        }
      }
    },
    validForm() {
      this.emailError = false
      this.passwordError = false

      if (this.email === '') this.emailError = true
      if (this.password === '') this.passwordError = true

      return !this.emailError && !this.passwordError
    }
  }
}
</script>

<style scoped>
#login {
  height: 100%;
  display: flex;
  align-items: center;
}
.modal-dialog {
  width: 33%;
}
#register {
  margin-right: auto;
}
</style>
