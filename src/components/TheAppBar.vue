<template>
  <v-app-bar app color="indigo" dark height="72">
    <router-link to="/">
      <v-img contain src="@/assets/logo.png" width="116" />
    </router-link>
    <v-spacer />
    <div v-if="userUniversity" class="d-flex align-center">
      <v-avatar tile size="64" class="hidden-xs-only mr-2">
        <v-img contain :src="`https://autolib.uz` + userUniversity.logo" />
      </v-avatar>
      <p class="text-center hidden-sm-and-down text-h5 my-3">
        {{ userUniversity.name }}
      </p>
    </div>
    <v-spacer />
    <v-form v-if="isAuth" @submit.prevent="searchBooks">
      <div class="d-flex align-center">
        <v-text-field
          placeholder="Поиск  . . ."
          v-model="searchBook"
          flat
          solo-inverted
          hide-details
          append-icon="mdi-magnify"
          @click:append="searchBooks"
          type="search"
          class="mr-3 rounded-xl"
        />
      </div>
    </v-form>
    <v-toolbar-items>
      <v-menu open-on-hover offset-y v-if="isAuth">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :to="{ name: 'profile' }"
            color="primary"
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="48">
              <v-img
                class="rounded-circle"
                v-if="hasAvatar"
                :src="`https://autolib.uz` + user.user.avatar"
              />
              <v-img v-else>
                <v-icon>mdi-account-circle</v-icon>
              </v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <router-link class="px-2" to="/profile">Профиль</router-link>
          </v-list-item>
          <v-list-item>
            <button @click="logout" class="px-2">Выход</button>
          </v-list-item>
        </v-list>
      </v-menu>
      <div v-if="!isAuth" class="d-flex align-center">
        <v-btn to="/login" text>Вход</v-btn>
        <v-btn to="/register" text>Регистрация</v-btn>
      </div>
    </v-toolbar-items>
    <v-snackbar v-model="snackbar" timeout="5000" absolute>
      Поле не может быть пустым
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"
          >Закрыть</v-btn
        >
      </template>
    </v-snackbar>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TheAppBar',
  data: () => ({
    searchBook: '',
    snackbar: false
  }),
  created() {
    this.$store.dispatch('university/fetchUniversities')
    if (this.isAuth) {
      this.$store.dispatch('user/fetchUser', this.$store.state.auth.userId)
    }
  },
  computed: {
    ...mapState(['user', 'university']),
    isAuth() {
      return this.$store.state.auth.user
    },
    hasAvatar() {
      return this.user.user.avatar
    },
    userUniversity() {
      return this.university.universities.find(university => {
        return university.id === this.user.user.university_id
      })
    }
  },
  methods: {
    searchBooks() {
      if (this.searchBook) {
        this.$store.dispatch('book/searchBooks', this.searchBook).then(() => {
          this.searchBook = ''
          this.$router.push({ name: 'book-list' }, () => {})
        })
      } else this.snackbar = true
    },
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
