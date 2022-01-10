<template>
  <v-app dark>
    <v-main>
      <user-header />
      <Nuxt />
      <user-footer />
    </v-main>
  </v-app>
</template>

<script>
import UserFooter from '../components/userComponents/UserFooter.vue';
import UserHeader from '../components/userComponents/UserHeader.vue';
export default {
  name: "default",
  components: {
    UserHeader,
    UserFooter
  },
};
