<template>
  <q-layout class="bg-dark" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar dark>
        <q-toolbar-title class="font-Poppins text-center">
          <div class="text-bold">EARTHQUAKE ANALYSIS</div>
          <div class="text-sm">BASED ON FOURIER TRANSFORM</div>
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
      <q-tabs v-model="tab" class="bg-grey-9" align="right" dense>
        <q-route-tab
          class="text-amber font-Poppins"
          to="knownledge"
          name="1"
          exact
          label="Knownledge"
        />
        <q-route-tab
          class="text-amber font-Poppins"
          to="overview"
          name="2"
          exact
          label="Overview"
        />
        <q-route-tab
          class="text-amber font-Poppins"
          to="area"
          name="3"
          exact
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
    title: 'Data',
    icon: 'description',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Setting',
    icon: 'settings',
    link: 'https://facebook.quasar.dev',
  },
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
