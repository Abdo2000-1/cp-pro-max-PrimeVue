<template>
  <div class="space-y-6 w-full min-w-0 max-w-4xl mx-auto">
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <router-link
          :to="`/orders/${orderId}`"
          class="w-9 h-9 rounded-2xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
        >
          <i class="pi pi-arrow-left text-xs" />
        </router-link>
        <div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Edit Order {{ form.orderNumber }}
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Modify laboratory specifications, production stage, and technical instructions
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <router-link
          :to="`/orders/${orderId}`"
          class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition"
        >
          Cancel
        </router-link>
        <button
          type="button"
          @click="saveChanges"
          class="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <i class="pi pi-save text-xs" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>

    <!-- Edit Form Card -->
    <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
      <!-- Section 1: Workflow Stage & Priority -->
      <div>
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Workflow Lifecycle</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Production Status *</label>
            <Select
              v-model="form.status"
              :options="['New', 'Review', 'Design', 'Production', 'Quality Check', 'Ready', 'Completed', 'Cancelled']"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Order Priority</label>
            <Select
              v-model="form.priority"
              :options="['Low', 'Normal', 'High', 'Urgent']"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>
        </div>
      </div>

      <!-- Section 2: Clinical Details -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Patient & Restoration</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Patient Name</label>
            <InputText
              v-model="form.patientName"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Prescribing Doctor</label>
            <InputText
              v-model="form.doctorName"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Restoration Type</label>
            <Select
              v-model="form.restoration"
              :options="['Crown', 'Bridge', 'Veneer', 'Implant Crown', 'Full Arch', 'Night Guard', 'Inlay', 'Onlay']"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Arch</label>
            <Select
              v-model="form.arch"
              :options="['Maxilla', 'Mandible', 'Both']"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">VITA Shade</label>
            <Select
              v-model="form.shade"
              :options="['A1', 'A2', 'A3', 'A3.5', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D2', 'BL1', 'BL2']"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Due Date</label>
            <InputText
              v-model="form.dueDate"
              type="date"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>
        </div>
      </div>

      <!-- Section 3: Notes -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Clinical Instructions & Notes</label>
        <textarea
          v-model="form.notes"
          rows="4"
          class="w-full rounded-2xl p-3 text-xs bg-slate-50 dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import { useDentalStore } from '@/stores/dental';
import type { OrderStatus, Priority } from '@/types';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const store = useDentalStore();

const orderId = route.params.id as string;

const form = ref({
  orderNumber: 'ORD-2024-001',
  patientName: '',
  doctorName: '',
  status: 'Production' as OrderStatus,
  priority: 'Normal' as Priority,
  restoration: 'Crown',
  arch: 'Maxilla',
  shade: 'A2',
  dueDate: '',
  notes: '',
});

onMounted(() => {
  const existing = store.orders.find(o => o.id === orderId || o.orderNumber === orderId);
  if (existing) {
    form.value = {
      orderNumber: existing.orderNumber,
      patientName: existing.patientName,
      doctorName: existing.doctorName,
      status: existing.status,
      priority: existing.priority,
      restoration: existing.restoration,
      arch: existing.arch,
      shade: existing.shade,
      dueDate: existing.dueDate || '',
      notes: existing.notes || '',
    };
  }
});

const saveChanges = () => {
  store.updateOrderStatus(orderId, form.value.status);
  
  toast.add({
    severity: 'success',
    summary: 'Order Updated',
    detail: `Changes saved for ${form.value.orderNumber}`,
    life: 3000
  });

  setTimeout(() => {
    router.push(`/orders/${orderId}`);
  }, 500);
};
</script>
