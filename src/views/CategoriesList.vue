<template>
  <v-container fluid>
    <div class="root-categories">
      <RootCategory
        v-for="rootUDC in rootUdc"
        :key="rootUDC.id"
        :rootUDC="rootUDC"
        class="root-categories__card"
      />
    </div>
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

<style lang="scss" scoped>
.root-categories {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 10px;
}
@media screen and (max-width: 435px) {
  .root-categories {
    justify-content: center;
  }
}
</style>
