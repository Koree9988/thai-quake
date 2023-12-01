<template>
  <div
    class="row justify-center text-black font-Poppins pt-5 text-3xl md:text-4xl text-bold pb-3"
  >
    Overview
  </div>
  <div class="row grid lg:grid-cols-12 gap-4 md:pl-20">
    <div class="lg:col-span-7 sm:col-span-12 q-px-sm q-mt-md">
      <q-card
        class="row q-my-lg justify-center text-white bg-dark rounded-3xl font-Poppins"
      >
        <q-card-section class="row col-12 justify-center">
          <div
            class="row col-12 justify-center text-2xl text-bold text-center text-white"
          >
            Time Series Data
          </div>
          <div
            class="row col-12 justify-center text-subtitle2 text-center text-amber"
          >
            {{ fName }}
          </div>
        </q-card-section>
        <q-card-section class="row col-12 justify-center">
          <chart-component
            :width="chartWidth.chart"
            :height="chartHeight"
            :options="timeDomainOptions"
            :series="timeDomainSeries"
          />
        </q-card-section>
        <q-card-section class="text-base lg:text-lg">
          The graph above represents the magnitude of earthquake events in
          Thailand from {{ dateStart }} until {{ dateEnd }}. Each data point
          corresponds to a recorded earthquake event, plotted against its
          occurrence date.
        </q-card-section>
      </q-card>
    </div>
    <div class="q-px-sm q-mt-md">
      <q-card class="q-my-lg rounded-3xl" :style="{ width: chartWidth.table }">
        <table-of-raw-data :liveData="dataLive" />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue';
import TableOfRawData from 'components/TableOfRawData.vue';
import ChartComponent from 'components/ChartComponent.vue';
import { axios } from 'src/boot/axios';
const dateStart = ref('2007');
const dateEnd = ref('today');
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
    fillSeriesColor: true,
  },
  chart: {
    type: 'line',
    background: '#f6f6f6',
  },
  // colors: ['#ffc107', '#FF0000', '#00FF00'],
  colors: ['#FF0000', '#0000FF', '#ffc107', '#008000'],
  yaxis: {
    title: {
      text: 'Magnitude',
    },
    labels: {
      style: {
        colors: '#000000',
      },
    },
  },
  xaxis: {
    title: {
      text: 'Date',
    },
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
const fName = ref('');
const dataLive = ref([]);

onMounted(async () => {
  try {
    const [res, resTb] = await Promise.all([fetchData(10), fetchTable()]);
    dataLive.value = resTb;
    timeDomainSeries.value[0].data = res.data;
    const start = res.data[0][0];
    const end = res.data[res.data.length - 1][0];
    dateStart.value = new Date(start).toLocaleString();
    dateEnd.value = new Date(end).toLocaleString();
    fName.value = res.name;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
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

const screenWidth = ref(window.innerWidth);
const screenHeight = ref(window.innerHeight);
const chartWidth = computed(() => {
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

const fetchTable = async () => {
  const response = await axios.get('/fault-data/lastweek');
  if (response?.status === 200) {
    console.log(response.data);
    return response.data;
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
