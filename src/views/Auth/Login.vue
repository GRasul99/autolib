<template>
  <div class="px-3">
    <v-card
      width="400"
      class="mx-auto mt-10 px-2 border-shadow rounded-xl mb-15"
    >
      <p class="text-center text-h6 pt-3 text-uppercase">Вход на сайт</p>
      <v-card-text>
        <v-form ref="form" v-model="valid" validation @submit.prevent="login">
          <v-text-field
            type="text"
            v-model="username"
            label="Логин"
            prepend-icon="mdi-account-circle"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Пароль"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="[rules.required]"
          />
          <v-card-actions class="d-flex mb-7">
            <v-btn
              dark
              @click.prevent="login"
              class="px-13 bg-blue-700"
              text
              :disabled="!valid"
            >
              Войти
            </v-btn>
            <v-btn text color="#3366CC" class="text-none">Забыли пароль?</v-btn>
          </v-card-actions>
          <v-divider />
        </v-form>
        <div class="d-flex flex-column align-center mt-7 mb-5">
          <p class="mb-0 text-center text--black mb-2">
            Нет аккаунта?
          </p>
          <v-btn
            to="/register"
            outlined
            color="#3366cc"
            class="text-capitalize"
          >
            Зарегистрироваться</v-btn
          >
        </div>
      </v-card-text>
      <v-divider />
    </v-card>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import rules from '@/helpers/rules'
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
      username: '',
      password: '',
      rules,
      valid: false
    }
  },
  methods: {
    login() {
      if (this.valid) {
        NProgress.start()
        this.$store
          .dispatch('auth/login', {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$router.push({ name: 'categories-list' })
          })
          .catch(error => {
            NProgress.done()
            console.log(error.message)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.v-card__title {
  word-break: normal;
}
.border-shadow {
  -webkit-box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.2) !important;
  -moz-box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.2) !important;
}
</style>
