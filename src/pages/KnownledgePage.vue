<template>
  <div>
    <div
      class="row justify-center text-black text-3xl md:text-4xl mx-auto q-my-lg text-bold font-Poppins"
    >
      Knowledge
    </div>
    <div
      class="row justify-center mx-2 lg:mx-10 col-span-12 q-pt-xs lg:q-px-md max-w-screen-2xl mb-10"
    >
      <div class="w-11/12">
        <q-card class="rounded-card">
          <q-tabs
            v-model="tab"
            dense
            class="text-white h-20"
            active-color="red"
            indicator-color="red"
            align="justify"
            narrow-indicator
          >
            <q-tab
              v-for="(item, index) in knownledgeData"
              class="custom-tab font-Poppins"
              :key="index"
              :name="item.TITLE"
              :label="item.TITLE"
            ></q-tab>
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel
              v-for="(item, index) in knownledgeData"
              :key="index"
              :name="item.TITLE"
            >
              <KnownledgeComponent :data="item" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KnownledgeComponent from 'src/components/KnownledgeComponent.vue';
import knownledgeData from '../../public/data/knownledge.json';
import { ref } from 'vue';
const tab = ref(knownledgeData[0].TITLE);
</script>

<style>
.rounded-card {
  border-radius: 20px;
}

.custom-tab {
  font-size: 50px;
}
</style>
