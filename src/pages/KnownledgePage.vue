<template>
  <div class="row grid lg:grid-cols-12 gap-4 bg-dark">
    <div
      class="text-white text-h4 col-span-12 mx-auto q-my-lg text-bold font-Poppins"
    >
      KNOWNLEDGE
    </div>
    <div class="col-span-12 q-pt-xs q-px-md lg:q-px-xl">
      <q-card class="row justify-center text-white bg-slate-800 font-Poppins">
        <q-card-section> </q-card-section>
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
      <q-card
        class="row justify-center q-my-md text-white bg-slate-800 font-Poppins"
      >
        <q-card-section> </q-card-section>
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
</script>
