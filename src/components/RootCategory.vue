<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 16 : 2"
      width="580"
      height="250"
      class="d-flex align-center"
      :to="/subcategories-list/ + rootUDC.id"
    >
      <img
        :src="rootUDC.image"
        alt="Category"
        width="150"
        height="150"
        class="justify-start"
      />
      <div class="flex px-4">
        <p class="mb-0 text-center text-decoration-none">{{ rootUDC.name }}</p>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: 'RootCategory',
  props: {
    rootUDC: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
