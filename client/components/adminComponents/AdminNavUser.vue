<template>
  <v-menu
    offset-y
    left
    nudge-bottom="10"
    min-width="230"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        bottom
        color="success"
        overlap
        offset-x="12"
        offset-y="12"
        class="ms-4"
        dot
      >
        <v-avatar
          size="40px"
          v-bind="attrs"
          v-on="on"
          >
          <v-img src="https://picsum.photos/id/11/500/300"></v-img>
        </v-avatar>
      </v-badge>
    </template>
    <v-list>
      <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ma-4"
          dot
        >
          <v-avatar size="40px">
            <v-img src="https://picsum.photos/id/11/500/300"></v-img>
          </v-avatar>
        </v-badge>
        <div
          class="d-inline-flex flex-column justify-center ms-3"
          style="vertical-align:middle"
        >
          <span class="text--primary font-weight-semibold mb-n1">
            John Doe
          </span>
          <small class="text--disabled text-capitalize">Admin</small>
        </div>
        <v-divider></v-divider>
      <v-list-item router to="/ssadmin/user/profile">
        <v-list-item-title>
          <v-icon>mdi-clipboard-account-outline</v-icon>
          <span>Profile</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-title>
          <v-icon>mdi-logout</v-icon>
          <span>Logout</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: 'mdi-clipboard-account-outline', title: 'Profile' },
        { icon: 'mdi-logout', title: 'Logout' },
      ]
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/ssadmin/login');
    }
  }
};
</script>

<style>
</style>
