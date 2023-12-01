<template>
  <div>
    <div v-if="!user">
      <div id="firebaseui-auth-container"></div>
    </div>
    <div v-else>
      <p>Welcome, {{ user.displayName }}!</p>
      <button @click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

import * as firebaseui from 'firebaseui';

export default {
  setup() {
    const user = ref(null);
    const signOut = () => {
      auth.signOut();
    };

    onMounted(() => {
      const ui = new firebaseui.auth.AuthUI(auth);

      auth.onAuthStateChanged((newUser) => {
        user.value = newUser;
      });

      ui.start('#firebaseui-auth-container', uiConfig);
    });

    return { user, signOut };
  },
};
</script>
