<template>
  <v-card class="d-flex flex-column" height="100%" width="100%">
    <v-img width="90" height="150" :src="book.img" class="mx-auto" />
    <v-card-text class="fill-height black--text flex-column text-body-1">
      <p class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Название: </span>{{ book.title }}
      </p>
      <p class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Авторы: </span>
        <span v-for="(author, index) in book.authors" :key="index">{{
          author.initial_name
        }}</span>
      </p>
      <p v-if="book.publication_date" class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Дата публикации: </span
        >{{ book.publication_date }}
      </p>
      <p v-if="book.language" class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Язык: </span>{{ book.language }}
      </p>
      <p v-if="book.pages" class="text-body-1 font-weight-regular">
        <span class="font-weight-medium">Страниц: </span>{{ book.pages }}
      </p>
    </v-card-text>
    <v-card-actions class="mx-auto mb-3">
      <!--      <BookDialog :id="book.id" />-->
      <BookModal :id="book.id" />
    </v-card-actions>
  </v-card>
</template>

<script>
import BookModal from '@/components/BookModal'
export default {
  name: 'BookMedia',
  components: {
    BookModal
    // BookDialog: () => import('@/components/BookDialog.vue')
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>
