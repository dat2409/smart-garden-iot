<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="gardens"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-uppercase">Gardens</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="editGarden(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  fetch() {
    try {
      this.$axios.get("/garden/list_gardens").then((gardens) => {
        this.gardens = gardens.data.gardens;
        console.log(this.gardens);
      });
    } catch (err) {
      return err;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Garden Id",
          align: "start",
          value: "gardenId",
        },
        {
          text: "Keeper email",
          value: "keeper.email",
        },
        {
          text: "Keeper name",
          value: "keeper.fullName",
        },
        {
          text: "Garden Name",
          value: "gardenName",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      gardens: [],
      name: "",
      email: "",
      search: "",
    };
  },
  methods: {
    editGarden(garden) {
      this.$store.dispatch('setSelectedGarden', garden);
      this.$router.push('/gardens/edit');
    }
  },
  // middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
