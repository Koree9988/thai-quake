<template>
  <div class="row grid lg:grid-cols-12 gap-4 bg-dark">
    <div
      class="text-white text-h4 col-span-12 mx-auto q-my-lg text-bold font-Poppins"
    >
      KNOWNLEDGE
    </div>
    <div class="col-span-12 q-pt-xs q-px-md lg:q-px-xl">
      <KnownledgeComponent
        v-for="(item, index) in knownledgeData"
        :key="index"
        :data="item"
      />
      <!-- <q-card class="row justify-center text-white bg-slate-800 font-Poppins">
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
      </q-card> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import KnownledgeComponent from 'src/components/KnownledgeComponent.vue';
import knownledgeData from '../../public/data/knownledge.json';
// import { ref } from 'vue';
</script>
