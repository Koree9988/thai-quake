<template>
  <q-layout view="lHh Lpr lFf " class="bg-slate-100">
    <q-header elevated>
      <q-toolbar class="pl-10">
        <q-img src="img/logo-white.png" width="55px" class="" />
        <q-toolbar-title class="font-Poppins text-left my-3">
          <div class="text-bold text-xl md:text-3xl">EARTHQUAKE ANALYSIS</div>
          <div class="text-sm md:text-xl">BASED ON FOURIER TRANSFORM</div>
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <q-tabs
        v-model="tab"
        align="right"
        indicator-color="transparent"
        active-bg-color="primary"
        active-color="white"
        class="bg-slate-100 pt-1 pb-2 px-10"
      >
        <q-route-tab
          class="text-primary font-Poppins rounded-3xl"
          to="knownledge"
          name="1"
          label="Knownledge"
        />
        <q-route-tab
          class="text-primary font-Poppins rounded-3xl pa-md mx-2"
          to="overview"
          name="2"
          label="Overview"
        />
        <q-route-tab
          class="text-primary font-Poppins rounded-3xl"
          to="area"
          name="3"
          label="By area"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="drawerMenu"
      bordered
      show-if-above
      dark
      persistent
      side="right"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
    >
      <q-list>
        <q-item-label header> Quick Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Thai Quake API',
    icon: 'description',
    link: 'https://thai-quake-api-7msd4xrndq-as.a.run.app/api/swagger',
  },
  {
    title: 'Github',
    icon: 'code',
    link: 'https://github.com/Koree9988/thai-quake',
  },
  // {
  //   title: 'Setting',
  //   icon: 'settings',
  //   link: 'https://facebook.quasar.dev',
  // },
  {
    title: 'Sign out',
    icon: 'logout',
    link: '/',
  },
];

const drawerMenu = ref(false);
const tab = ref('1');
const miniState = ref(true);

function toggleLeftDrawer() {
  drawerMenu.value = !drawerMenu.value;
}
</script>
