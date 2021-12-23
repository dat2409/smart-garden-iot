import Vue from 'vue'

export default function({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    Vue.notify({
      group: 'foo',
      title: 'No permission',
      text: 'You are not authenticated!',
    })
    return redirect("/ssadmin/login");
  }
}
