<template>
  <div class="row grid lg:grid-cols-12 gap-4">
    <div class="lg:col-span-8 sm:col-span-12 q-px-sm q-mt-md">
      <q-card class="row justify-center text-white bg-slate-800">
        <q-card-section class="row col-12 justify-center">
          <div
            class="row col-12 justify-center text-h5 text-bold text-center text-white"
          >
            Time Series Data
          </div>
          <div
            class="row col-12 justify-center text-subtitle2 text-center text-amber"
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
          The graph above represents the magnitude of earthquake events in
          Thailand from {{ dateStart }} until {{ dateEnd }}. Each data point
          corresponds to a recorded earthquake event, plotted against its
          occurrence date.
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
            class="row col-12 justify-center text-subtitle2 text-center text-amber"
          >
            {{ displayName }}
          </div>
        </q-card-section>
        <q-card-section class="row col-12 justify-center">
          <chart-component
            v-if="freqSeries.length"
            class="row col-12 justify-center"
            :width="chartWidth.chart"
            :height="chartHeight"
            :options="fregOptions"
            :series="freqSeries"
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
import { apiAnalysis } from 'src/boot/axios';

type ArrayFourierData = {
  NFFT: number[][][];
};

export type FreqDataSeries = eachFreq[];

export interface eachFreq {
  name: string;
  data: number[];
}
const N = ref(100);
const dateStart = ref('2007');
const dateEnd = ref('today');
const fName = ref('');
const displayName = ref('');

const dense = ref(false);

const mainOption = ref({
  title: {
    style: {
      color: '#000000', // Change title color here
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
    background: '#f6f6f6',
  },
  // colors: ['#ffc107', '#FF0000', '#00FF00'],
  colors: ['#FF0000', '#0000FF', '#ffc107', '#008000'],
  yaxis: {
    labels: {
      style: {
        colors: '#000000',
      },
    },
  },
  xaxis: {
    labels: {
      style: {
        colors: '#000000',
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

const fregOptions = ref({
  ...mainOption.value,
  title: {
    ...mainOption.value.title,
    text: 'FFT - Thai Quake data',
  },
  xaxis: {
    ...mainOption.value.xaxis,
    categories: Array.from({ length: N.value + 1 }, (_, i) => i),
  },
});

const freqSeries = ref([]);

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const chartWidth = computed(() => {
  console.log('🚀  screenWidth:', screenWidth.value);
  if (screenWidth.value > 1600) {
    return { chart: 1100, table: '400px' };
  } else if (screenWidth.value > 1450) {
    return { chart: 900, table: '360px' };
  } else if (screenWidth.value > 1020) {
    return { chart: 600, table: '360px' };
  } else if (screenWidth.value > 768) {
    if (screenHeight.value < 1140) {
      return { chart: 550, table: '600px' };
    }
    return { chart: 500, table: '400px' };
  } else {
    return {
      chart: screenWidth.value - 50,
      table: `${screenWidth.value - 10}px`,
    };
  }
});
const chartHeight = computed(() => (screenWidth.value > 768 ? 400 : 200));

const fetchById = async (data: { faultId: number }) => {
  const res = await fetchData(data.faultId);

  const freqRes: ArrayFourierData = await fetchFreqData(data.faultId);
  const newData = freqRes.NFFT;

  timeDomainSeries.value[0].data = res.data;
  displayName.value = res.name;

  const start = res.data[0][0];
  const end = res.data[res.data.length - 1][0];
  dateStart.value = new Date(start).toLocaleString();
  dateEnd.value = new Date(end).toLocaleString();

  freqSeries.value = newData.map((element) => {
    return {
      name: 'Magnitude',
      data: element[1].map((number) => {
        return Number(number.toFixed(4));
      }),
    };
  }) as any;
};

onMounted(async () => {
  try {
    const res = await fetchData(10);
    const freqRes: ArrayFourierData = await fetchFreqData(10);

    timeDomainSeries.value[0].data = res.data;
    const start = res.data[0][0];
    const end = res.data[res.data.length - 1][0];
    dateStart.value = new Date(start).toLocaleString();
    dateEnd.value = new Date(end).toLocaleString();
    displayName.value = res.name;

    const data = freqRes.NFFT;

    freqSeries.value = data.map((element) => {
      return {
        name: 'Magnitude',
        data: element[1].map((number) => {
          return Number(number.toFixed(4));
        }),
      };
    }) as any;
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

const fetchFreqData = async (id: number) => {
  try {
    const freqPath = `/${id}/7`;
    const response = await apiAnalysis.get(freqPath);
    if (response?.status !== 200) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
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
