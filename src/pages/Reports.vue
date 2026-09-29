<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Executive Analytics & Reports
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time prosthetic throughput, material profitability, and clinician fulfillment metrics
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <!-- Timeframe selector -->
        <div class="flex items-center p-1 rounded-2xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 text-xs shadow-sm">
          <button
            v-for="tf in timeframes"
            :key="tf.value"
            @click="currentTimeframe = tf.value"
            :class="[
              'px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer',
              currentTimeframe === tf.value
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            ]"
          >
            {{ tf.label }}
          </button>
        </div>

        <button
          type="button"
          @click="exportReport"
          class="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <i class="pi pi-download text-xs" />
          <span class="hidden sm:inline">Export PDF</span>
        </button>
      </div>
    </div>

    <!-- KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Billings</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <i class="pi pi-dollar text-xs" />
          </div>
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">$148,920</div>
        <div class="flex items-center gap-1.5 mt-2">
          <Tag value="+14.2% vs last mo" severity="success" class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg" />
          <span class="text-[10px] text-slate-400">Target $135k</span>
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Units Delivered</span>
          <div class="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
            <i class="pi pi-box text-xs" />
          </div>
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">1,248</div>
        <div class="flex items-center gap-1.5 mt-2">
          <Tag value="+8.6% yield" severity="info" class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg" />
          <span class="text-[10px] text-slate-400">98.2% on-time</span>
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Turnaround</span>
          <div class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <i class="pi pi-clock text-xs" />
          </div>
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">3.2 Days</div>
        <div class="flex items-center gap-1.5 mt-2">
          <Tag value="-0.4d faster" severity="warning" class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg" />
          <span class="text-[10px] text-slate-400">SLA: 4.0 Days</span>
        </div>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Remake Rate</span>
          <div class="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 flex items-center justify-center">
            <i class="pi pi-shield-check text-xs" />
          </div>
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">0.82%</div>
        <div class="flex items-center gap-1.5 mt-2">
          <Tag value="Industry Top 1%" severity="success" class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg" />
          <span class="text-[10px] text-slate-400">Benchmark: 2.5%</span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Production Volume & Revenue Trend -->
      <div class="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Throughput & Revenue Velocity</h3>
            <p class="text-xs text-slate-400">Monthly units processed vs billed amounts</p>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="text-slate-500">Revenue ($k)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-300"></span>
              <span class="text-slate-500">Units</span>
            </div>
          </div>
        </div>

        <div class="h-80 w-full">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" class="h-full w-full" />
        </div>
      </div>

      <!-- Restoration Mix Doughnut Chart -->
      <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Material & Indication Mix</h3>
          <p class="text-xs text-slate-400">Distribution across active prosthetics</p>
        </div>

        <div class="h-56 relative flex items-center justify-center my-2">
          <Chart type="doughnut" :data="doughnutChartData" :options="doughnutChartOptions" class="h-full w-full" />
        </div>

        <div class="space-y-2 text-xs">
          <div class="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span class="font-medium text-slate-700 dark:text-slate-300">Multi-Layer Zirconia</span>
            </div>
            <span class="font-bold text-slate-900 dark:text-white">48%</span>
          </div>
          <div class="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <span class="font-medium text-slate-700 dark:text-slate-300">E.max Disilicate</span>
            </div>
            <span class="font-bold text-slate-900 dark:text-white">26%</span>
          </div>
          <div class="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span class="font-medium text-slate-700 dark:text-slate-300">Titanium Abutments</span>
            </div>
            <span class="font-bold text-slate-900 dark:text-white">16%</span>
          </div>
          <div class="flex items-center justify-between py-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span class="font-medium text-slate-700 dark:text-slate-300">PMMA / Hybrid</span>
            </div>
            <span class="font-bold text-slate-900 dark:text-white">10%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Clinician Performance Leaderboard -->
    <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Top Ordering Dental Practices</h3>
          <p class="text-xs text-slate-400">Partnership tier, case volume, and clinician satisfaction scores</p>
        </div>
        <Tag value="9 Partners Active" severity="secondary" class="!text-xs !font-bold self-start sm:self-auto" />
      </div>

      <DataTable
        :value="topClinics"
        class="!text-xs"
        responsiveLayout="scroll"
        :pt="{
          table: { class: 'w-full' },
          thead: { class: '!bg-slate-50/80 dark:!bg-[#0c1220]/80 !text-slate-400 !text-[11px]' },
          bodyRow: { class: 'hover:!bg-slate-50/50 dark:hover:!bg-[#0c1220]/50 !border-b !border-slate-100 dark:!border-slate-800/80 transition-colors' }
        }"
      >
        <Column header="Partner Clinic">
          <template #body="{ data }">
            <div class="flex items-center gap-3">
              <Avatar
                :label="data.name.slice(0, 2).toUpperCase()"
                shape="circle"
                class="!w-8 !h-8 !text-xs !bg-slate-100 dark:!bg-slate-800 !text-slate-800 dark:!text-slate-200 !font-bold shrink-0"
              />
              <div>
                <span class="font-bold text-slate-900 dark:text-white block">{{ data.name }}</span>
                <span class="text-[11px] text-slate-400">{{ data.doctor }}</span>
              </div>
            </div>
          </template>
        </Column>

        <Column field="tier" header="Partnership Tier">
          <template #body="{ data }">
            <Tag
              :value="data.tier"
              :severity="data.tier === 'Platinum' ? 'success' : data.tier === 'Gold' ? 'warning' : 'info'"
              class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg"
            />
          </template>
        </Column>

        <Column field="units" header="Total Units">
          <template #body="{ data }">
            <span class="font-bold text-slate-900 dark:text-white">{{ data.units }} units</span>
          </template>
        </Column>

        <Column field="revenue" header="Billed Volume">
          <template #body="{ data }">
            <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ formatCurrency(data.revenue) }}</span>
          </template>
        </Column>

        <Column field="avgTurnaround" header="Avg Delivery">
          <template #body="{ data }">
            <span class="text-slate-600 dark:text-slate-300">{{ data.avgTurnaround }}</span>
          </template>
        </Column>

        <Column field="satisfaction" header="Doctor CSAT">
          <template #body="{ data }">
            <div class="flex items-center gap-1.5">
              <i class="pi pi-star-fill text-amber-400 text-xs" />
              <span class="font-bold text-slate-900 dark:text-white">{{ data.satisfaction }}</span>
              <span class="text-[10px] text-slate-400">/ 5.0</span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import { formatCurrency } from '@/utils/format';

