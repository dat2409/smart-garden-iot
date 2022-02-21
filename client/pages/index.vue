<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-uppercase">Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
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
                New user
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <v-row
                  justify="center"
                  class="text-gradient display-1 font-weight-black mt-3"
                  >New user</v-row
                >
              </v-card-title>
              <v-form @submit.prevent="createUser" ref="form">
                <v-card-text>
                  <v-container>
                    <v-text-field
                      label="Name"
                      v-model="name"
                      :rules="nameRules"
                      outlined
                    />
                    <v-text-field
                      label="Email"
                      v-model="email"
                      :rules="emailRules"
                      outlined
                    />
                    <v-text-field
                      label="Password"
                      placeholder="******"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-icon="
                        isPasswordVisible
                          ? 'mdi-eye-off-outline'
                          : 'mdi-eye-outline'
                      "
                      @click:append="isPasswordVisible = !isPasswordVisible"
                      v-model="password"
                      :rules="passwordRules"
                      outlined
                    />
                    <v-text-field
                      label="Confirm Password"
                      placeholder="******"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules.concat(confirmPasswordValid)"
                      :append-icon="
                        isPasswordVisible
                          ? 'mdi-eye-off-outline'
                          : 'mdi-eye-outline'
                      "
                      @click:append="isPasswordVisible = !isPasswordVisible"
                      outlined
                    />
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="addGarden(item)"> mdi-plus-circle </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  fetch() {
    try {
      this.$axios.get("/list_users/").then((users) => {
        this.users = users.data.userInfos;
        console.log(this.users);
      });
    } catch (err) {
      return err;
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Full Name",
          align: "start",
          value: "fullName",
        },
        {
          text: "Email",
          value: "email",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      users: [],
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isPasswordVisible: false,
      search: "",
      dialog: false,
      dialogGarden: false,
      nameRules: [(v) => !!v || "Name is required!"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length > 5 || "Minimum length is 6",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required!",
        (v) => v.length > 5 || "Minimum length is 6",
      ],
    };
  },
  computed: {
    confirmPasswordValid() {
      return () =>
        this.password === this.confirmPassword ||
        "Confirm password doesn't match!";
    },
  },
  methods: {
    addGarden(user) {
      this.$store.dispatch("setSelectedUser", user);
      this.$router.push("gardens/new");
    },
    close() {
      this.dialog = false;
    },
    createUser() {
      if (this.$refs.form.validate()) {
        const newUser = {
          fullName: this.name,
          email: this.email,
          password: this.password
        }
        this.$axios.post(`/register`, newUser)
          .then(() => {
            this.$swal.fire(
              "Successful!",
              "You've already created new user!",
              "success"
            );
            this.$fetch();
            this.close();
          })
      }
    },
  },
  // middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
