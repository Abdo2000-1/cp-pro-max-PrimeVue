<template>
  <div class="space-y-6 w-full min-w-0">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Change Requests & Remakes
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Doctor modification inquiries, shade adjustments, and CAD remake authorisations
        </p>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="w-full sm:w-80">
        <IconField class="w-full">
          <InputIcon class="pi pi-search text-xs text-slate-400" />
          <InputText v-model="searchQuery" placeholder="Search requests, orders, doctors..." class="w-full text-xs !rounded-2xl" />
        </IconField>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-auto">
        <Select
          v-model="statusFilter"
          :options="['All', 'Pending', 'Approved', 'Rejected']"
          placeholder="Status"
          class="text-xs !rounded-2xl w-32"
        />

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

    <!-- DataTable -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
      <DataTable :value="filteredRequests" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column v-if="isColVisible('requestNumber')" field="requestNumber" header="Req #" sortable>
          <template #body="{ data }">
            <span class="font-mono font-bold text-amber-500">#{{ data.requestNumber || data.id }}</span>
          </template>
        </Column>

        <Column v-if="isColVisible('orderNumber')" field="orderNumber" header="Order Ref" sortable>
          <template #body="{ data }">
            <router-link :to="`/orders/${data.orderId || data.orderNumber}`" class="font-mono hover:underline">
              #{{ data.orderNumber }}
            </router-link>
          </template>
        </Column>

        <Column v-if="isColVisible('patientName')" field="patientName" header="Patient" sortable />
        <Column v-if="isColVisible('requestedBy')" field="requestedBy" header="Requested By" sortable />

        <Column v-if="isColVisible('description')" field="description" header="Modification Scope" sortable>
          <template #body="{ data }">
            <span class="text-slate-700 dark:text-slate-300 line-clamp-1">{{ data.description || 'Shade adjustment from A2 to A1 on buccal margin' }}</span>
          </template>
        </Column>

        <Column v-if="isColVisible('status')" field="status" header="Approval Status" sortable>
          <template #body="{ data }">
            <Tag :value="data.status" :severity="data.status === 'Approved' ? 'success' : 'warn'" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column header="Decide" bodyStyle="text-align: right">
          <template #body="{ data }">
            <div class="flex items-center justify-end gap-1.5">
              <button
                type="button"
                @click="approveRequest(data)"
                class="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-colors"
              >
                Approve
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
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import { useDentalStore } from '@/stores/dental';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const searchQuery = ref('');
const statusFilter = ref('All');

const allColumns = [
  { field: 'requestNumber', header: 'Req #' },
  { field: 'orderNumber', header: 'Order Ref' },
  { field: 'patientName', header: 'Patient' },
  { field: 'requestedBy', header: 'Requested By' },
  { field: 'description', header: 'Modification Scope' },
  { field: 'status', header: 'Approval Status' }
];
const selectedColumns = ref([...allColumns]);
const isColVisible = (field: string) => selectedColumns.value.some(c => c.field === field);

const changeRequests = computed(() => store.changeRequests);

const filteredRequests = computed(() => {
  return changeRequests.value.filter((cr: any) => {
    const q = searchQuery.value.toLowerCase();
    const matchQ = !q ||
      String(cr.requestNumber || cr.id || '').toLowerCase().includes(q) ||
      String(cr.orderNumber || '').toLowerCase().includes(q) ||
      String(cr.patientName || '').toLowerCase().includes(q) ||
      String(cr.requestedBy || '').toLowerCase().includes(q) ||
      String(cr.description || '').toLowerCase().includes(q);
    const matchS = statusFilter.value === 'All' || cr.status === statusFilter.value;
    return matchQ && matchS;
  });
});

const approveRequest = (cr: any) => {
  sound.playSuccess();
  alert(`Approved remake request for order #${cr.orderNumber}`);
};
</script>