const toast = useToast();

const timeframes = [
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: 'Year 2026', value: 'ytd' },
];
const currentTimeframe = ref('30d');

const topClinics = ref([
  { name: 'Apex Dental Care', doctor: 'Dr. Sarah Mitchell', tier: 'Platinum', units: 342, revenue: 42800, avgTurnaround: '2.8 days', satisfaction: 4.95 },
  { name: 'PureSmile Studio', doctor: 'Dr. Robert Chen', tier: 'Platinum', units: 284, revenue: 36200, avgTurnaround: '3.1 days', satisfaction: 4.88 },
  { name: 'Beacon Prosthodontics', doctor: 'Dr. Michael Taylor', tier: 'Gold', units: 195, revenue: 25400, avgTurnaround: '3.4 days', satisfaction: 4.79 },
  { name: 'Artisan Dental Lab Group', doctor: 'Dr. Elena Rostova', tier: 'Gold', units: 168, revenue: 21800, avgTurnaround: '3.0 days', satisfaction: 4.85 },
  { name: 'Lumina Oral Surgery', doctor: 'Dr. Julian Morales', tier: 'Silver', units: 112, revenue: 14600, avgTurnaround: '3.6 days', satisfaction: 4.70 },
]);

const barChartData = computed(() => ({
  labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  datasets: [
    {
      type: 'bar',
      label: 'Units Shipped',
      backgroundColor: '#090e18',
      data: [180, 210, 235, 270, 290, 312],
      borderRadius: 8,
      borderSkipped: false,
    },
    {
      type: 'line',
      label: 'Revenue ($k)',
      borderColor: '#10b981',
      borderWidth: 3,
      fill: false,
      tension: 0.4,
      data: [92, 108, 115, 132, 141, 149],
      yAxisID: 'y1',
    }
  ]
}));

const barChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      padding: 12,
      cornerRadius: 12,
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#94a3b8', font: { size: 11 } }
    },
    y: {
      grid: { color: 'rgba(226, 232, 240, 0.2)' },
      ticks: { color: '#94a3b8', font: { size: 11 } }
    },
    y1: {
      position: 'right',
      grid: { display: false },
      ticks: {
        color: '#10b981',
        font: { size: 11 },
        callback: (v: any) => `$${v}k`
      }
    }
  }
};

const doughnutChartData = {
  labels: ['Multi-layer Zirconia', 'E.max Disilicate', 'Titanium Abutments', 'PMMA / Hybrid'],
  datasets: [
    {
      data: [48, 26, 16, 10],
      backgroundColor: ['#10b981', '#0ea5e9', '#f59e0b', '#94a3b8'],
      borderWidth: 0,
      hoverOffset: 6
    }
  ]
};

const doughnutChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  cutout: '72%',
  plugins: {
    legend: {
      display: false
    }
  }
};

const exportReport = () => {
  toast.add({
    severity: 'success',
    summary: 'Report Compiled',
    detail: 'Executive PDF summary downloaded successfully',
    life: 3000
  });
};
</script>
