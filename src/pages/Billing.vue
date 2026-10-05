<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Billing & Invoices
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Accounts receivable, batch clinic statements, and payment settlement tracking
        </p>
      </div>

      <button
        type="button"
        @click="generateStatement"
        class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
      >
        <i class="pi pi-receipt text-xs" />
        <span>Generate Statement</span>
      </button>
    </div>

    <!-- KPI Summary Pills -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 font-semibold">Total Receivables</span>
          <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{{ formatCurrency(totalReceivables) }}</div>
        </div>
        <div class="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
          <i class="pi pi-dollar text-base" />
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 font-semibold">Paid This Cycle</span>
          <div class="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{{ formatCurrency(paidAmount) }}</div>
        </div>
        <div class="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
          <i class="pi pi-check-circle text-base" />
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400 font-semibold">Pending Settlement</span>
          <div class="text-2xl font-extrabold text-amber-500 mt-1">{{ formatCurrency(pendingAmount) }}</div>
        </div>
        <div class="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
          <i class="pi pi-clock text-base" />
        </div>
      </div>
    </div>

    <!-- PrimeVue Invoices DataTable -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden p-5 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Invoices Ledger</h3>
        <div class="w-full sm:w-72">
          <IconField class="w-full">
            <InputIcon class="pi pi-search text-xs text-slate-400" />
            <InputText v-model="searchQuery" placeholder="Search invoices..." class="w-full text-xs !rounded-2xl" />
          </IconField>
        </div>
      </div>

      <DataTable :value="filteredBilling" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column field="invoiceNumber" header="Invoice #">
          <template #body="{ data }">
            <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {{ data.invoiceNumber || `INV-${data.orderNumber}` }}
            </span>
          </template>
        </Column>

        <Column field="orderNumber" header="Order Ref">
          <template #body="{ data }">
            <router-link :to="`/orders/${data.orderId || data.id}`" class="font-mono hover:underline">
              #{{ data.orderNumber }}
            </router-link>
          </template>
        </Column>

        <Column field="clinicName" header="Clinic & Doctor">
          <template #body="{ data }">
            <div class="font-bold text-slate-900 dark:text-white">{{ data.clinicName }}</div>
            <div class="text-[10px] text-slate-400">{{ data.doctorName }}</div>
          </template>
        </Column>

        <Column field="amount" header="Amount" sortable>
          <template #body="{ data }">
            <span class="font-mono font-extrabold text-slate-900 dark:text-white">{{ formatCurrency(data.amount) }}</span>
          </template>
        </Column>

        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="data.status === 'Paid' ? 'success' : 'warn'" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column field="dueDate" header="Due Date">
          <template #body="{ data }">
            <span class="font-mono text-slate-400">{{ formatDate(data.dueDate) }}</span>
          </template>
        </Column>

        <Column header="Actions" bodyStyle="text-align: right">
          <template #body="{ data }">
            <div class="flex items-center justify-end gap-1">
              <button
                type="button"
                @click="downloadInvoice(data.orderNumber)"
                class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                title="Download PDF"
              >
                <i class="pi pi-download text-xs" />
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
import { useDentalStore } from '@/stores/dental';
import { formatCurrency, formatDate } from '@/utils/format';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const searchQuery = ref('');

const billing = computed(() => store.getBilling());

const totalReceivables = computed(() => billing.value.reduce((acc, b) => acc + (b.amount || 0), 0));
const paidAmount = computed(() => billing.value.filter(b => b.status === 'Paid').reduce((acc, b) => acc + (b.amount || 0), 0));
const pendingAmount = computed(() => totalReceivables.value - paidAmount.value);

const filteredBilling = computed(() => {
  const q = searchQuery.value.toLowerCase();
  return billing.value.filter(b => !q || (b.invoiceNumber || '').toLowerCase().includes(q) || b.orderNumber.toLowerCase().includes(q) || (b.clinicName || '').toLowerCase().includes(q));
});

const generateStatement = () => {
  sound.playSuccess();
  alert('Generated consolidated monthly PDF statement for all partner clinics.');
};

const downloadInvoice = (orderNumber: string) => {
  sound.playClick();
  alert(`Downloading official tax invoice PDF for order #${orderNumber}`);
};
</script>
