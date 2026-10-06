<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header (Matching Image 4) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Orders Hub
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          The analysis list here shows all active dental prescriptions and live lab cases
        </p>
      </div>

      <!-- Right: Active Counter Pill (Image 4 style) -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{{ orders.length }} Active Orders</span>
        </div>

        <router-link
          to="/orders/create"
          class="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:opacity-90 transition-opacity active:scale-95"
        >
          <i class="pi pi-plus text-xs" />
          <span>New Order</span>
        </router-link>
      </div>
    </div>

    <!-- UI State Simulation Switcher -->
    <div class="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 text-xs shadow-2xs">
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 hidden sm:inline">Simulation:</span>
        <div class="flex items-center gap-1">
          <button
            v-for="s in ['normal', 'loading', 'empty', 'error'] as const"
            :key="s"
            type="button"
            @click="simulatedState = s; sound.playClick()"
            :class="[
              'px-2.5 py-1 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer',
              simulatedState === s
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            {{ s }}
          </button>
        </div>
      </div>
      <span class="text-[11px] text-slate-400 hidden md:inline">
        Simulate instant PrimeVue Loading, Empty, or Error views in real-time
      </span>
    </div>

    <!-- Toolbar: Search, Filter, Refresh, Quick Stepper (Matching Image 4) -->
    <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <!-- Search Input with PrimeVue IconField -->
      <div class="w-full md:w-80">
        <IconField class="w-full">
          <InputIcon class="pi pi-search text-xs text-slate-400" />
          <InputText
            v-model="searchQuery"
            placeholder="Search orders, patients, doctors..."
            class="w-full text-xs !rounded-2xl"
          />
        </IconField>
      </div>

      <!-- Right Action Tools -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Status Dropdown Filter -->
        <Select
          v-model="statusFilter"
          :options="statusOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All Stages"
          class="text-xs !rounded-2xl w-36"
        />

        <!-- Column Visibility MultiSelect -->
        <MultiSelect
          v-model="selectedColumns"
          :options="allColumns"
          optionLabel="header"
          placeholder="Columns"
          :maxSelectedLabels="2"
          class="text-xs !rounded-2xl w-40"
        />

        <!-- Filter Icon Button -->
        <button
          type="button"
          @click="toggleFilterModal"
          class="p-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Filter Parameters"
        >
          <i class="pi pi-filter text-xs" />
        </button>

        <!-- Refresh Button -->
        <button
          type="button"
          @click="refreshData"
          class="p-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Refresh Table Data"
        >
          <i :class="['pi pi-refresh text-xs', isRefreshing ? 'animate-spin text-emerald-500' : '']" />
        </button>

        <!-- Quick Stepper (Image 4 style: 1 of 15 < >) -->
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900">
          <span>{{ currentPage }} of {{ totalPages || 1 }}</span>
          <button
            type="button"
            :disabled="currentPage <= 1"
            @click="currentPage--"
            class="px-1 text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
          >
            &lt;
          </button>
          <button
            type="button"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
            class="px-1 text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
          >
            &gt;
          </button>
        </div>

      </div>
    </div>

    <!-- State Conditional Rendering: Ultra-High-End PrimeVue Skeleton Loading -->
    <div v-if="simulatedState === 'loading'" class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-4">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div class="flex items-center gap-3">
          <i class="pi pi-spin pi-spinner text-emerald-500 text-lg" />
          <div>
            <h4 class="text-xs font-bold text-slate-900 dark:text-white">Synchronizing PACS Dental Repository...</h4>
            <p class="text-[11px] text-slate-400">Loading 64 clinical records, STL geometries, and milling schedules</p>
          </div>
        </div>
        <Skeleton width="6rem" height="1.8rem" borderRadius="1rem" />
      </div>

      <!-- Shimmering Skeleton Table Rows matching Image 4 -->
      <div class="space-y-3">
        <div v-for="i in 6" :key="i" class="flex items-center justify-between gap-4 p-3 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
          <div class="flex items-center gap-3">
            <Skeleton width="1.2rem" height="1.2rem" borderRadius="0.3rem" />
            <Skeleton shape="circle" size="2.4rem" />
            <div class="space-y-1.5">
              <Skeleton width="9rem" height="0.8rem" borderRadius="0.5rem" />
              <Skeleton width="6rem" height="0.65rem" borderRadius="0.5rem" />
            </div>
          </div>
          <Skeleton width="7rem" height="0.8rem" borderRadius="0.5rem" class="hidden sm:block" />
          <Skeleton width="5rem" height="0.8rem" borderRadius="0.5rem" class="hidden md:block" />
          <Skeleton width="4.5rem" height="1.5rem" borderRadius="1rem" />
          <div class="flex items-center gap-1.5">
            <Skeleton width="1.8rem" height="1.8rem" borderRadius="0.5rem" />
            <Skeleton width="1.8rem" height="1.8rem" borderRadius="0.5rem" />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="simulatedState === 'error'" class="p-12 rounded-3xl bg-white dark:bg-[#090e18] border border-rose-500/30 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
        <i class="pi pi-exclamation-triangle text-xl" />
      </div>
      <h3 class="font-extrabold text-base text-slate-900 dark:text-white">Failed to Query Lab Database</h3>
      <p class="text-xs text-slate-400">Connection to digital milling broker timed out.</p>
      <button
        type="button"
        @click="simulatedState = 'normal'"
        class="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500"
      >
        Retry Connection
      </button>
    </div>

    <div v-else-if="simulatedState === 'empty' || filteredOrders.length === 0" class="p-12 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 text-center space-y-3">
      <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
        <i class="pi pi-inbox text-xl" />
      </div>
      <h3 class="font-extrabold text-base text-slate-900 dark:text-white">No Prescriptions Found</h3>
      <p class="text-xs text-slate-400">Try adjusting your search criteria or clear status filters.</p>
      <button
        type="button"
        @click="searchQuery = ''; statusFilter = 'all'; simulatedState = 'normal'"
        class="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold"
      >
        Reset Filters
      </button>
    </div>

    <!-- MAIN PRIMEVUE DATATABLE (Directly styled from Image 4) -->
    <div v-else class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
      <DataTable
        ref="dt"
        :value="paginatedOrders"
        v-model:selection="selectedOrders"
        dataKey="id"
        class="p-datatable-sm text-xs"
        responsiveLayout="scroll"
        :rowHover="true"
      >
        <!-- Selection Checkbox Column -->
        <Column selectionMode="multiple" headerStyle="width: 3rem" />

        <!-- Column 1: Order # -->
        <Column v-if="isColVisible('orderNumber')" field="orderNumber" header="Order #" sortable>
          <template #body="{ data }">
            <router-link
              :to="`/orders/${data.id}`"
              class="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              #{{ data.orderNumber }}
            </router-link>
          </template>
        </Column>

        <!-- Column 2: Name / Patient with Avatar & Status Dot (Image 4 style) -->
        <Column v-if="isColVisible('patientName')" field="patientName" header="Name" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-2.5">
              <div class="relative shrink-0">
                <Avatar
                  :label="data.patientName[0]"
                  shape="circle"
                  class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs"
                />
                <span
                  :class="[
                    'absolute top-0 right-0 w-2 h-2 rounded-full border border-white dark:border-slate-900',
                    data.status === 'Completed' || data.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
                  ]"
                />
              </div>
              <div>
                <div class="font-extrabold text-slate-900 dark:text-white">{{ data.patientName }}</div>
                <div class="text-[10px] text-slate-400 font-mono">{{ data.id }}</div>
              </div>
            </div>
          </template>
        </Column>

        <!-- Column 3: Title / Restoration -->
        <Column v-if="isColVisible('restoration')" field="restoration" header="Restoration & Arch" sortable>
          <template #body="{ data }">
            <div>
              <span class="font-bold text-slate-800 dark:text-slate-200">{{ data.restoration }}</span>
              <span class="text-[10px] text-slate-400 block">{{ data.arch }} • {{ data.units }}u ({{ data.shade }})</span>
            </div>
          </template>
        </Column>

        <!-- Column 4: Company / Clinic Name (with Icon matching Image 4) -->
        <Column v-if="isColVisible('clinicName')" field="clinicName" header="Company Name" sortable>
          <template #body="{ data }">
            <div class="flex items-center gap-1.5">
              <div class="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-300">
                <i class="pi pi-building text-[10px]" />
              </div>
              <span class="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[130px]">{{ data.clinicName }}</span>
            </div>
          </template>
        </Column>

        <!-- Column 5: Email Address -->
        <Column v-if="isColVisible('email')" field="patientName" header="Email Address" sortable>
          <template #body="{ data }">
            <span class="text-slate-500 font-mono text-[11px] truncate max-w-[140px] block">
              {{ data.patientName.toLowerCase().replace(' ', '.') }}@gmail.com
            </span>
          </template>
        </Column>

        <!-- Column 6: Lead Source / Doctor -->
        <Column v-if="isColVisible('doctorName')" field="doctorName" header="Lead Source / Doctor" sortable>
          <template #body="{ data }">
            <span class="text-slate-700 dark:text-slate-300 font-medium">{{ data.doctorName }}</span>
          </template>
        </Column>

        <!-- Column 7: Status Pills (Active / Inactive / Prospect matching Image 4) -->
        <Column v-if="isColVisible('status')" field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag
              :value="data.status"
              :severity="getStatusSeverity(data.status)"
              rounded
              class="text-[10px] px-2 py-0.5"
            />
          </template>
        </Column>

        <!-- Column 8: Action Icons (Eye, Edit, Mail matching Image 4) -->
        <Column v-if="isColVisible('actions')" header="Actions" headerStyle="text-align: right" bodyStyle="text-align: right">
          <template #body="{ data }">
            <div class="flex items-center justify-end gap-1 text-slate-400">
              <button
                type="button"
                @click="$router.push(`/orders/${data.id}`)"
                class="p-1.5 rounded-lg hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                title="View Case"
              >
                <i class="pi pi-eye text-xs" />
              </button>
              <button
                type="button"
                @click="$router.push(`/orders/${data.id}/edit`)"
                class="p-1.5 rounded-lg hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors"
                title="Edit Order"
              >
                <i class="pi pi-pencil text-xs" />
              </button>
              <button
                type="button"
                @click="sendEmailNotification(data)"
                class="p-1.5 rounded-lg hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                title="Email Prescription"
              >
                <i class="pi pi-envelope text-xs" />
              </button>
            </div>
          </template>
        </Column>
      </DataTable>

      <!-- Bottom Pagination Bar -->
      <div class="p-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span class="text-slate-400">
          Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, filteredOrders.length) }} of {{ filteredOrders.length }} orders
        </span>
        <div class="flex items-center gap-1">
          <button
            type="button"
            :disabled="currentPage <= 1"
            @click="currentPage--"
            class="px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40"
          >
            Previous
          </button>
          <button
            v-for="p in totalPages"
            :key="p"
            type="button"
            @click="currentPage = p"
            :class="[
              'w-7 h-7 rounded-xl text-xs font-bold transition-all',
              currentPage === p
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            ]"
          >
            {{ p }}
          </button>
          <button
            type="button"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
            class="px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import Skeleton from 'primevue/skeleton';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import { useDentalStore } from '@/stores/dental';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const dt = ref();
