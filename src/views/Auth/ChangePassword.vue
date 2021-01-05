<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card width="400" class="mx-auto mt-10" color="indigo lighten-1" dark>
          <v-card-title>Смена пароля</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Пароль"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Подтвердите пароль"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click.prevent="resetPasswordConfirm"
              >Сменить</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      showPassword: false,
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    resetPasswordConfirm() {
      this.$store
        .dispatch('auth/resetPasswordConfirm', {
          uid: this.$route.params.uid,
          token: this.$route.params.token,
          new_password: this.password,
          re_new_password: this.confirmPassword
        })
        .then(() => {
          this.$router.push('/login')
          this.$store.dispatch('auth/logout')
        })
    }
  }
}
</script>

<style></style>
