<template>
  <div class="px-3">
    <v-card
      width="400"
      class="mx-auto mt-10 px-2"
      color="indigo lighten-1"
      dark
    >
      <v-card-title
        >Войдите в свой аккаунт чтобы получить доступ к сайту</v-card-title
      >
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
        </v-form>
        <p>
          Нет аккаунта?
          <v-btn text to="/register">Зарегистрируйтесь</v-btn>
        </p>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn @click.prevent="login" :disabled="!valid" text>Войти</v-btn>
      </v-card-actions>
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
          throw error
        })
    }
  }
}
</script>

<style scoped lang="scss">
.v-card__title {
  word-break: normal;
}
</style>
