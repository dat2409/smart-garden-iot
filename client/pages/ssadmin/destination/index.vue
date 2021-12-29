<template>
  <v-data-table :headers="headers" :items="destinations" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Destinations</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="900">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 bg-gradient-primary"
              v-bind="attrs"
              v-on="on"
            >
              New Destination
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="text-h5">New Destination</span>
            </v-card-title>
            <v-form @submit.prevent="onUpload">
              <v-card-text>
                <v-container>
                  <v-text-field label="Name" v-model="name" />
                  <v-text-field label="Address" v-model="address" />
                  <v-textarea label="Description" v-model="desc" />
                  <client-only>
                    <v-file-input
                      type="file"
                      name="imagesArray"
                      multiple
                      counter
                      show-size
                      @change="onChange"
                    />
                  </client-only>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text type="submit"> Save </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItem()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItemConfirm(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Address", value: "address" },
        { text: "Description", value: "desc", width: "500" },
        { text: "Images", value: "name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      destinations: [],
      dialog: false,
      imagesArray: null,
      name: "",
      address: "",
      desc: "",
      dialogDelete: false,
      destinationDelete: null,
    };
  },
  mounted() {
    try {
      this.$axios
        .get("/destinations")
        .then((destinations) => (this.destinations = destinations.data));
    } catch (err) {
      return err;
    }
  },
  methods: {
    onChange(files) {
      this.imagesArray = files;
    },
    onUpload() {
      const formData = new FormData();
      for (const i of Object.keys(this.imagesArray)) {
        formData.append("imagesArray", this.imagesArray[i]);
      }
      formData.append("name", this.name);
      formData.append("address", this.address);
      formData.append("desc", this.desc);

      this.$axios.post("/destinations", formData, {}).then((destination) => {
        this.destinations.push(destination);
        this.close();
      });
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    close() {
      this.dialog = false;
    },
    editItem(item) {
      console.log(item);
    },
    deleteItem() {
      console.log("start dl");
      this.$axios
        .delete(`/destinations/${this.destinationDelete.id}`)
        .then((destination) => {
          const destinationId = this.destinations.findIndex(
            (d) => d.id === destination.id
          );
          this.destinations.splice(destinationId, 1);
          this.closeDelete();
        });
    },
    deleteItemConfirm(item) {
      this.dialogDelete = true;
      this.destinationDelete = item;
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
