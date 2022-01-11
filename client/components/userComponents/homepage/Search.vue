<template>
  <div class="home-page">
    <v-container class="mt-n10">
      <v-row no-gutters>
        <v-col cols="12" md="5" align="center">
          <v-text-field
            v-model="whereTo"
            placeholder="Where to?"
            prepend-inner-icon="mdi-compass"
            outlined
            class="white rounded-0 font-weight-bold search-text"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="5" align="center">
          <v-select
            :items="months"
            v-model="selectedMonth"
            placeholder="Month"
            prepend-inner-icon="mdi-calendar-blank"
            class="white rounded-0 font-weight-bold search-text"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" md="2" align="center">
          <v-btn
            class="userColorDarker rounded-0 box-shadow"
            block
            height="56"
            @click="search"
            depressed
            >Find now</v-btn
          >
        </v-col>
      </v-row></v-container
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      whereTo: "",
      selectedMonth: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  methods: {
    search() {
      let month = this.months.indexOf(this.selectedMonth) + 1;
      if (month <= 0) month = ''
      this.$axios
        .get(`/tours/search/`, {
          params: {
            month,
            destinationName: this.whereTo,
          }
        })
        .then((tours) => console.log(tours.data));
    },
  },
};
</script>

<style>
.search-text fieldset {
  color: white !important;
  box-shadow: 0px 5px 0px #4dd0e1;
}

.box-shadow {
  box-shadow: 0px 5px 0px #4dd0e1;
}
</style>

