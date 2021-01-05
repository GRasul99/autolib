<template>
  <!--  <router-link :to="/subcategories-list/ + rootUDC.id">-->
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
      :to="/subcategories-list/ + rootUDC.id"
      flat
      class="d-flex flex-column"
    >
      <img
        :src="rootUDC.image"
        alt="Category"
        width="120"
        height="120"
        class="mx-auto"
      />
      <!--    <v-img class="mx-auto my-1" :src="rootUDC.image"></v-img>-->
      <p class="mb-0 mt-1 text-decoration-none text-center text--black">
        {{ rootUDC.name }}
      </p>
    </v-card>
  </v-hover>
  <!--  </router-link>-->
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
