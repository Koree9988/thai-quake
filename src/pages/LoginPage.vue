<template>
  <q-page>
    <div class="grid lg:grid-cols-10 gap-4">
      <div class="sm:col-span-10 lg:col-span-10">
        <div class="row grid sm:grid-cols-2 q-pt-xl">
          <div
            class="col row text-white font-Poppins q-mx-md q-pt-xl q-px-md col-span-2 -mt-20 lg:mt-20 xl:mt-28 lg:col-span-1"
          >
            <div
              class="text-black text-h5 lg:text-h4 q-pl-md md:q-pt-xl q-mx-md"
            >
              <div
                class="text-5xl md:text-6xl text-bold text-black w-full mt-[50px] font-Poppins q-pb-xl"
              >
                <q-img
                  src="img/ver2.png"
                  width="60px"
                  style="border-radius: 20%"
                />
                Thai Quake
              </div>
              <div class="text-bold text-black text-4xl lg:text-h3 q-mb-lg">
                Welcome
              </div>
              <div class="text-lg md:text-xl lg:text-2xl">
                <p>Experience real-time Thai earthquake insights through</p>
                <p>
                  our web application, leveraging Fourier Transform for data
                  analysis.
                </p>
                <p>Comprehensive, and user friendly interface for all.</p>
              </div>
              <q-btn
                rounded
                class="bg-primary w-60 text-white h-12 mt-5 text-lg"
                label="Visit Site >>"
                @click="dialogStatus = true"
              >
              </q-btn>
            </div>
          </div>
          <div
            class="col row justify-center q-flex q-items-center q-justify-center px-5 lg:mt-20 py-10 lg:pt-5 md:px-40 lg:px-1 col-span-2 lg:col-span-1"
          >
            <q-img
              src="img/globe.png"
              class="mb-10"
              style="max-width: 80%; min-width: 20%"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="dialogStatus">
        <q-card class="bg-stone-100">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6 font-Poppins text-black">
              Sign In for visit site
            </div>
            <q-space />
            <q-btn
              class="text-black"
              icon="close"
              flat
              round
              dense
              v-close-popup
            />
          </q-card-section>

          <q-card-section>
            <SignIn class="mx-sm" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import SignIn from 'components/SignInComponent.vue';
import { ref } from 'vue';

const dialogStatus = ref(false);
// const userName = ref(null);
// const password = ref(null);
</script>
