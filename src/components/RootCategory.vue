<template>
  <!--  <v-hover v-slot="{ hover }" open-delay="200">-->
  <!--    <v-card-->
  <!--      :class="{ 'on-hover': hover }"-->
  <!--      :elevation="hover ? 16 : 2"-->
  <!--      class="d-flex align-center px-6"-->
  <!--      :to="/subcategories-list/ + rootUDC.id"-->
  <!--      width="100%"-->
  <!--      height="100%"-->
  <!--    >-->
  <!--      <v-img :src="rootUDC.image" alt="Category" class="justify-start" />-->
  <!--      <div class="flex">-->
  <!--        <p class="mb-0 text-center text-decoration-none">{{ rootUDC.name }}</p>-->
  <!--      </div>-->
  <!--    </v-card>-->
  <!--  </v-hover>-->
  <v-hover v-slot="{ hover }" open-delay="25">
    <v-card
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 16 : 2"
      :to="/subcategories-list/ + rootUDC.id"
      height="100%"
      class="px-6 d-flex"
    >
      <div class="flex flex-col items-center lg:flex-row">
        <v-img
          :src="rootUDC.image"
          alt="Category"
          max-height="150"
          max-width="150"
        />
        <p class="mb-2 text-decoration-none text-center">
          {{ rootUDC.name }}
        </p>
      </div>
      <!--      <v-row align="center">-->
      <!--        <v-col cols="6">-->
      <!--          <v-img-->
      <!--            :src="rootUDC.image"-->
      <!--            alt="Category"-->
      <!--            class="justify-start"-->
      <!--            max-height="150"-->
      <!--            max-width="150"-->
      <!--          />-->
      <!--        </v-col>-->
      <!--        <v-col cols="6">-->
      <!--          <p class="mb-0 text-decoration-none">-->
      <!--            {{ rootUDC.name }}-->
      <!--          </p>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
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
