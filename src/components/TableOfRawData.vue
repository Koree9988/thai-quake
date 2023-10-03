<template>
  <div class="q-px-xs bg-dark q-mb-lg">
    <q-table
      :key="chartKey"
      dark
      title="Live Earthquake Data"
      title-class="text-h5 text-amber"
      :rows="liveData"
      :columns="columns"
      row-key="name"
      flat
      bordered
      class="h-screen max-h-[600px] my-sticky-header-table slidebar-color"
      color="amber"
      :rows-per-page-options="[10, 20, 30, 50, 100]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { QTableProps } from 'quasar';

// const tableKey = ref(0);

const { liveData } = defineProps({
  liveData: Array,
});

const columns: QTableProps['columns'] = [
  {
    name: 'dateUtc',
    required: true,
    label: 'Date and Time',
    align: 'left',
    field: 'dateUtc',
    format: (val: Date) => {
      // return reformatDate(val);
      // const strDate = moment(reformatDate(val)).format('DD/MM/YYYY HH:mm:ss');
      // if (strDate) return strDate;
      // return 2;
      // return reformatDate(val);
      console.log(val);

      return String(val).replace('T', ' ').replace('.000Z', '');
      // return moment(new Date(reformatDate(val))).format('DD/MM/YYYY HH:mm:ss');
    },
    sortable: true,
    sort: (a: string, b: string) => {
      return Date.parse(a) - Date.parse(b);
    },
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Magnitude',
    required: true,
    align: 'center',
    label: 'Mag',
    field: 'magnitude',
    sortable: true,
    sort: (a: number, b: number) => a - b,
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Latitude',
    required: true,
    label: 'Lat',
    align: 'center',
    field: 'lat',
    sortable: true,
    sort: (a: number, b: number) => a - b,
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Longitude',
    required: true,
    label: 'Long',
    field: 'long',
    sortable: true,
    sort: (a: number, b: number) => a - b,
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Center-En',
    label: 'Center',
    field: 'centerEn',
    align: 'center',
    format: (val: string) => {
      if (!val) return 'N/A';
      const center = val.split(',');
      const temp = center.slice(-2);
      if (temp.length === 1) return temp[0];
      return `${temp[0].replace('Amphoe ', '')},${temp[1]}`;
    },
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
];

const chartKey = ref(0); // Reactive property to force re-render

onMounted(async () => {
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
