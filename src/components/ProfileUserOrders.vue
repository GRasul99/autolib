<template>
  <v-data-table
    :items="order.orders"
    :headers="order.userOrdersHeaders"
    no-data-text="Нет данных"
    no-results-text="Поиск не дал результатов"
  ></v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'ProfileUserOrders',
  computed: {
    ...mapState(['order'])
  },
  created() {
    NProgress.start()
    this.$store.dispatch('order/fetchOrders').then(() => {
      NProgress.done()
    })
  }
}
</script>
