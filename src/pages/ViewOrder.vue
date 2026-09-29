<template>
  <div class="space-y-6 w-full min-w-0 max-w-5xl mx-auto">
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <router-link
          to="/orders"
          class="w-9 h-9 rounded-2xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition shadow-sm"
        >
          <i class="pi pi-arrow-left text-xs" />
        </router-link>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {{ currentOrder?.orderNumber || 'ORD-2024-001' }}
            </h1>
            <Tag
              :value="currentOrder?.status || 'Production'"
              :severity="getStatusSeverity(currentOrder?.status || 'Production')"
              class="!text-xs !font-bold !px-2.5 !py-0.5 !rounded-xl"
            />
            <Tag
              v-if="currentOrder?.priority === 'Urgent' || currentOrder?.priority === 'High'"
              :value="currentOrder?.priority"
              severity="danger"
              class="!text-xs !font-bold !px-2 !py-0.5 !rounded-xl"
            />
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Prescribed for {{ currentOrder?.patientName || 'Eleanor Vance' }} by {{ currentOrder?.doctorName || 'Dr. Sarah Mitchell' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <router-link
          :to="`/orders/${currentOrder?.id || 'ord-1'}/edit`"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition"
        >
          <i class="pi pi-file-edit text-xs" />
          <span>Edit Specs</span>
        </router-link>

        <button
          type="button"
          @click="printSlip"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 transition cursor-pointer"
        >
          <i class="pi pi-print text-xs" />
          <span>Lab Slip</span>
        </button>
      </div>
    </div>

    <!-- Production Pipeline Stepper -->
    <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Manufacturing Pipeline</h3>
        <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Step 4 of 6 • In Sintering</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-6 gap-2">
        <div
          v-for="(step, idx) in pipelineSteps"
          :key="step.title"
          :class="[
            'p-3 rounded-2xl border text-center transition-all',
            idx < 3
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : idx === 3
              ? 'bg-black text-white dark:bg-white dark:text-black border-transparent shadow-sm'
              : 'bg-slate-50 dark:bg-[#0c1220] border-slate-200 dark:border-slate-800 text-slate-400'
          ]"
        >
          <i :class="[step.icon, 'text-base mb-1 block']" />
          <div class="text-[11px] font-bold">{{ step.title }}</div>
          <div class="text-[9px] opacity-75 mt-0.5">{{ step.sub }}</div>
        </div>
      </div>
    </div>

    <!-- Main 2-Column Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Clinical Details (2 cols) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Specs Grid -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Prosthetic Specifications</h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
              <span class="text-slate-400 block text-[11px]">Restoration Type</span>
              <span class="font-bold text-slate-900 dark:text-white text-sm">{{ currentOrder?.restoration || 'Crown' }}</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
              <span class="text-slate-400 block text-[11px]">VITA Shade</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{{ currentOrder?.shade || 'A2' }}</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
              <span class="text-slate-400 block text-[11px]">Units / Arch</span>
              <span class="font-bold text-slate-900 dark:text-white text-sm">{{ currentOrder?.units || 1 }} Unit • {{ currentOrder?.arch || 'Maxilla' }}</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
              <span class="text-slate-400 block text-[11px]">Target Delivery Date</span>
              <span class="font-bold text-slate-900 dark:text-white text-sm">{{ currentOrder?.dueDate || '2026-10-04' }}</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
              <span class="text-slate-400 block text-[11px]">CAD Scan Format</span>
              <span class="font-bold text-slate-900 dark:text-white text-sm">{{ currentOrder?.format || 'STL' }}</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
              <span class="text-slate-400 block text-[11px]">Lead Technician</span>
              <span class="font-bold text-slate-900 dark:text-white text-sm">{{ currentOrder?.technicianName || 'Evan Vance, RDT' }}</span>
            </div>
          </div>

          <!-- Notes -->
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/50 dark:border-slate-800/50">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Doctor's Clinical Notes</span>
            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {{ currentOrder?.notes || 'Match distal contact tightly with tooth #13. Incisal edge contour should reflect patient natural enamel striations.' }}
            </p>
          </div>
        </div>

        <!-- 3D Model Visualizer Placeholder -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">3D CAD Telemetry Preview</h3>
              <p class="text-xs text-slate-400">STL mesh analysis: 42,800 polygons • 0.02mm margin fit</p>
            </div>
            <button
              type="button"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              Open 3D Viewer
            </button>
          </div>

          <div class="h-64 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden group">
            <div class="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent opacity-50"></div>
            <i class="pi pi-box text-5xl text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div class="text-xs font-bold relative z-10">Prep Arch Alignment: Optimal</div>
            <p class="text-[11px] text-slate-400 relative z-10 mt-0.5">Occlusal clearance: 1.8mm • Mesial margin: Chamfer 0.5mm</p>
          </div>
        </div>
      </div>

      <!-- Right Summary Column (1 col) -->
      <div class="space-y-6">
        <!-- Clinic & Prescriber Profile -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Practitioner</h3>

          <div class="flex items-center gap-3">
            <Avatar
              :label="(currentOrder?.doctorName || 'Dr. Mitchell').slice(0, 2).toUpperCase()"
              shape="circle"
              class="!w-10 !h-10 !bg-emerald-500/10 !text-emerald-600 dark:!text-emerald-400 !font-bold"
            />
            <div>
              <div class="text-xs font-bold text-slate-900 dark:text-white">{{ currentOrder?.doctorName || 'Dr. Sarah Mitchell' }}</div>
              <div class="text-[11px] text-slate-400">{{ currentOrder?.clinicName || 'Apex Dental Care' }}</div>
            </div>
          </div>

          <div class="space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <div class="flex justify-between">
              <span class="text-slate-400">Intake Center</span>
              <span class="font-bold text-slate-700 dark:text-slate-300">{{ currentOrder?.scanCenterName || 'Midtown Intraoral Hub' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Billed Entity</span>
              <span class="font-bold text-slate-700 dark:text-slate-300">{{ currentOrder?.billTo || 'Apex Dental Care Corp' }}</span>
            </div>
          </div>
        </div>

        <!-- Billing Summary -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Invoicing</h3>
            <Tag
              :value="currentOrder?.billed ? 'Settled' : 'Pending'"
              :severity="currentOrder?.billed ? 'success' : 'warning'"
              class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg"
            />
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-slate-400">Prosthetic Unit Fee</span>
              <span class="font-bold text-slate-900 dark:text-white">${{ (currentOrder?.amount || 185).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Digital Model Arch Fee</span>
              <span class="font-bold text-slate-900 dark:text-white">$35.00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Rush Logistics</span>
              <span class="font-bold text-slate-900 dark:text-white">$0.00</span>
            </div>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
              <span class="font-bold text-slate-900 dark:text-white">Total Charge</span>
              <span class="text-lg font-black text-slate-900 dark:text-white">${{ ((currentOrder?.amount || 185) + 35).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import { useToast } from 'primevue/usetoast';
import { useDentalStore } from '@/stores/dental';
import { getStatusSeverity } from '@/utils/status-styles';

const route = useRoute();
const toast = useToast();
const store = useDentalStore();

const currentOrder = computed(() => {
  const id = route.params.id as string;
  return store.orders.find(o => o.id === id || o.orderNumber === id) || store.orders[0];
});

const pipelineSteps = [
  { title: 'Intake Scan', sub: 'Completed', icon: 'pi pi-check' },
  { title: 'CAD Margin', sub: 'Completed', icon: 'pi pi-check' },
  { title: 'Milling', sub: 'Completed', icon: 'pi pi-check' },
  { title: 'Sintering', sub: 'Active (1500°C)', icon: 'pi pi-spin pi-spinner' },
  { title: 'Glaze & Polish', sub: 'Queued', icon: 'pi pi-sparkles' },
  { title: 'Courier Dispatched', sub: 'Pending', icon: 'pi pi-send' },
];

const printSlip = () => {
  toast.add({
    severity: 'info',
    summary: 'Printing Lab Slip',
    detail: `Sending slip for ${currentOrder.value?.orderNumber} to lab thermal printer`,
    life: 3000
  });
};
</script>
