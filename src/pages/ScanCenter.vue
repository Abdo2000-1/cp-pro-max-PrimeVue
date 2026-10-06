<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Intake Scan Center
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Intraoral scanner gateways, optical impressions intake, and 3D STL telemetry
        </p>
      </div>

      <button
        type="button"
        @click="simulateScanIntake"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all self-start sm:self-auto"
      >
        <i class="pi pi-sync text-xs" />
        <span>Sync Scanner Feeds</span>
      </button>
    </div>

    <!-- Scanner Hardware Status Gateways -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="hw in scanners"
        :key="hw.name"
        class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between"
      >
        <div>
          <span class="text-xs text-slate-400 font-medium">{{ hw.brand }}</span>
          <h4 class="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{{ hw.name }}</h4>
          <span class="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{{ hw.status }} • {{ hw.fps }}</span>
          </span>
        </div>
        <div class="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <i class="pi pi-camera text-base" />
        </div>
      </div>
    </div>

    <!-- Live Scans Intake Table -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden p-5 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Recent Intake Digital Impressions</h3>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <div class="w-full sm:w-72">
            <IconField class="w-full">
              <InputIcon class="pi pi-search text-xs text-slate-400" />
              <InputText v-model="searchQuery" placeholder="Filter intake scans..." class="w-full text-xs !rounded-2xl" />
            </IconField>
          </div>

          <MultiSelect
            v-model="selectedColumns"
            :options="allColumns"
            optionLabel="header"
            placeholder="Columns"
            :maxSelectedLabels="2"
            class="text-xs !rounded-2xl w-36"
          />
        </div>
      </div>

      <DataTable :value="filteredOrders" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column v-if="isColVisible('orderNumber')" field="orderNumber" header="Order #" sortable>
          <template #body="{ data }">
            <router-link :to="`/orders/${data.id}`" class="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              #{{ data.orderNumber }}
            </router-link>
          </template>
        </Column>

        <Column v-if="isColVisible('patientName')" field="patientName" header="Patient" sortable>
          <template #body="{ data }">
            <span class="font-bold text-slate-900 dark:text-white">{{ data.patientName }}</span>
          </template>
        </Column>

        <Column v-if="isColVisible('doctorName')" field="doctorName" header="Doctor / Clinic" sortable>
          <template #body="{ data }">
            <div class="font-medium text-slate-800 dark:text-slate-200">{{ data.doctorName }}</div>
            <div class="text-[10px] text-slate-400">{{ data.clinicName }}</div>
          </template>
        </Column>

        <Column v-if="isColVisible('restoration')" field="restoration" header="Restoration Arch" sortable />

        <Column v-if="isColVisible('format')" header="Scan Format">
          <template #body>
            <Tag value="STL / PLY High-Res" severity="success" rounded class="text-[10px] font-mono" />
          </template>
        </Column>

        <Column v-if="isColVisible('status')" field="status" header="Pipeline Status" sortable>
          <template #body="{ data }">
            <Tag :value="data.status" severity="info" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column header="Actions" bodyStyle="text-align: right">
          <template #body="{ data }">
            <div class="flex items-center justify-end gap-2">
              <button
                type="button"
                @click="openScanViewer(data)"
                class="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-colors"
              >
                Inspect 3D
              </button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import { useDentalStore } from '@/stores/dental';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const searchQuery = ref('');

const allColumns = [
  { field: 'orderNumber', header: 'Order #' },
  { field: 'patientName', header: 'Patient' },
  { field: 'doctorName', header: 'Doctor / Clinic' },
  { field: 'restoration', header: 'Restoration Arch' },
  { field: 'format', header: 'Scan Format' },
  { field: 'status', header: 'Pipeline Status' }
];
const selectedColumns = ref([...allColumns]);
const isColVisible = (field: string) => selectedColumns.value.some(c => c.field === field);

const scanners = [
  { brand: 'Align Technology', name: 'iTero Element 5D Plus', status: 'Online Sync', fps: '60 FPS NIRI' },
  { brand: '3Shape Dental', name: 'TRIOS 5 Wireless', status: 'Active Stream', fps: 'Color HD' },
  { brand: 'Medit System', name: 'Medit i700 Intraoral', status: 'Connected', fps: 'UV-C Hygiene' },
  { brand: 'Dentsply Sirona', name: 'Primescan AC Connect', status: 'Ready', fps: 'High Precision' },
];

const orders = computed(() => store.getOrders());

const filteredOrders = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return orders.value.filter(o => !q || o.orderNumber.toLowerCase().includes(q) || o.patientName.toLowerCase().includes(q) || o.doctorName.toLowerCase().includes(q));
});

const simulateScanIntake = () => {
  sound.playSuccess();
  alert('Simulating real-time intake of 3 intraoral scans from cloud PACS gateway.');
};

const openScanViewer = (order: any) => {
  sound.playClick();
  alert(`Opening 3D WebGL Mesh inspection for Order #${order.orderNumber} (${order.patientName})`);
};
</script>
