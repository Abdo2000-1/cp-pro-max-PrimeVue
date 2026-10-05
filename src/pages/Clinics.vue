<template>
  <div class="space-y-6 w-full min-w-0">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Partner Clinics & Studios
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Dental practices and hospital networks submitting recurring restorative cases
        </p>
      </div>
    </div>

    <!-- Clinics Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="clinic in clinics"
        :key="clinic.id"
        class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
      >
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <i class="pi pi-building text-base" />
            </div>
            <Tag :value="clinic.status || 'Active'" severity="success" rounded class="text-[10px]" />
          </div>

          <h3 class="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
            {{ clinic.name }}
          </h3>
          <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <i class="pi pi-map-marker text-[10px]" />
            <span>{{ clinic.address || 'Houston, TX' }}</span>
          </p>

          <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
            <div>Lead: <strong>{{ clinic.accountManager || 'Office Manager' }}</strong></div>
            <div class="font-mono text-[11px]">{{ clinic.phone }}</div>
          </div>
        </div>

        <router-link
          :to="`/clinics/${clinic.id}`"
          class="w-full mt-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-center text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors block"
        >
          View Practice Profile
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Tag from 'primevue/tag';
import { useDentalStore } from '@/stores/dental';

const store = useDentalStore();
const clinics = computed(() => store.getClinics());
</script>
