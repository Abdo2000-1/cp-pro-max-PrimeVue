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

    <!-- DataTable -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
      <DataTable :value="changeRequests" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column field="requestNumber" header="Req #">
          <template #body="{ data }">
            <span class="font-mono font-bold text-amber-500">#{{ data.requestNumber || data.id }}</span>
          </template>
        </Column>

        <Column field="orderNumber" header="Order Ref">
          <template #body="{ data }">
            <router-link :to="`/orders/${data.orderId || data.orderNumber}`" class="font-mono hover:underline">
              #{{ data.orderNumber }}
            </router-link>
          </template>
        </Column>

        <Column field="patientName" header="Patient" />
        <Column field="requestedBy" header="Requested By" />

        <Column field="description" header="Modification Scope">
          <template #body="{ data }">
            <span class="text-slate-700 dark:text-slate-300 line-clamp-1">{{ data.description || 'Shade adjustment from A2 to A1 on buccal margin' }}</span>
          </template>
        </Column>

        <Column field="status" header="Approval Status">
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
                class="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-500 hover:text-white transition-colors"
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
import { computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { useDentalStore } from '@/stores/dental';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const changeRequests = computed(() => store.changeRequests);

const approveRequest = (cr: any) => {
  sound.playSuccess();
  alert(`Approved remake request for order #${cr.orderNumber}`);
};
</script>
