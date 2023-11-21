<template>
  <div class="row grid lg:grid-cols-12 gap-4 bg-dark">
    <div
      class="text-white text-h4 col-span-12 mx-auto q-my-lg text-bold font-Poppins"
    >
      Knowledge
    </div>

    <div
      class="row justify-between q-mx-auto col-span-12 q-pt-xs q-px-md lg:q-px-xl max-w-screen-2xl"
    >
      <KnownledgeComponent
        v-for="(item, index) in knownledgeData"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import KnownledgeComponent from 'src/components/KnownledgeComponent.vue';
import knownledgeData from '../../public/data/knownledge.json';
// import { ref } from 'vue';
</script>
