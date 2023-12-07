import { defineStore } from 'pinia';

export const useCounterStore = defineStore('system_user', {
  state: () => ({
    user: {
      displayName: 'Guest',
    },
  }),

  getters: {
    currentUser(state) {
      return state.user;
    },
  },

  actions: {
    setStateUser(firebaseUser: any) {
      this.user.displayName = firebaseUser.displayName;
    },
  },
});
