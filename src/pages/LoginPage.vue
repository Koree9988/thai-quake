<template>
  <q-page>
    <!-- <div class="flex justify-center md:justify-between">
      <div class="md:col-8 sm:flex md:flex-1">
        <div
          class="text-h2 text-bold text-white w-full text-center mt-[60px] md:mt-1"
        >
          Thai Quake
        </div>
      </div>
      <div class="md:h-screen">
        <SignIn />
      </div>
    </div> -->
    <div class="my-auto grid lg:grid-cols-10 gap-4">
      <div class="lg:h-screen sm:col-span-10 lg:col-span-7">
        <div
          class="text-h2 text-bold text-white w-full text-center mt-[50px] font-Poppins"
        >
          THAI QUAKE
        </div>
        <div class="text-center row mt-5 mx-10">
          <q-img src="img/globe.png" class="col lg:w-[20%] sm:w-[10%]" />
          <div class="col text-white text-h4 font-Poppins">Welcome</div>
        </div>
      </div>
      <div
        class="container row sm:col-span-10 lg:col-span-3 lg:col-end-11 lg:-mt-0 text-center"
      >
        <SignIn class="mx-auto" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SignIn from 'components/SignInComponent.vue';
// import { ref } from 'vue';

// const userName = ref(null);
// const password = ref(null);
</script>
