<template>
  <v-card>
    <v-divider class="mt-4" />
    <v-container fluid>
      <div class="flex flex-col md:flex-row mt-8">
        <div class="flex flex-col md:mr-8 mb-6 md:w-1/2">
          <div class="flex">
            <v-avatar size="116">
              <v-img
                class="rounded-full"
                v-if="hasAvatar"
                :src="`https://autolib.uz` + user.user.avatar"
              />
            </v-avatar>
            <div class="flex flex-col ml-2">
              <p class="font-bold text-center mb-4">
                {{ user.user.full_name }}
              </p>
              <p class="text-gray-700 text-center mb-2">
                @{{ user.user.username }}
              </p>
              <v-btn outlined icon color="#3366cc" class="mx-auto d-sm-none">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                outlined
                color="#3366cc"
                class="mx-auto hidden-xs-only mt-4 rounded-md"
              >
                Редактировать профиль
              </v-btn>
            </div>
          </div>
          <div class="mt-6 flex flex-col">
            <p class="mb-2">
              Ф. И. О. студента:
              <span>{{ user.user.full_name }}</span>
            </p>
            <v-divider />
            <p class="my-2">
              Университет:
              <span>{{ userUniversity.name }}</span>
            </p>
          </div>
        </div>
        <div class="md:w-1/2">
          <v-card elevation="1">
            <v-toolbar color="#47E444" dark height="45" elevation="0">
              <v-spacer />
              <v-toolbar-title>
                <p class="mb-0 text-md">Активные заказы</p>
              </v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <p
                class="mt-0 text-md-body-1"
                v-for="(activeOrder, index) in userActiveOrders.slice(0, 4)"
                :key="activeOrder.id"
              >
                {{ index + 1 }}. {{ activeOrder.book.title }}
              </p>
            </v-card-text>
            <v-card-actions v-if="userActiveOrders.length > 4">
              <v-spacer />
              <v-btn color="#3366cc" dark class="rounded-md mb-4">
                Полный список
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-container>
    <v-snackbar v-model="snackbar" timeout="5000">
      Пожалуйста перейдите на почту чтобы продолжить смены пароля
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import NProgress from 'nprogress'
import { mapState } from 'vuex'
import rules from '@/helpers/rules'
import moment from 'moment'
export default {
  name: 'ProfileUserInfo',
  data() {
    return {
      errors: [],
      valid: false,
      rules,
      changePasswordForm: false,
      selectedFile: null,
      email: '',
      snackbar: false
    }
  },
  created() {
    NProgress.start()
    this.$store.dispatch('order/fetchOrders').then(() => {
      NProgress.done()
    })
  },
  computed: {
    ...mapState(['user', 'university', 'order']),
    hasAvatar() {
      return this.user.user.avatar
    },
    userOrders() {
      return this.order.orders.map(order => {
        order.time_of_get = moment().to(order.time_of_get)
        if (order.time_of_take_away === null) order.time_of_take_away = ''
        else order.time_of_take_away = moment().to(order.time_of_take_away)
        if (order.time_of_pass === null) order.time_of_pass = ''
        else order.time_of_pass = moment().to(order.time_of_pass)
        return { ...order }
      })
    },
    userUniversity() {
      return this.university.universities.find(university => {
        return university.id === this.user.user.university_id
      })
    },
    userActiveOrders() {
      return this.userOrders.filter(order => {
        return order.active
      })
    }
  },
  methods: {
    changePassword() {
      this.errors = []
      this.$store
        .dispatch('auth/resetPassword', {
          email: this.email
        })
        .then(() => {
          this.changePasswordForm = false
          this.snackbar = true
        })
        .catch(error => {
          this.errors.push(error.response.data)
        })
    },
    onFileChanged(event) {
      this.selectedFile = event.target.files[0]
    },

    updateUserAvatar() {
      let newUserData = new FormData()
      newUserData.append('avatar', this.selectedFile)
      newUserData.append('data_joined', this.user.user.data_joined)
      newUserData.append('email', this.user.user.email)
      newUserData.append('faculty', this.user.user.faculty)
      newUserData.append('full_name', this.user.user.full_name)
      newUserData.append('is_active', this.user.user.is_active)
      newUserData.append('is_staff', this.user.user.is_staff)
      newUserData.append('is_superuser', this.user.user.is_superuser)
      newUserData.append('kafedra', this.user.user.kafedra)
      newUserData.append(
        'passport_serial_id',
        this.user.user.passport_serial_id
      )
      newUserData.append('position', this.user.user.position)
      newUserData.append('tel_num', this.user.user.tel_num)
      newUserData.append('university_id', this.user.user.university_id)
      newUserData.append('username', this.user.user.username)
      this.$store
        .dispatch('user/updateUser', {
          id: this.$store.state.auth.userId,
          newUserData
        })
        .then(() => {
          location.reload()
        })
    }
  }
}
</script>
