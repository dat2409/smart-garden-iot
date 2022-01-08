<template>
  <v-app dark>
    <v-main>
      <user-header />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserHeader from '../components/userComponents/UserHeader.vue'
export default {
  name: 'admin',
  components: {
    UserHeader,
  }
}
</script>
