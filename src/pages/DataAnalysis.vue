<template>
  <div class="row grid lg:grid-cols-12 gap-4 bg-dark">
    <div class="lg:col-span-7 sm:col-span-12 q-px-sm q-mt-md">
      <q-card class="row q-my-lg justify-center text-white bg-slate-800">
        <q-card-section class="row col-12 justify-center">
          <div
            class="row col-12 justify-center text-h5 text-bold text-center text-white"
          >
            Time Series Data
          </div>
          <div
            class="row col-12 justify-center text-subtitle2 text-center text-white"
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
        <q-card-section>
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
    <div class="lg:col-span-5 sm:col-span-12 q-px-sm q-mt-md">
      <q-card
        class="q-my-lg bg-dark sm:col-span-12 lg:col-span-5 mx-auto"
        :style="{ width: chartWidth.table }"
      >
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
const fName = ref('');
const dataLive = ref([]);

onMounted(async () => {
  try {
    const [res, resTb] = await Promise.all([fetchData(10), fetchTable()]);
    dataLive.value = resTb;
    timeDomainSeries.value[0].data = res.data;
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
