<template>
  <div>
    <v-card class="userColor2" dark>
      <v-card-title class="text-capitalize">plan your trip</v-card-title>
      <v-card-subtitle class="white--text">It's time to plan just the perfect vacation!</v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="tour"
            label="Search Tour"
            prepend-inner-icon="mdi-compass"
            outlined
            class="white--text rounded-0 font-weight-bold"
            background-color="userColorLighter"
          >
          </v-text-field>
          <v-text-field
            v-model="whereTo"
            label="Where to?"
            prepend-inner-icon="mdi-magnify"
            outlined
            class="white--text rounded-0 font-weight-bold my-n6"
            background-color="userColorLighter"
          >
          </v-text-field>
          <v-select
            :items="months"
            v-model="selectedMonth"
            placeholder="Month"
            prepend-inner-icon="mdi-calendar-blank"
            class="white--text rounded-0 font-weight-bold"
            background-color="userColorLighter"
            outlined
          ></v-select>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whereTo: '',
      tour: '',
      selectedMonth: '',
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
    }
  }
}
</script>

<style>

</style>
