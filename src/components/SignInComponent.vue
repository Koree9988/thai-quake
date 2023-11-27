<template>
  <div class="items-center">
    <q-card
      class="container h-full max-w-max bg-opacity-2 q-py-lg q-px-md"
      flat
      bordered
    >
      <q-card-section class="q-gutter-y-sm">
        <div class="text-h4 text-primary font-Poppins">Sign In</div>
        <div class="text-white">
          <q-input
            color="dark"
            class="q-my-sm font-Poppins"
            label="Username"
            label-color="dark"
            rounded
            outlined
            v-model="userAuth.userName"
            :input-style="{ color: 'black' }"
            :rules="[(val) => !!val || 'Username is required']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="dark" />
            </template>
          </q-input>
          <q-input
            color="dark"
            class="q-my-sm font-Poppins"
            label="Password"
            label-color="dark"
            rounded
            outlined
            v-model="userAuth.password"
            type="password"
            :input-style="{ color: 'black' }"
            :rules="[(val) => !!val || 'Password is required']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="dark" />
            </template>
          </q-input>
        </div>
        <div class="row text-center">
          <q-btn
            class="col font-Poppins"
            rounded
            outline
            color="primary"
            label="Sign In"
            @click="checkUser"
          />
        </div>
        <!-- <q-separator color="dark" inset /> -->
        <div class="text-subtitle1 text-black text-center font-Poppins">OR</div>

        <div class="q-px-sm text-center">
          <div class="q-gutter-x-lg">
            <q-btn class="glossy" :size="size" round color="red" icon="mail" />
            <q-btn
              class="glossy"
              :size="size"
              round
              color="blue"
              icon="facebook"
            />
            <q-btn
              class="glossy"
              :size="size"
              round
              color="green"
              icon="phone"
              @click="logSize"
            />
          </div>
        </div>
        <br />
        <!-- <q-separator color="white" inset /> -->
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
const userAuth = ref<LogIn>({
  userName: '',
  password: '',
});
const size = ref('md');
const mediaWidth = ref(0);
const tempUser = ref({
  userName: 'user@1',
  password: 'user123**',
});

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
function logSize() {
  console.log(size.value);
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    mediaWidth.value = window.innerWidth;
  });
});

function checkUser() {
  try {
    if (!userAuth.value.userName) return alert('Please enter username');
    if (!userAuth.value.password) return alert('Please enter password');
    if (userAuth.value.userName !== tempUser.value.userName) {
      return alert('Username not found');
    }
    if (userAuth.value.password !== tempUser.value.password) {
      return alert('Password incorrect');
    }
    alert('Login Success');
    return (window.location.href = '/#/main');
  } catch (error) {
    alert(error);
  }
}
</script>
