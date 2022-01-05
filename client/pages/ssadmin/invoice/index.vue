<template>
  <v-data-table
    :headers="headers"
    :items="invoices"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="text-uppercase">Invoices</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.isDeposited`]="{ item }">
      <v-chip
        :color="getColor(item.isDeposited)"
        class="white--text"
        @click="confirmDeposit(item)"
        >{{ item.isDeposited }}</v-chip
      >
    </template>
  </v-data-table>
</template>

<script>
export default {
  layout: "admin",
  fetch() {
    try {
      this.$axios
        .get("/invoice-manager/orders")
        .then((invoices) => (this.invoices = invoices.data));
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
        {
          text: "Phone Number",
          value: "phoneNumber",
        },
        {
          text: "Address",
          value: "address",
        },
        {
          text: "Note",
          value: "note",
        },
        {
          text: "Quantity",
          value: "quantity",
        },
        {
          text: "Total ($)",
          value: "totalPrice",
        },
        {
          text: "Tour",
          value: "tour.name",
        },
        {
          text: "Deposited?",
          value: "isDeposited",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      invoices: [],
      name: "",
      search: "",
    };
  },
  methods: {
    viewinvoice(item) {
      this.$router.push(`/ssadmin/invoice/${item.id}`);
    },
    getColor(deposit) {
      if (deposit) return "green";
      else return "red";
    },
    confirmDeposit(invoice) {
      if (!invoice.isDeposited) {
        this.$swal
          .fire({
            title: "Confirm deposited?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .post(`/invoice-manager/invoices/${invoice.id}`)
                .then(() => this.$fetch());
              this.$swal.fire("", "Confirm deposit successfully!", "success");
            }
          });
      }
    },
    deleteItemConfirm(invoice) {
      if (invoice.isDeposited) {
        this.$swal.fire("", "You can't delete deposited invoice!", "error");
      } else {
        this.$swal
          .fire({
            title: "Confirm delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$axios
                .delete(`/invoice-manager/orders/${invoice.id}`)
                .then(() => this.$fetch());
              this.$swal.fire(
                "Deleted!",
                "The invoice has been deleted.",
                "success"
              );
            }
          });
      }
    },
  },
  middleware: ["isAuthenticated"],
};
</script>

<style>
</style>
