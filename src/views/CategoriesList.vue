<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <p class="mb-0 font-weight-bold text-h5">Все разделы</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="rootUDC in rootUdc"
        :key="rootUDC.id"
      >
        <RootCategory :rootUDC="rootUDC" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import jwtDecode from 'jwt-decode'
import TokenService from '@/services/TokenService'
import NProgress from 'nprogress'
import RootCategory from '@/components/RootCategory'
export default {
  name: 'CategoriesList',
  components: {
    RootCategory
  },
  created() {
    NProgress.start()
    this.$store.dispatch('udc/fetchRootUdc').then(() =>
      this.$store
        .dispatch(
          'user/fetchUser',
          jwtDecode(TokenService.getToken('access')).user_id
        )
        .then(() => {
          NProgress.done()
        })
    )
  },
  computed: {
    ...mapState(['udc']),
    ...mapGetters('udc', ['rootUdc'])
  }
}
</script>
