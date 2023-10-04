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
    <div class="my-auto grid lg:grid-cols-10 gap-4 q-pb-lg">
      <div class="lg:h-screen sm:col-span-10 lg:col-span-7">
        <div
          class="text-h2 text-bold text-white w-full text-center mt-[50px] font-Poppins"
        >
          THAI QUAKE
        </div>
        <div class="row justify-center mt-10 grid sm:grid-cols-2">
          <div
            class="col row justify-center px-40 lg:px-1 my-5 ml-10 col-span-2 lg:col-span-1 lg:-mt-0"
          >
            <q-img src="img/globe.png" style="max-width: 90%; min-width: 20%" />
          </div>

          <div
            class="col row justify-center text-white font-Poppins q-mx-md q-pt-xl q-px-md col-span-2 -mt-20 lg:-mt-0 lg:col-span-1"
          >
            <div class="text-white text-h5 lg:text-h4 q-pl-md md:q-pt-xl">
              <div class="text-bold text-white text-h4 lg:text-h3 q-mb-lg">
                Welcome
              </div>
              Experience real-time Thai earthquake insights through our web
              application, leveraging Fourier Transform for data analysis.
              Comprehensive, and user friendly interface for all.
            </div>
          </div>
        </div>
      </div>
      <div
        class="container row sm:col-span-10 lg:col-span-3 lg:col-end-11 text-center"
      >
        <SignIn class="mx-auto" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SignIn from 'components/SignInComponent.vue';
// const userName = ref(null);
// const password = ref(null);
</script>
