<template>
  <div class="space-y-6 w-full min-w-0" v-if="currentCase">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="$router.push('/cases')"
          class="p-2 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
        >
          <i class="pi pi-arrow-left text-xs" />
        </button>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">#{{ currentCase.caseNumber }}</span>
            <Tag :value="currentCase.status" severity="info" rounded class="text-[10px]" />
          </div>
          <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {{ currentCase.title }}
          </h1>
        </div>
      </div>

      <router-link
        to="/orders/create"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm"
      >
        <i class="pi pi-plus text-xs" />
        <span>Add Prescription to Case</span>
      </router-link>
    </div>

    <!-- Case Metadata Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Patient Details</span>
        <div class="font-bold text-slate-900 dark:text-white">{{ currentCase.patientName }}</div>
        <div class="text-xs text-slate-500 mt-1">ID: {{ currentCase.patientId || 'PT-1001' }}</div>
      </div>
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Prescribing Doctor</span>
        <div class="font-bold text-slate-900 dark:text-white">{{ currentCase.doctorName }}</div>
        <div class="text-xs text-slate-500 mt-1">{{ currentCase.clinicName }}</div>
      </div>
      <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800">
        <span class="text-xs text-slate-400 block mb-1">Timeline & Priority</span>
        <div class="font-bold text-slate-900 dark:text-white">{{ currentCase.priority }} Priority</div>
        <div class="text-xs text-slate-500 mt-1">Created: {{ formatDate(currentCase.createdAt) }}</div>
      </div>
    </div>

    <!-- Linked Orders DataTable -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-3">
      <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Prescriptions in this Treatment Case</h3>
      <DataTable :value="linkedOrders" responsiveLayout="scroll" class="p-datatable-sm text-xs">
        <Column field="orderNumber" header="Order #">
          <template #body="{ data }">
            <router-link :to="`/orders/${data.id}`" class="font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
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
        <Column field="amount" header="Amount">
          <template #body="{ data }">
            <span class="font-mono font-bold">{{ formatCurrency(data.amount) }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <div v-else class="p-12 text-center text-slate-400">
    Case not found. <router-link to="/cases" class="text-indigo-500 font-bold">Back to cases</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { useDentalStore } from '@/stores/dental';
import { formatDate, formatCurrency } from '@/utils/format';

const route = useRoute();
const store = useDentalStore();

const caseId = route.params.id as string;
const currentCase = computed(() => store.getCases().find(c => c.id === caseId || c.caseNumber === caseId));
const linkedOrders = computed(() => store.getOrders().slice(0, 3));
</script>
