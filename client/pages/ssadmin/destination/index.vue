<template>
  <div>
    <v-form @submit.prevent="onUpload">
      <v-text-field label="Name" v-model="name"/>
      <v-text-field label="Address" v-model="address"/>
      <v-text-field label="Description" v-model="desc"/>
      <v-file-input type="file" name="imagesArray" multiple counter show-size @change="onChange" />
      <br>
      <v-btn type="submit">Create destination</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "IndexDestination",
  layout: "admin",
  data() {
    return {
      imagesArray: null,
      name: '',
      address: '',
      desc: '',
    };
  },
  methods: {
    onChange(files) {
      this.imagesArray = files;
      console.log(this.imagesArray);
    },
    onUpload() {
      const formData = new FormData();
      for (const i of Object.keys(this.imagesArray)) {
        formData.append("imagesArray", this.imagesArray[i]);
      }
      formData.append('name', this.name);
      formData.append('address', this.address);
      formData.append('desc', this.desc);

      this.$axios
        .post("http://localhost:5000/destinations", formData, {})
        .then((res) => {
          console.log(res);
        });
    },
  },
  middleware: ['isAuthenticated']
};
</script>

<style scoped lang="css">
.container {
  max-width: 550px;
}
</style>
