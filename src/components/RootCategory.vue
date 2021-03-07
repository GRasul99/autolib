<template>
  <v-hover v-slot="{ hover }" open-delay="25">
    <v-card
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 16 : 2"
      :to="/subcategories-list/ + rootUDC.id"
      height="100%"
      class="px-6 d-flex"
    >
      <div class="flex flex-col items-center lg:flex-row">
        <img class="w-24" :src="rootUDC.image" alt="Category" />
        <p class="mb-2 text-decoration-none text-center mx-auto">
          {{ rootUDC.name }}
        </p>
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

<style>
.v-card,
.v-card__text,
.v-card__title {
  hyphens: auto !important;
}
</style>
