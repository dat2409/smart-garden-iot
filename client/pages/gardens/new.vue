<template>
  <v-card max-width="900px" class="mx-auto">
    <v-card-title>
      <v-row justify="center" class="text-gradient display-1 font-weight-black mt-3"
        >New garden</v-row
      >
    </v-card-title>
    <v-form @submit.prevent="createGarden" ref="form">
      <v-card-text>
        <v-text-field
          v-model="selectedUser.id"
          label="Keeper Id"
          disabled
          outlined
        />
        <v-text-field
          v-model="selectedUser.fullName"
          label="Keeper Name"
          disabled
          outlined
        />
        <v-text-field
          v-model="selectedUser.email"
          label="Keeper Email"
          :rules="emailRules"
          disabled
          outlined
        />
        <v-text-field
          v-model="gardenId"
          label="Garden Id"
          :rules="gardenIdRules"
          outlined
          type="number"
        />
        <v-text-field
          v-model="gardenName"
          label="Garden name"
          :rules="gardenNameRules"
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" class="bg-gradient-primary" dark>Create</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: this.$store.state.selectedUser,
      fullName: "",
      email: "",
      gardenId: "",
      gardenName: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      gardenIdRules: [(v) => !!v || "Garden Id is required"],
      gardenNameRules: [(v) => !!v || "Garden Id is required"]
    };
  },
  methods: {
    createGarden() {
      if (this.$refs.form.validate()) {
        const newGarden = {
          gardenId: parseInt(this.gardenId),
          gardenName: this.gardenName,
          keeper: {
            id: parseInt(this.selectedUser.id)
          }
        };

        try {
          this.$axios.post(`/garden/upsert_garden`, newGarden).then(() => {
            this.$swal.fire(
              "Successful!",
              "You've already created new garden!",
              "success"
            );
            this.$router.push("/gardens");
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  // middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
