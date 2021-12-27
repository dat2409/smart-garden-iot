import Vue from 'vue'

export default function ({ store, redirect }) {
  // console.log(this.$axios.defaults.baseURL)
  console.log(this.$axios.defaults.baseURL)
  if (store.state.auth.user.role !== "MANAGER") {
    Vue.notify({
      group: 'foo',
      title: 'No permission',
      text: 'Must be a manager to do this action!',
    })
    return redirect("/ssadmin");
  }
}
