export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn; // auth object as default will be added in vuex state, when you initialize nuxt auth
  },
  getUserInfo(state) {
    return state.auth.user;
  },
  isManager(state) {
    return state.auth.user.role === 'MANAGER';
  }
};

export const state = () => ({
  selectedTour: {},
  selectedUser: {},
  selectedGarden: {},
})

export const mutations = {
  setSelectedTour(state, selectedTour) {
    state.selectedTour = selectedTour;
  },
  setSelectedUser(state, selectedUser) {
    state.selectedUser = selectedUser;
  },
  setSelectedGarden(state, selectedGarden) {
    state.selectedGarden = selectedGarden;
  },
}

export const actions = {
  setSelectedTour({ commit }, selectedTour) {
    commit('setSelectedTour', selectedTour);
  },
  setSelectedUser({ commit }, selectedUser) {
    commit('setSelectedUser', selectedUser);
  },
  setSelectedGarden({ commit }, selectedGarden) {
    commit('setSelectedGarden', selectedGarden);
  },
}
