<template>
  <div v-if="faultlineDisplay" class="w-full slidebar-color">
    <q-card
      class="q-ma-sm q-pa-sm bg-slate-800 h-screen max-h-[600px] overflow-auto"
    >
      <q-btn
        v-for="item in faultlineDisplay"
        :key="item.id"
        align="left"
        class="row w-full q-my-sm text-blue"
        outline
        :label="item.name"
        :id="item.id"
        @click="fetchContent(item.id)"
      />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { axios } from 'boot/axios';
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits(['selected-id']);

const props = defineProps({
  name: String,
});

export interface Entity {
  id: number;
  name: string;
}

let faultlineDisplay = ref([] as Entity[]);

watch(
  () => props.name,
  () => fetchData()
);

const fetchContent = (id: number) => {
  const data = { faultId: id };
  emit('selected-id', data);
};

const fetchData = async () => {
  try {
    const path = '/fault-group';
    const response = await axios.get(path, {
      params: { faultName: props.name, limit: 20 },
    });
    if (response?.status === 200 && response?.data.pagination) {
      faultlineDisplay.value = response.data.entities;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchData);
</script>
