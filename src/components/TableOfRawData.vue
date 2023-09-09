<template>
  <div class="q-px-xs bg-dark q-mb-lg">
    <q-table
      :key="chartKey"
      dark
      title="Life Earthquake Data"
      title-class="text-h5 text-amber"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      class="h-screen max-h-[600px] my-sticky-header-table slidebar-color"
      color="amber"
      :pagination="initialPagination"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import datas from './tempData.json';
import { QTableProps } from 'quasar';
import moment from 'moment';

// const tableKey = ref(0);

const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10,
});
const rows = ref(datas);

const columns: QTableProps['columns'] = [
  {
    name: 'Date',
    required: true,
    label: 'Date and Time',
    align: 'left',
    field: 'Date',
    format: (val: string) => {
      // return reformatDate(val);
      // const strDate = moment(reformatDate(val)).format('DD/MM/YYYY HH:mm:ss');
      // if (strDate) return strDate;
      // return 2;
      return reformatDate(val);
      // return moment(new Date(reformatDate(val))).format('DD/MM/YYYY HH:mm:ss');
    },
    sortable: true,
    sort: (a: string, b: string) => {
      return Date.parse(reformatDate(a)) - Date.parse(reformatDate(b));
    },
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Magnitute',
    required: true,
    align: 'center',
    label: 'Mag',
    field: 'Magnitute',
    sortable: true,
    sort: (a: number, b: number) => a - b,
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Latitute',
    required: true,
    label: 'Lat',
    align: 'center',
    field: 'Latitute',
    sortable: true,
    sort: (a: number, b: number) => a - b,
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Longitute',
    required: true,
    label: 'Long',
    field: 'Longitute',
    sortable: true,
    sort: (a: number, b: number) => a - b,
    headerClasses: 'text-amber bg-blue-grey-9 text-center',
  },
  {
    name: 'Center-En',
    label: 'Center',
    field: 'Center-En',
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

const reformatDate = (date: string) => {
  const [datePart, time] = date.split(' ');
  const [hours, minutes] = time.split(':');
  const [day, month, year] = datePart.split('/');
  const dateFormat = new Date(
    Number(year),
    Number(month),
    Number(day),
    Number(hours),
    Number(minutes)
  );
  // const splitTime = String(dateFormat).split(' ')[4];

  return moment(dateFormat).format('DD/MM/YYYY HH:mm:ss').toString();

  // return `${year}-${month}-${day} ${splitTime}`;
};

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
