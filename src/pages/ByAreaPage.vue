<template>
  <div class="row grid lg:grid-cols-12 gap-4 bg-dark">
    <div class="lg:col-span-8 sm:col-span-12 q-px-sm q-mt-md">
      <q-card class="row justify-center text-white bg-slate-800">
        <q-card-section class="row col-12 justify-center">
          <div
            class="row col-12 justify-center text-h5 text-bold text-center text-white"
          >
            Time Series Data
          </div>
          <div
            class="row col-12 justify-center text-subtitle2 text-center text-white"
          >
            {{ displayName }}
          </div>
        </q-card-section>

        <q-card-section class="row">
          <chart-component
            :width="chartWidth.chart"
            :height="chartHeight"
            :options="timeDomainOptions"
            :series="timeDomainSeries"
          />
        </q-card-section>
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
      <q-card class="row q-my-lg justify-center text-white bg-slate-800">
        <q-card-section class="row col-12 justify-center">
          <div
            class="row col-12 justify-center text-h5 text-bold text-center text-white"
          >
            Frequency Data
          </div>
          <div
            class="row col-12 justify-center text-subtitle2 text-center text-white"
          >
            {{ displayName }}
          </div>
        </q-card-section>
        <q-card-section class="row col-12 justify-center">
          <chart-component
            class="row col-12 justify-center"
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
      class="bg-dark sm:col-span-12 text-white bg-slate-800 lg:col-span-4 mx-auto"
      :style="{ width: chartWidth.table }"
    >
      <div class="w-11/12 q-mx-sm">
        <q-input
          standout="bg-grey-9 text-white"
          type="text"
          v-model="fName"
          label="Search Fault Name"
          label-color="blue"
          :dense="dense"
          icon="search"
          class="q-mt-md"
          :input-style="{ color: 'white' }"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="blue" />
          </template>
        </q-input>
      </div>

      <div class="text-subtitle font-Poppins q-px-md">
        Faultline : {{ fName }}
      </div>

      <SelectionFaultlineComponent
        @selected-id="fetchById"
        :name="fName"
        class="font-Poppins"
      />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import SelectionFaultlineComponent from 'src/components/SelectionFaultlineComponent.vue';
import ChartComponent from 'components/ChartComponent.vue';
import axios from 'axios';

const fName = ref('');
const displayName = ref('');

const dense = ref(false);

const mainOption = ref({
  title: {
    style: {
      color: '#ffffff', // Change title color here
    },
  },
  stroke: {
    width: 3, // Set the desired line size
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
      datetimeFormatter: {
        year: 'yyyy',
        month: "MMM 'yy",
        day: 'dd MMM',
        hour: 'HH:mm',
      },
    },
  },
});
const timeDomainOptions = ref({
  ...mainOption.value,
  xaxis: {
    ...mainOption.value.xaxis,
    type: 'datetime',
  },
  title: {
    ...mainOption.value.title,
    text: 'Earthquake Event',
  },
});
const timeDomainSeries = ref([
  {
    name: 'Magnitude',
    data: [],
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
    return { chart: 650, table: '400px' };
  } else if (screenWidth.value > 1024) {
    return { chart: 650, table: '360px' };
  } else if (screenWidth.value > 768) {
    if (screenHeight.value < 1140) {
      return { chart: 550, table: '600px' };
    }
    return { chart: 500, table: '400px' };
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

const fetchById = async (data: { faultId: number }) => {
  const res = await fetchData(data.faultId);

  timeDomainSeries.value[0].data = res.data;
  displayName.value = res.name;
};

onMounted(async () => {
  try {
    const res = await fetchData(10);

    timeDomainSeries.value[0].data = res.data;
    displayName.value = res.name;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const fetchData = async (id: number) => {
  try {
    const path = `/fault-data/${id}`;

    const response = await axios.get(path);

    if (response?.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

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
