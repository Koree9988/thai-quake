<template>
  <div
    class="row justify-center font-Poppins pt-5 text-black text-3xl md:text-4xl text-bold"
  >
    Earthquake Analysis
  </div>
  <div class="row justify-end px-3 py-3 font-Poppins">
    <q-select
      color="orange"
      filled
      v-model="searchFault"
      label-color="white"
      rounded
      bg-color="primary"
      emit-value
      map-options
      :options="options"
      label="Select Group of Faut Line"
      class="w-full md:w-96 max-w-lg min-w-md q-pr-sm"
    >
      <template v-if="searchFault" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop.prevent="searchFault = 10"
          class="cursor-pointer"
        />
      </template>
    </q-select>
  </div>
  <div class="row grid lg:grid-cols-12 gap-4">
    <div class="lg:col-span-8 sm:col-span-12 q-px-sm q-mt-md">
      <q-card class="row justify-center text-white bg-dark rounded-3xl">
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
        <q-card-section class="row col-12 px-12 text-base lg:text-lg">
          <div class="row col-12 justify-start">
            The graph above represents the magnitude of earthquake events in
            Thailand from {{ dateStart }} until {{ dateEnd }}. Each data point
            corresponds to a recorded earthquake event, plotted against its
            occurrence date.
          </div>
        </q-card-section>
      </q-card>
      <q-card class="row q-my-lg justify-center text-white bg-dark rounded-3xl">
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
        <q-card-section
          class="row col-12 px-12 font-Poppins text-base lg:text-lg"
        >
          <div class="row col-12 py-5 text-bold text-amber">
            Average Magnitude
          </div>
          <div class="row col-12">
            <p
              class="row col-12 text-sm lg:text-base"
              v-for="(avg, idx) in avgMagnitude"
              :key="idx"
            >
              {{
                `Sample-${idx + 1}: start(${
                  summaryData[idx].range.start
                }), end(${summaryData[idx].range.end}), average: ${avg.toFixed(
                  4
                )}`
              }}
            </p>
          </div>
          <div class="row col-12 py-5 text-bold text-amber">Summary</div>
          <div class="row col-12">
            {{ firstFreqParagraph }}
          </div>
          <div class="row col-12 py-3">
            {{ calculationParagraph }}
          </div>
          <div class="row col-12 py-3">{{ secondFreqParagraph }}</div>
          <div class="row col-12 text-amber justify-center">
            **** {{ noticeParagraph }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-card
      class="sm:col-span-12 text-white lg:col-span-4 mx-auto w-11/12 q-mt-md q-mb-xl bg-dark rounded-3xl"
      style="height: 900px"
    >
      <div class="w-11/12 q-mx-sm">
        <div class="row justify-center text-h5 text-bold font-Poppins py-6">
          Maps of Group Fault Line
        </div>
        <div style="height: 768px; width: 100%" class="q-my-lg q-mx-sm">
          <l-map
            class="row justify-center"
            ref="map"
            v-model:zoom="zoom"
            :center="(center as any)"
            v-model:bounds="boundingArea"
            :useGlobalLeaflet="false"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="Stadia Maps Basemap"
            ></l-tile-layer>
            <div v-for="(polygon, index) in PolygonFault" :key="index">
              <l-polygon
                :lat-lngs="(polygon as any)"
                :color="polygonColors[index]"
                :stroke="true"
                :weight="2"
                :fill-opacity="polygonOpacity"
                @click="handleMarkerClick(index)"
                ><l-popup>{{ faultListOptions[index].label }}</l-popup>
              </l-polygon>
            </div>
          </l-map>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
//*********************************************** */
//**********************Import******************* */
//*********************************************** */
import { ref, watch, computed, watchEffect, onMounted, Ref } from 'vue';
import ChartComponent from 'components/ChartComponent.vue';
import axios from 'axios';
import { apiAnalysis } from 'src/boot/axios';

//
import { PolygonFault } from 'src/assets/data/lat-long-position';
//import leaftlet
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LPolygon, LPopup } from '@vue-leaflet/vue-leaflet';
import {
  calculationPart,
  findPeaksWithThreshold,
  paragraphOneConclude,
  paragraphTwoConclude,
} from 'src/service/peakFrequency.service';
import dayjs from 'dayjs';
import { start } from 'repl';

