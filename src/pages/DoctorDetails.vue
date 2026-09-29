<template>
  <div class="space-y-6 w-full min-w-0" v-if="doctor">
    <div class="flex items-center gap-3">
      <button
        type="button"
        @click="$router.push('/doctors')"
        class="p-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500"
      >
        <i class="pi pi-arrow-left text-xs" />
      </button>
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{{ doctor.name }}</h1>
        <p class="text-xs text-slate-400">{{ doctor.specialty }} • {{ doctor.clinicName }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Clinic Center</span>
        <div class="font-bold text-slate-900 dark:text-white">{{ doctor.clinicName }}</div>
      </div>
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Direct Contact</span>
        <div class="font-bold text-slate-900 dark:text-white font-mono">{{ doctor.phone }}</div>
      </div>
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">License & Account</span>
        <div class="font-bold text-slate-900 dark:text-white font-mono">{{ doctor.id }}</div>
      </div>
    </div>
  </div>
  <div v-else class="p-12 text-center text-slate-400">Doctor not found.</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDentalStore } from '@/stores/dental';

const route = useRoute();
const store = useDentalStore();
const docId = route.params.id as string;
const doctor = computed(() => store.getDoctors().find(d => d.id === docId));
</script>
