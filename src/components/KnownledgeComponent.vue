<template>
  <q-card
    class="row justify-center text-white bg-slate-800 font-Poppins q-mt-md"
    v-if="data"
  >
    <q-card-section>
      <div class="text-h5">{{ data.TITLE }}</div>
    </q-card-section>
    <q-card-section v-for="(item, index) in data.TEXT" :key="index">
      <div v-if="item !== 'img'" class="row q-py-sm">{{ item }}</div>
      <div v-if="index === 0" class="row justify-center q-py-md">
        <q-img :width="chartWidth" :src="`img/${data.IMG_URL[0]}`" />
      </div>
      <div
        v-if="item === 'img' && index !== 0"
        class="row justify-center q-py-md"
      >
        <q-img :width="chartWidth" :src="`img/${data.IMG_URL[1]}`" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface Data {
  IMG_URL: string[];
  TITLE: string;
  TEXT: string[];
}
const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
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
