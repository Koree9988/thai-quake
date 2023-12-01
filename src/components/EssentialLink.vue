<template>
  <q-item clickable tag="a" target="_blank" @click="goToLink(link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { logout } from 'src/boot/firebase';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const goToLink = async (link: string) => {
  if (link == '/') {
    const logoutData = await logout();
    console.log('🚀  logoutData:', logoutData);
  }
  window.location.href = link;
};
</script>
