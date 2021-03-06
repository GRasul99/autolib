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
            <v-tab v-for="(tabTitle, index) in tabTitles" :key="index + 1">
              {{ tabTitle }}
            </v-tab>
            <v-tab-item :key="1">
              <ProfileUserInfo />
            </v-tab-item>
            <v-tab-item :key="2">
              <ProfileUserOrders />
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
  </v-container>
</template>
<script>
import NProgress from 'nprogress'
import { mapState } from 'vuex'
import moment from 'moment'
moment.locale('ru')
export default {
  name: 'Profile',
  components: {
    ProfileUserInfo: () => import('@/components/ProfileUserInfo'),
    ProfileUserOrders: () => import('@/components/ProfileUserOrders')
  },
  data() {
    return {
      tabTitles: ['Профиль', 'Заказы', 'Активные заказы', 'Не сданные книги']
    }
  },
  mounted() {
    NProgress.start()
    this.$store.dispatch('book/fetchBooksInUse').then(() => {
      NProgress.done()
    })
  },
  computed: {
    ...mapState(['order', 'user', 'university', 'book'])
  },
  methods: {
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
