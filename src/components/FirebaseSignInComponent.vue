<template>
  <div class="">
    <q-card
      class="container h-full max-w-max bg-opacity-2 q-py-lg q-px-md"
      flat
      bordered
    >
      <q-card-section>
        <div class="text-h4 text-primary font-Poppins mb-3">Sign In</div>
        <br />
        <div class="row text-primary">
          <q-btn
            align="left"
            @click="onClickLoginGoogle"
            outline
            rounded
            class="col"
          >
            <q-icon class="pr-3">
              <q-img src="img/google.png" />
            </q-icon>
            Sign In with Google
          </q-btn>
        </div>
        <br />
        <div class="row text-primary">
          <q-btn
            align="left"
            @click="onClickLoginFacebook"
            outline
            rounded
            class="col"
          >
            <q-icon class="pr-3">
              <q-img src="img/facebook.png" />
            </q-icon>
            Sign In with Facebook
          </q-btn>
        </div>

        <br />

        <div class="row text-center">
          <q-btn
            class="col font-Poppins"
            rounded
            color="primary"
            label="Guest"
            :to="{ path: '/main/knownledge' }"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { LogIn } from './models';
import { loginWithFacebook, loginWithGoogle } from 'src/boot/firebase';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
import { useQuasar } from 'quasar';

// const userAuth = ref<LogIn>({
//   userName: '',
//   password: '',
// });
const size = ref('md');
const mediaWidth = ref(0);
// const tempUser = ref({
//   userName: 'user@1',
//   password: 'user123**',
// });

const q = useQuasar();

// Update mediaWidth when the window is resized
window.addEventListener('resize', () => {
  mediaWidth.value = window.innerWidth;
});
onMounted(() => {
  mediaWidth.value = window.innerWidth;
  if (mediaWidth.value < 600) {
    size.value = 'md';
  } else {
    size.value = 'md';
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    mediaWidth.value = window.innerWidth;
  });
});

const onClickLoginGoogle = async () => {
  try {
    // q.loading.show();
    const result = await loginWithGoogle();
    if (result) {
      // uid.value = result.user.uid!;
      // email.value = result.user.email!;
      // setAuhentication();
      router.push('/main/knownledge');
    }
  } catch (error) {
    q.notify({
      message: `${error}`,
      icon: 'warning',
      color: 'negative',
    });
  } finally {
    q.loading.hide();
  }
};

const onClickLoginFacebook = async () => {
  try {
    // q.loading.show();
    const result = await loginWithFacebook();
    if (result) {
      router.push('/main/knownledge');
    }
  } catch (error) {
    console.log('🚀  error:', error);
  }
};

// const checkUser = () => {
//   try {
//     if (!userAuth.value.userName) return alert('Please enter username');
//     if (!userAuth.value.password) return alert('Please enter password');
//     if (userAuth.value.userName !== tempUser.value.userName) {
//       return alert('Username not found');
//     }
//     if (userAuth.value.password !== tempUser.value.password) {
//       return alert('Password incorrect');
//     }
//     alert('Login Success');
//     return (window.location.href = '/#/main');
//   } catch (error) {
//     alert(error);
//   }
// };
</script>