// import { LatLng } from 'leaflet';

// import arcades from "./arcades.json"

//*********************************************** */
//***********************Type******************** */
//*********************************************** */
type ArrayFourierData = {
  NFFT: number[][][];
};

//*********************************************** */
//**********************Variable***************** */
//*********************************************** */

//Leaflet Variable
const zoom = ref(6);
const center = ref([12.91, 99.59]);
const topLeft = ref([20.932613, 95.994457]);
const bottomRight = ref([5.35761, 105.854909]);
const boundingArea = ref([topLeft, bottomRight]);

//date range = [2557,2557,]

//polygon and marker
const polygonOpacity = ref(0.2);

const showPopup = ref([
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

// const polygonCoordinates = PolygonFault.PHA_YAO;
// const polygonCoordinatesMaeLao = PolygonFault.MAE_LAO;

const freqPeak = ref<number[][]>([]);
const avgMagnitude = ref<number[]>([]);

const selectedPolygonIndex = ref(9);

const polygonColors = ref([
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'red',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
  'gray',
]);
//leaflet method
const handleMarkerClick = (index: number) => {
  const faultId = index + 1;
  if (selectedPolygonIndex.value !== null) {
    polygonColors.value[selectedPolygonIndex.value] = 'gray';
  }
  polygonColors.value[index] = 'red';
  searchFault.value = faultId;

  showPopup.value = showPopup.value.map((_, i) => i === index);

  selectedPolygonIndex.value = index;
};

const searchFault = ref(10);
const faultListOptions = [
  { label: 'KHLONG MARUI', value: 1 },
  { label: 'MAE CHAN', value: 2 },
  { label: 'MAE HONG SON', value: 3 },
  { label: 'MAE ING', value: 4 },
  { label: 'MOEI', value: 5 },
  { label: 'MAE THA', value: 6 },
  { label: 'THOEN', value: 7 },
  { label: 'PHETCHABUN', value: 8 },
  { label: 'PUA', value: 9 },
  { label: 'PHA YAO', value: 10 },
  { label: 'RANONG', value: 11 },
  { label: 'SI SAWAT', value: 12 },
  { label: 'THREE PAGODA', value: 13 },
  { label: 'UTTARADIT', value: 14 },
  { label: 'WIANG HAENG', value: 15 },
  { label: 'MAE LAO', value: 16 },
];

const dateStart = ref('2007');
const dateEnd = ref('today');
// const fName = ref('');
const displayName = ref('');

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
      text: 'Unit',
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
const timeDomainOptions = ref({
  ...mainOption.value,
  xaxis: {
    ...mainOption.value.xaxis,
    type: 'datetime',
    title: {
      text: 'Date',
    },
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

const sampleDateDiff = ref(0);

const fregOptions = ref({
  ...mainOption.value,
  title: {
    ...mainOption.value.title,
    text: 'NFFT - Thai Quake data',
  },
  xaxis: {
    ...mainOption.value.xaxis,
    type: 'numeric',
    min: 1,
    max: 20,
    title: {
      text: 'Frequency',
      offsetY: 0,
    },
    labels: {
      formatter: function (value: number) {
        return value - 1;
      },
    },
  },
});

const freqSeries = ref([]);

const calculationParagraph = ref('Not enough data.');
const firstFreqParagraph = ref('Not enough data.');
const secondFreqParagraph = ref('Not enough data.');
const summaryData: Ref<
  {
    range: {
      start: string;
      end: string;
    };
    count: number;
  }[]
> = ref([]);

const noticeParagraph =
  'This information is an estimate based on available information only.';

const options = ref(faultListOptions);
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

//*********************************************** */
//**********************Methods****************** */
//*********************************************** */

const fetchById = async (id: number) => {
  const res = await fetchData(id);

  handleMarkerClick(id - 1);

  const rangeDate = await fetchSeparateData(id);

  const freqRes: ArrayFourierData = await fetchFreqData(id);
  summaryData.value = await fetchSummary(10);

  const newData = freqRes.NFFT;

  timeDomainSeries.value[0].data = res.data;

  sampleDateDiff.value = await calculateDateDiff(
    rangeDate[1].data[0][0],
    rangeDate[1].data.at(-1)[0]
  );

  displayName.value = res.name;

  const start = res.data[0][0];
  const end = res.data[res.data.length - 1][0];
  dateStart.value = new Date(start).toLocaleString();
  dateEnd.value = new Date(end).toLocaleString();

  freqSeries.value = newData.map((element, index) => {
    avgMagnitude.value[index] = element[1][0];
    freqPeak.value[index] = findPeaksWithThreshold(element[1], 0.35);
    if (index == 2) {
      return {
        name: `Sample:${index + 1}`,
        data: element[1].map((number) => {
          return Number(number.toFixed(4));
        }),
      };
    }

    return {
      name: `Sample:${index + 1}`,
      data: element[1].map((number) => {
        return Number(number.toFixed(4));
      }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  calculationParagraph.value = calculationPart(
    sampleDateDiff.value,
    freqPeak.value[0][0]
  );
  firstFreqParagraph.value = paragraphOneConclude(
    displayName.value,
    freqPeak.value[0][0],
    [
      summaryData.value[0].count,
      summaryData.value[1].count,
      summaryData.value[2].count,
    ]
  );
  secondFreqParagraph.value = paragraphTwoConclude(
    avgMagnitude.value[2],
    summaryData.value[0].count * freqPeak.value[0][0]
  );
};

onMounted(async () => {
  try {
    const res = await fetchData(10);
    const freqRes: ArrayFourierData = await fetchFreqData(10);
    summaryData.value = await fetchSummary(10);

    const rangeDate = await fetchSeparateData(10);

    sampleDateDiff.value = await calculateDateDiff(
      rangeDate[1].data[0][0],
      rangeDate[1].data.at(-1)[0]
    );

    timeDomainSeries.value[0].data = res.data;
    const start = res.data[0][0];
    const end = res.data[res.data.length - 1][0];
    dateStart.value = new Date(start).toLocaleString();
    dateEnd.value = new Date(end).toLocaleString();
    displayName.value = res.name;

    const data = freqRes.NFFT;

    freqSeries.value = data.map((element, index) => {
      avgMagnitude.value[index] = element[1][0];
      freqPeak.value[index] = findPeaksWithThreshold(element[1], 0.35);
      if (index == 2) {
        const temp = element[1].map((number) => {
          return Number(number.toFixed(4));
        });

        return {
          name: `Sample:${index + 1}`,
          data: element[1].map((number) => {
            return Number(number.toFixed(4));
          }),
        };
      }

      return {
        name: `Sample:${index + 1}`,
        data: element[1].map((number) => {
          return Number(number.toFixed(4));
        }),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    calculationParagraph.value = calculationPart(
      sampleDateDiff.value,
      freqPeak.value[0][0]
    );
    firstFreqParagraph.value = paragraphOneConclude(
      displayName.value,
      freqPeak.value[0][0],
      [
        summaryData.value[0].count,
        summaryData.value[1].count,
        summaryData.value[2].count,
      ]
    );
    secondFreqParagraph.value = paragraphTwoConclude(
      avgMagnitude.value[2],
      Math.ceil(sampleDateDiff.value / freqPeak.value[0][0])
    );
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const calculateDateDiff = async (stDate: number, enDate: number) => {
  const diff = await dayjs(new Date(enDate)).diff(
    dayjs(new Date(stDate)),
    'day'
  );
  return diff;
};

const fetchData = async (id: number) => {
  try {
    const path = `/fault-data/${id}`;

    const response = await axios.get(path);

    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchSeparateData = async (id: number) => {
  try {
    const path = `/fault-data/analyze?id=${id}&range=7`;

    const response = await axios.get(path);

    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchSummary = async (id: number) => {
  try {
    const path = `/fault-data/summary?id=${id}&range=7`;

    const response = await axios.get(path);

    if (response?.status === 200) {
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

// const getPolygonCenter = (polygon: number[][]) => {
//   const latitudes = polygon.map((point) => point[0]);
//   const longitudes = polygon.map((point) => point[1]);
//   const centerLat = (Math.max(...latitudes) + Math.min(...latitudes)) / 2;
//   const centerLng = (Math.max(...longitudes) + Math.min(...longitudes)) / 2;
//   return [centerLat, centerLng];
// };

watch(searchFault, (newVal) => {
  fetchById(newVal);
});

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
