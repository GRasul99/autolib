<template>
  <v-data-table
    :items="order.orders"
    :headers="order.userOrdersHeaders"
    :loading="loading"
    no-data-text="Нет данных"
    no-results-text="Поиск не дал результатов"
  ></v-data-table>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfileUserOrders',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState(['order'])
  },
  created() {
    this.loading = true
    this.$store.dispatch('order/fetchOrders').then(() => {
      this.loading = false
    })
  }
}
</script>
