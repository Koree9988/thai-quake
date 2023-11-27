<template>
  <q-card
    class="row justify-center text-black bg-white font-Poppins q-mx-xs"
    v-if="data"
  >
    <q-card-section class="row justify-center">
      <div class="text-h5 text-bold text-primary">{{ data.TITLE }}</div>
    </q-card-section>
    <q-card-section
      class="row col-12 justify-center font-Poppins text-base lg:text-lg"
      v-for="(item, index) in data.TEXT"
      :key="index"
    >
      <div v-if="item !== 'img'" class="row q-py-sm q-px-lg">
        <div v-if="Array.isArray(item)">
          <li v-for="(ls, idx) in item" :key="idx" clss="text-h6">{{ ls }}</li>
        </div>
        <div v-else>{{ item }}</div>
      </div>
      <div v-if="index === 0" class="q-py-xs">
        <q-img
          :width="chartWidth"
          :src="`img/${data.IMG_URL[0]}`"
          class="row justify-center bg-slate-800"
        />
        <p class="row mt-3 justify-center" v-if="data.SOURCE[0] !== ''">
          Source: {{ data.SOURCE[0] }}
        </p>
      </div>
      <div v-if="item === 'img' && index !== 0" class="q-py-md">
        <q-img
          :width="chartWidth"
          :src="`img/${data.IMG_URL[1]}`"
          class="row justify-center"
        />
        <p class="row mt-3 justify-center" v-if="data.SOURCE[1] !== ''">
          Source: {{ data.SOURCE[1] }}
        </p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface Data {
  IMG_URL: string[];
  SOURCE: string[];
  TITLE: string;
  TEXT: string[];
}
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const tab = ref('web-scraping');
const chartWidth = computed(() => {
  if (screenWidth.value > 1200) {
    return '500px';
  } else if (screenWidth.value > 1024) {
    return '460px';
  } else if (screenWidth.value > 768) {
    if (screenHeight.value < 1140) {
      return '700px';
    }
    return '500px';
  } else {
    return `${screenWidth.value - 100}px`;
  }
});
defineProps({
  data: Object as () => Data,
});
</script>
