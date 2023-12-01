<template>
  <div>
    <apex-charts
      :key="chartKey"
      :width="width"
      :height="height"
      :options="options"
      :series="series"
      :colors="colors"
    ></apex-charts>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ApexCharts from 'vue3-apexcharts';
import ApexOptions from 'vue3-apexcharts';

export type ChartOptions = typeof ApexOptions;

export interface Series {
  name: string;
  data: number[];
}

const { options, series, width, height, colors } = defineProps({
  options: Object,
  series: Object as () => Series[],
  width: Number,
  height: Number,
  colors: Array,
});

const chartKey = ref(0); // Reactive property to force re-render

onMounted(() => {
  // Add event listener for window resize
  window.addEventListener('resize', handleOrientationChange);
});

onUnmounted(() => {
  // Clean up the event listener when component is destroyed
  window.removeEventListener('resize', handleOrientationChange);
});

function handleOrientationChange() {
  chartKey.value++; // Increment chartKey to force chart re-render
}
</script>
