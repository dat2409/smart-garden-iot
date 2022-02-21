<template>
      <v-footer
      :absolute="!fixed"
      app
      class="bg-gradient-primary"
    >
      <span>&copy;SmartGarden-Silent</span>
    </v-footer>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    }
  }
}
</script>

<style>

</style>
