<template>
  <div>
    <h1>Full Name: {{getUserInfo.fullName }}</h1>
    <h1>Email: {{getUserInfo.email }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  layout: 'admin',
  middleware: ['isAuthenticated', 'isAuthorization']
}
</script>

<style>

</style>
