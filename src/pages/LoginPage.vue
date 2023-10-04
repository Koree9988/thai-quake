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
        <div class="row mt-5">
          <q-img
            src="img/globe.png"
            class="col w-1/12 lg:w-1/5 md:w-1/6 sm:w-1/12 my-10 ml-10"
          />
          <div
            class="col row text-white font-Poppins q-mt-lg q-mx-md q-pt-xl q-px-md"
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
        class="container row sm:col-span-10 lg:col-span-3 lg:col-end-11 -mt-5 lg:-mt-0 text-center"
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
