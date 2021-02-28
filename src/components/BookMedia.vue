<template>
  <div class="flex flex-col"></div>
</template>

<script>
export default {
  name: 'BookMedia',
  components: {
    // BookModal: () => import('@/components/BookModal')
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
