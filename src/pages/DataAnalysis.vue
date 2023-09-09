<template>
  <div class="row grid lg:grid-cols-12 gap-4 bg-dark">
    <div class="lg:col-span-7 sm:col-span-12 q-px-sm q-mt-md">
      <q-card class="row justify-center text-white bg-slate-800">
        <q-card-section>
          <chart-component
            :width="chartWidth.chart"
            :height="chartHeight"
            :options="chart1Options"
            :series="chart1Series"
          />
        </q-card-section>
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
      <q-card class="row q-my-lg justify-center text-white bg-slate-800">
        <q-card-section>
          <chart-component
            :width="chartWidth.chart"
            :height="chartHeight"
            :options="chart2Options"
            :series="chart2Series"
          />
        </q-card-section>
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
    <q-card
      class="bg-dark sm:col-span-12 lg:col-span-5 mx-auto"
      :style="{ width: chartWidth.table }"
    >
      <!-- <div class="text-white">{{ screenWidth }} : {{ screenHeight }}</div> -->
      <table-of-raw-data />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import TableOfRawData from 'components/TableOfRawData.vue';
import ChartComponent from 'components/ChartComponent.vue';

const mainOption = ref({
  title: {
    style: {
      color: '#ffffff', // Change title color here
    },
  },
  tooltip: {
    theme: 'dark',
    fillSeriesColor: false,
  },
  chart: {
    type: 'line',
    background: '#263238',
  },
  colors: ['#ffc107', '#FF0000', '#00FF00'],
  yaxis: {
    labels: {
      style: {
        colors: '#ffffff',
      },
    },
  },
  xaxis: {
    labels: {
      style: {
        colors: '#ffffff',
      },
    },
  },
});
const chart1Options = ref({
  ...mainOption.value,
  title: {
    ...mainOption.value.title,
    text: 'FFT - Earthquake data',
  },
  xaxis: {
    ...mainOption.value.xaxis,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
});

const chart1Series = ref([
  {
    name: 'range',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
]);

const chart2Options = ref({
  ...mainOption.value,
  title: {
    ...mainOption.value.title,
    text: 'FFT - Thai Quake data',
  },
  xaxis: {
    ...mainOption.value.xaxis,
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
});

const chart2Series = ref([
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
]);

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const chartWidth = computed(() => {
  if (screenWidth.value > 1200) {
    return { chart: 600, table: '500px' };
  } else if (screenWidth.value > 1024) {
    return { chart: 600, table: '460px' };
  } else if (screenWidth.value > 768) {
    if (screenHeight.value < 1140) {
      return { chart: 500, table: '700px' };
    }
    return { chart: 500, table: '500px' };
    // return 500; // Medium screens
  } else {
    return {
      chart: screenWidth.value - 50,
      table: `${screenWidth.value - 10}px`,
    };
    // return 350; // Small screens
  }
});
const chartHeight = computed(() => (screenWidth.value > 768 ? 250 : 200));

watchEffect(() => {
  const updateWidth = () => {
    screenWidth.value = window.innerWidth;
  };
  window.addEventListener('resize', updateWidth);
  return () => {
    window.removeEventListener('resize', updateWidth);
  };
});
</script>
