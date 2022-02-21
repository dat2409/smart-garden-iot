<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      app
      class="adminBackground"
    >
      <v-list>
        <v-list-item-group
          v-model="choose"
          active-class="bg-gradient-primary border-circle-right white--text"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            class="#546E7A--text"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app class="adminBackground">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-spacer />
      <v-menu offset-y left nudge-bottom="10" min-width="230">
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
            <v-avatar size="40px" v-bind="attrs" v-on="on">
              <v-img :src="require('~/assets/images/avatarSample.png')"></v-img>
            </v-avatar>
          </v-badge>
        </template>
        <v-card @click="logout">
          <v-card-actions>
            <v-icon>mdi-logout</v-icon>
            <span>Logout</span>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: "mdi-account-group-outline",
          title: "Users",
          to: "/",
        },
        {
          icon: "mdi-palm-tree",
          title: "Gardens",
          to: "/gardens",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      choose: true,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
</style>
