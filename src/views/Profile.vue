<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs centered fixed-tabs background-color="indigo" dark>
            <v-tab :key="1">Профиль</v-tab>
            <v-tab :key="2">Заказы</v-tab>
            <v-tab :key="3">Активные заказы</v-tab>
            <v-tab :key="4">Не сданные книги</v-tab>
            <v-tab-item :key="1">
              <v-card>
                <v-container fluid>
                  <div class="d-flex flex-column align-center">
                    <v-avatar size="96">
                      <v-img
                        class="rounded-circle"
                        v-if="hasAvatar"
                        :src="`https://autolib.tdtu.uz` + user.user.avatar"
                      ></v-img>
                      <v-img v-else src="@/assets/avatar.jpg" />
                    </v-avatar>
                    <div class="d-flex flex-column mt-6">
                      <p class="text-body-1">
                        <span class="text-h6">Имя пользователя: </span
                        >{{ user.user.username }}
                      </p>
                      <p>
                        <span class="text-h6">Ф. И. О. : </span
                        >{{ user.user.full_name }}
                      </p>
                      <p v-if="userUniversity">
                        <span class="text-h6">Университет: </span
                        >{{ userUniversity.name }}
                      </p>
                    </div>
                    <v-card-actions>
                      <v-card flat>
                        <div
                          class="d-flex align-center justify-space-between mt-6 flex-column flex-sm-row "
                        >
                          <label for="file-1" class="mr-8 custom-input">
                            <input
                              type="file"
                              name="file-1"
                              id="file-1"
                              class="inputfile inputfile-1"
                              @change="onFileChanged"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="17"
                              viewBox="0 0 20 17"
                            >
                              <path
                                d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                              />
                            </svg>
                            <span> Выберите файл</span></label
                          >
                          <v-btn
                            class="ml-6"
                            color="amber lighten-2"
                            dark
                            @click.prevent="updateUserAvatar"
                            >Загрузить</v-btn
                          >
                        </div>
                      </v-card>
                    </v-card-actions>
                    <v-card class="d-flex mt-4 justify-center" flat>
                      <v-card flat v-if="!changePasswordForm">
                        <div
                          class="mb-4 d-flex justify-space-between flex-column flex-sm-row"
                        >
                          <p class="text-h6">
                            Пароль
                            <span
                              class="text-center font-weight-light pt-4 light-blue--text text-decoration-underline"
                              >*********</span
                            >
                          </p>
                          <v-btn
                            class="ml-8"
                            color="yellow darken-3"
                            dark
                            @click.prevent="
                              changePasswordForm = !changePasswordForm
                            "
                            >Изменить</v-btn
                          >
                        </div>
                      </v-card>
                      <v-card v-if="changePasswordForm" width="800" flat>
                        <v-form
                          @submit.prevent="changePassword"
                          v-model="valid"
                          validation
                        >
                          <v-text-field
                            v-model="email"
                            class="mt-4"
                            full-width
                            label="Почта"
                            placeholder="Email"
                            outlined
                          ></v-text-field>
                          <v-card class="d-flex justify-end mb-4" flat>
                            <v-btn
                              dark
                              class="mr-10"
                              color="green lighten-2"
                              @click.prevent="
                                changePasswordForm = !changePasswordForm
                              "
                              >Отмена</v-btn
                            >
                            <v-btn
                              dark
                              color="green darken-2"
                              @click.prevent="changePassword"
                              :disabled="!valid"
                              :rules="[rules.required, rules.email]"
                              >Сохранить</v-btn
                            >
                          </v-card>
                          <v-alert
                            v-for="error in errors[0]"
                            :key="error.id"
                            border="right"
                            type="error"
                            colored-border
                            elevation="2"
                            light
                          >
                            {{ error }}
                          </v-alert>
                        </v-form>
                      </v-card>
                    </v-card>
                  </div>
                </v-container>
              </v-card>
            </v-tab-item>
            <v-tab-item :key="2">
              <v-data-table
                :items="userOrders"
                :headers="order.userOrdersHeaders"
                no-data-text="Нет данных"
                no-results-text="Поиск не дал результатов"
              ></v-data-table>
            </v-tab-item>
            <v-tab-item :key="3">
              <v-data-table
                :items="userActiveOrders"
                :headers="order.userActiveOrdersHeaders"
                no-data-text="Нет данных"
                no-results-text="Поиск не дал результатов"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item :key="4">
              <v-data-table
                :items="book.booksInUse"
                :headers="order.userRetrievedOrdersHeaders"
                no-data-text="Нет данных"
                no-results-text="Поиск не дал результатов"
              ></v-data-table>
            </v-tab-item>
          </v-tabs>

          <v-snackbar v-model="snackbar" timeout="5000">
            Пожалуйста перейдите на почту чтобы продолжить смены пароля
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"
                >Закрыть</v-btn
              >
            </template>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="end" justify="end">
      <v-btn text @click="logout">Выход</v-btn>
    </v-row>
  </v-container>
</template>
<script>
import rules from '@/helpers/rules'
import { mapState } from 'vuex'
import moment from 'moment'
moment.locale('ru')
export default {
  name: 'Profile',
  data: () => ({
    errors: [],
    valid: false,
    rules,
    changePasswordForm: false,
    selectedFile: null,
    email: '',
    snackbar: false
  }),
  mounted() {
    this.$store.dispatch('order/fetchOrders')
    this.$store.dispatch('book/fetchBooksInUse')
  },
  computed: {
    ...mapState(['order', 'user', 'university', 'book']),
    hasAvatar() {
      return this.user.user.avatar
    },
    userUniversity() {
      return this.university.universities.find(university => {
        return university.id === this.user.user.university_id
      })
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
    userActiveOrders() {
      return this.userOrders.filter(order => {
        return order.active
      })
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
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
    },
    deleteItem(item) {
      const order = {
        book: item.book.id,
        done: item.done,
        active: false,
        retrieved: item.retrieved
      }
      this.$store
        .dispatch('order/updateOrder', {
          id: item.id,
          order
        })
        .then(() => {
          location.reload()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-input {
  &:hover {
    border-bottom: 1px solid red;
  }
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label {
  max-width: 80%;
  font-size: 1.25rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
}
.inputfile + label {
  display: none;
}
.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -0.25em;
  margin-right: 0.25em;
}
</style>
