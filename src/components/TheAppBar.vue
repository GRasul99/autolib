<template>
  <v-app-bar app color="indigo" dark height="72">
    <v-btn to="/" icon class="mr-6 ml-3 v-btn">
      <v-avatar tile size="96">
        <v-img contain src="@/assets/white_logo.png" />
      </v-avatar>
    </v-btn>
    <v-spacer />
    <div v-if="userUniversity" class="d-flex align-center">
      <v-avatar tile size="64" class="hidden-xs-only mr-2">
        <v-img contain :src="`https://autolib.tdtu.uz` + userUniversity.logo" />
      </v-avatar>
      <p class="text-center mb-0 hidden-sm-and-down text-h6">
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
        />
        <v-btn icon @click.prevent="searchBooks">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-form>
    <v-toolbar-items>
      <div v-if="isAuth" class="d-flex align-center ml-1">
        <v-btn to="/profile" text icon>
          <v-avatar size="48">
            <v-img
              class="rounded-circle"
              v-if="hasAvatar"
              :src="`https://autolib.tdtu.uz` + user.user.avatar"
            ></v-img>
            <v-img v-else src="@/assets/avatar2.png" />
          </v-avatar>
        </v-btn>
      </div>
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
    }
  }
}
</script>

<style scoped></style>
