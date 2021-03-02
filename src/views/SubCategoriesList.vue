<template>
  <v-container fluid>
    <div>
      <!--      <v-row>-->
      <!--        <v-tabs-->
      <!--          v-if="subUdc.length > 0"-->
      <!--          optional-->
      <!--          align-with-title-->
      <!--          hide-slider-->
      <!--          dark-->
      <!--          background-color="indigo darken-3"-->
      <!--          height="100"-->
      <!--        >-->
      <!--          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>-->
      <!--          <v-tab-->
      <!--            aria-multiline="true"-->
      <!--            class="white&#45;&#45;text"-->
      <!--            v-for="subCategory in subUdc"-->
      <!--            :key="subCategory.id"-->
      <!--            :href="'/subcategories-list/' + subCategory.id"-->
      <!--            >{{ subCategory.name }}</v-tab-->
      <!--          >-->
      <!--        </v-tabs>-->
      <!--      </v-row>-->
    </div>
    <v-row class="mt-2" v-if="books.length > 0" no-gutters>
      <v-col
        class="py-1 px-1"
        v-for="book in books"
        :key="book.id"
        cols="12"
        sm="6"
        lg="4"
      >
        <BookMedia :book="book" />
      </v-col>
    </v-row>
    <div class="text-center" v-if="books.length > 0">
      <v-pagination
        v-model="page"
        :length="Math.ceil(this.booksCount / this.perPage)"
        :total-visible="7"
        circle
        @input="handlePageChange(page)"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import NProgress from 'nprogress'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'SubCategoriesList',
  created() {
    NProgress.start()
    // this.$store.dispatch('udc/fetchSubUdc', this.id)
    this.$store.dispatch('book/fetchBooks', this.id).then(() => {
      NProgress.done()
    })
  },
  computed: {
    ...mapState(['udc', 'book']),
    // ...mapGetters('udc', ['subUdc']),
    ...mapGetters('book', ['books', 'booksCount']),
    id() {
      return this.$route.params.id
    }
  },
  components: {
    BookMedia: () => import('@/components/BookMedia.vue')
  },
  data() {
    return {
      page: 1,
      perPage: 30
    }
  },
  methods: {
    handlePageChange(page) {
      let number = (page - 1) * 30
      this.$store
        .dispatch('book/fetchBooksPagination', {
          id: this.$route.params.id,
          page: number
        })
        .then(() => {
          window.scrollTo(0, 0)
        })
    }
  },
  beforeDestroy() {
    this.$store.commit('book/CLEARS_BOOK')
    this.$store.commit('udc/CLEAR_SUB_UDC')
  }
}
</script>
