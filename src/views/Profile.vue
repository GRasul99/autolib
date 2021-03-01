<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs
            centered
            fixed-tabs
            background-color="white"
            light
            color="#3366cc"
          >
            <v-tab :key="1">Профиль</v-tab>
            <v-tab :key="2">Заказы</v-tab>
            <v-tab :key="3">Активные заказы</v-tab>
            <v-tab :key="4">Не сданные книги</v-tab>
            <v-tab-item :key="1">
              <ProfileUserInfo />
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
        </v-card>
      </v-col>
    </v-row>
    <v-row align="end" justify="end">
      <v-btn text @click="logout">Выход</v-btn>
    </v-row>
  </v-container>
</template>
<script>
import NProgress from 'nprogress'
import { mapState } from 'vuex'
import moment from 'moment'
import ProfileUserInfo from '@/components/ProfileUserInfo'
moment.locale('ru')
export default {
  name: 'Profile',
  components: { ProfileUserInfo },
  mounted() {
    NProgress.start()
    this.$store.dispatch('order/fetchOrders')
    this.$store.dispatch('book/fetchBooksInUse').then(() => {
      NProgress.done()
    })
  },
  computed: {
    ...mapState(['order', 'user', 'university', 'book']),
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
