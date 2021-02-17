<template>
  <v-footer color="#EAEAEA">
    <v-row>
      <!--      <v-col cols="12" md="4" class="text-center">-->
      <!--        <v-btn text color="grey" class="text-none text-center">О нас</v-btn>-->
      <!--        <v-btn text color="grey" class="text-none">Условия использования</v-btn>-->
      <!--      </v-col>-->
      <v-col cols="12" md="4" class="text-center grey--text">
        <v-badge icon="mdi-copyright" color="#e5e5e5" class="mr-2 mt-1"
          >Autolib
        </v-badge>
        {{ new Date().getFullYear() }}
      </v-col>
      <!--      <v-col cols="12" md="4" class="text-center">asd</v-col>-->
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped></style>
