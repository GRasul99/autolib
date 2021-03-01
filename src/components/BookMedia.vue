<template>
  <v-card
    elevation="4"
    class="flex py-2 px-2 rounded-xl"
    height="100%"
    max-width="100%"
  >
    <v-img :src="book.img" max-width="130" />
    <v-card-text class="ml-2 flex flex-column">
      <p class="font-weight-bold">{{ book.title }}</p>
      <p v-for="author in book.authors" :key="author.id" class="text-gray-700">
        {{ author.initial_name }}
      </p>
      <p class="mt-auto">{{ book.publication_date }} г.</p>
      <BookModal :id="book.id" class="mr-2" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BookMedia',
  components: {
    BookModal: () => import('@/components/BookModal')
  },
  props: {
    book: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
