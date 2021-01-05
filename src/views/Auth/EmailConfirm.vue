<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="8" md="8">
        <v-card v-if="success" width="600" class="mx-auto">
          <v-card-text>
            Ваша почта успешно активирована
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EmailConfirm',
  data() {
    return {
      success: false
    }
  },
  mounted() {
    this.$store
      .dispatch('auth/emailConfirm', {
        uid: this.$route.params.uid,
        token: this.$route.params.token
      })
      .then(() => {
        this.success = true
        this.$router.push('/login')
      })
  }
}
</script>

<style scoped></style>
