<template>
  <v-app>
    <TheAppBar />
    <v-main class="pb-20">
      <router-view :key="$route.fullPath" />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
export default {
  components: {
    TheAppBar: () => import('@/components/TheAppBar.vue'),
    TheFooter: () => import('@/components/TheFooter.vue')
  }
}
</script>

<style>
.v-card,
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
</style>
