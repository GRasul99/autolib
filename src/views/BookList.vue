<template>
  <v-container fluid>
    <div
      v-if="paginatedItems.length === 0"
      class="d-flex align-center justify-center"
    >
      <p class="text-center text-h6 font-weight-light mt-10">
        Поиск не дал результатов. Попробуйте вводить что нибудь другое
      </p>
    </div>
    <v-row v-if="paginatedItems.length > 0">
      <v-col
        v-for="book in paginatedItems"
        :key="book.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <BookMedia :book="book" />
      </v-col>
    </v-row>
    <div class="text-center" v-if="paginatedItems.length > 0">
      <v-pagination
        v-model="page"
        :length="Math.ceil(this.book.books.length / this.perPage)"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'BookList',
  data() {
    return {
      page: 1,
      perPage: 30
    }
  },
  components: {
    BookMedia: () => import('@/components/BookMedia.vue')
  },
  created() {
    NProgress.start()
  },
  mounted() {
    NProgress.done()
  },
  computed: {
    ...mapState(['book']),
    paginatedItems() {
      return this.book.books.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    }
  }
}
</script>
