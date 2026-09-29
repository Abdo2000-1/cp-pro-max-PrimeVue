<template>
  <div class="space-y-6 w-full min-w-0" v-if="patient">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="$router.push('/patients')"
          class="p-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <i class="pi pi-arrow-left text-xs" />
        </button>
        <div class="flex items-center gap-3">
          <Avatar :label="patient.name[0]" shape="circle" size="large" class="bg-emerald-500/10 text-emerald-600 font-bold" />
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{{ patient.name }}</h1>
              <Tag :value="patient.status" severity="success" rounded class="text-[10px]" />
            </div>
            <p class="text-xs text-slate-400">DOB: {{ formatDate(patient.dob) }} • Gender: {{ patient.gender }} • ID: {{ patient.id }}</p>
          </div>
        </div>
      </div>

      <router-link
        to="/orders/create"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm"
      >
        <i class="pi pi-plus text-xs" />
        <span>New Rx for Patient</span>
      </router-link>
    </div>

    <!-- Contact & Clinic Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Phone Number</span>
        <div class="font-bold text-slate-900 dark:text-white font-mono">{{ patient.phone }}</div>
      </div>
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Email Address</span>
        <div class="font-bold text-slate-900 dark:text-white font-mono">{{ patient.email }}</div>
      </div>
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Registered Clinic</span>
        <div class="font-bold text-slate-900 dark:text-white">{{ patient.clinicName }}</div>
      </div>
    </div>

    <!-- Linked Orders -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-3">
      <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Patient Dental Prescriptions</h3>
      <DataTable :value="patientOrders" responsiveLayout="scroll" class="p-datatable-sm text-xs">
        <Column field="orderNumber" header="Order #">
          <template #body="{ data }">
            <router-link :to="`/orders/${data.id}`" class="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              #{{ data.orderNumber }}
            </router-link>
          </template>
        </Column>
        <Column field="restoration" header="Restoration" />
        <Column field="arch" header="Arch" />
        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status" severity="success" rounded class="text-[10px]" />
          </template>
        </Column>
        <Column field="dueDate" header="Due Date">
          <template #body="{ data }">
            <span class="font-mono">{{ formatDate(data.dueDate) }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div v-else class="p-12 text-center text-slate-400">
    Patient profile not found.
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import { useDentalStore } from '@/stores/dental';
import { formatDate } from '@/utils/format';

const route = useRoute();
const store = useDentalStore();
const patientId = route.params.id as string;

const patient = computed(() => store.getPatients().find(p => p.id === patientId));
const patientOrders = computed(() => store.getOrders().slice(0, 4));
</script>