const searchQuery = ref('');
const statusFilter = ref('all');
const simulatedState = ref<'normal' | 'loading' | 'empty' | 'error'>('normal');
const isRefreshing = ref(false);
const selectedOrders = ref([]);
const currentPage = ref(1);
const pageSize = 8;

const allColumns = [
  { field: 'orderNumber', header: 'Order #' },
  { field: 'patientName', header: 'Name' },
  { field: 'restoration', header: 'Restoration & Arch' },
  { field: 'clinicName', header: 'Company Name' },
  { field: 'email', header: 'Email Address' },
  { field: 'doctorName', header: 'Lead Source / Doctor' },
  { field: 'status', header: 'Status' },
  { field: 'actions', header: 'Actions' },
];

const selectedColumns = ref([...allColumns]);

const isColVisible = (field: string) => {
  return selectedColumns.value.some(c => c.field === field);
};

const statusOptions = [
  { label: 'All Stages', value: 'all' },
  { label: 'Ready', value: 'Ready' },
  { label: 'Completed', value: 'Completed' },
  { label: 'In Production', value: 'In Production' },
  { label: 'Review', value: 'Review' },
  { label: 'New', value: 'New' },
];

const orders = computed(() => store.getOrders());

const filteredOrders = computed(() => {
  return orders.value.filter(o => {
    const q = searchQuery.value.toLowerCase();
    const matchesSearch = !q || 
      o.orderNumber.toLowerCase().includes(q) ||
      o.patientName.toLowerCase().includes(q) ||
      o.doctorName.toLowerCase().includes(q) ||
      o.clinicName.toLowerCase().includes(q) ||
      o.restoration.toLowerCase().includes(q);
    const matchesStatus = statusFilter.value === 'all' || o.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize) || 1);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredOrders.value.slice(start, start + pageSize);
});

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Ready':
      return 'success'; // Green tag
    case 'In Production':
    case 'Design':
      return 'info'; // Blue tag
    case 'Review':
      return 'warn'; // Amber tag
    case 'Cancelled':
      return 'danger'; // Red tag
    default:
      return 'secondary';
  }
};

const refreshData = () => {
  isRefreshing.value = true;
  sound.playPop();
  setTimeout(() => {
    isRefreshing.value = false;
  }, 600);
};

const exportCSV = () => {
  if (dt.value) {
    dt.value.exportCSV();
    sound.playSuccess();
  }
};

const toggleFilterModal = () => {
  sound.playClick();
  alert('PrimeVue Advanced Filter criteria panel');
};

const sendEmailNotification = (order: any) => {
  sound.playClick();
  alert(`Prescription summary sent for #${order.orderNumber} to ${order.patientName}`);
};
</script>
