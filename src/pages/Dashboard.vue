<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Top Command Toolbar (Faithfully modeled from Image 2) -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Overview</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">Live</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-0.5">
          Portfolio command
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor dental lab exposure, CAD/CAM queue velocity, and recent restoration activity.
        </p>
      </div>

      <!-- Controls: Timeframe Pills, Download, Date Range -->
      <div class="flex flex-wrap items-center gap-2.5">
        <!-- Weekly / Monthly / Yearly SelectButton -->
        <SelectButton
          v-model="timeframe"
          :options="['Weekly', 'Monthly', 'Yearly']"
          class="text-xs font-bold select-none"
        />


        <!-- Date Range Pill -->
        <div class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 rounded-2xl text-xs font-mono text-slate-700 dark:text-slate-300 shadow-2xs">
          <span>06/11/2024 - 06/22/2024</span>
          <i class="pi pi-calendar text-xs text-slate-400" />
        </div>
      </div>
    </div>

    <!-- 4 KPI Stat Cards (Matching Image 2 exactly) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- 1. Total Balance -->
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div class="flex items-start justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Total balance</span>
          <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <i class="pi pi-wallet text-sm" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">$1.42M</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            +12.4%
          </span>
        </div>
      </div>

      <!-- 2. Net Flow -->
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div class="flex items-start justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Net flow</span>
          <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <i class="pi pi-arrow-right-arrow-left text-sm" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">$284.6K</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            +8.2%
          </span>
        </div>
      </div>

      <!-- 3. Open Orders -->
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div class="flex items-start justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Open orders</span>
          <div class="w-8 h-8 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <i class="pi pi-bolt text-sm" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">128</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
            Live
          </span>
        </div>
      </div>

      <!-- 4. Risk Score -->
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div class="flex items-start justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Risk score</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <i class="pi pi-shield text-sm" />
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">24%</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            Low
          </span>
        </div>
      </div>
    </div>

    <!-- Portfolio Activity Bar Chart (Matching Image 2) -->
    <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Portfolio activity</h3>
          <p class="text-xs text-slate-400">Annual throughput breakdown across customer segments</p>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700 dark:bg-slate-400" />
            <span>Personal Wallet</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-600" />
            <span>Corporate Wallet</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            <span>Investment Wallet</span>
          </div>
        </div>
      </div>

      <Chart type="bar" :data="barChartData" :options="barChartOptions" class="h-64 sm:h-72 w-full" />
    </div>

    <!-- Bottom Row: Recent Activity Table + Wallet Mix (Matching Image 2) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Recent Activity Table (2/3 width) -->
      <div class="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Recent activity</h3>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                10 pending
              </span>
              <button
                type="button"
                @click="$router.push('/orders')"
                class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <i class="pi pi-arrow-right text-[10px]" />
              </button>
            </div>
          </div>

          <!-- PrimeVue DataTable for Recent Activity -->
          <DataTable
            :value="recentOrders"
            responsiveLayout="scroll"
            class="p-datatable-sm text-xs"
            :rowHover="true"
            @row-click="e => $router.push(`/orders/${e.data.id}`)"
          >
            <Column field="orderNumber" header="Id" sortable>
              <template #body="{ data }">
                <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  #{{ data.orderNumber }}
                </span>
              </template>
            </Column>

            <Column field="patientName" header="Name" sortable>
              <template #body="{ data }">
                <div class="flex items-center gap-2">
                  <Avatar :label="data.patientName[0]" size="small" shape="circle" class="bg-emerald-500/10 text-emerald-600 font-bold" />
                  <span class="font-bold text-slate-900 dark:text-white">{{ data.patientName }}</span>
                </div>
              </template>
            </Column>

            <Column field="restoration" header="Restoration" sortable>
              <template #body="{ data }">
                <span class="font-semibold text-slate-700 dark:text-slate-300">{{ data.restoration }}</span>
              </template>
            </Column>

            <Column field="dueDate" header="Date" sortable>
              <template #body="{ data }">
                <span class="font-mono text-slate-400 text-[11px]">{{ formatDate(data.dueDate) }}</span>
              </template>
            </Column>

            <Column field="status" header="Process" sortable>
              <template #body="{ data }">
                <Tag
                  :value="data.status"
                  :severity="getStatusSeverity(data.status)"
                  rounded
                  class="text-[10px]"
                />
              </template>
            </Column>

            <Column field="amount" header="Amount" sortable>
              <template #body="{ data }">
                <span class="font-mono font-bold text-slate-900 dark:text-white">{{ formatCurrency(data.amount) }}</span>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

      <!-- Wallet Mix / Restoration Mix (1/3 width) -->
      <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Wallet mix</h3>
            <i class="pi pi-ellipsis-h text-slate-400 cursor-pointer" />
          </div>

          <div class="flex items-baseline justify-between mb-4">
            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">$1.42M</span>
            <span class="text-xs font-bold text-emerald-500">+12.4%</span>
          </div>

          <!-- Color segments bar -->
          <div class="w-full h-3 rounded-full overflow-hidden flex gap-0.5 bg-slate-100 dark:bg-slate-800 mb-6">
            <div class="h-full bg-emerald-500" style="width: 48%" title="Zirconia 48%" />
            <div class="h-full bg-cyan-400" style="width: 26%" title="E-Max 26%" />
            <div class="h-full bg-amber-400" style="width: 14%" title="Implant Abutments 14%" />
            <div class="h-full bg-purple-500" style="width: 12%" title="Surgical Guides 12%" />
          </div>

          <!-- Segment Breakdown List -->
          <div class="space-y-3 text-xs">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span class="font-medium text-slate-700 dark:text-slate-300">Zirconia Restorations</span>
              </div>
              <span class="font-bold font-mono text-slate-900 dark:text-white">48% ($681K)</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span class="font-medium text-slate-700 dark:text-slate-300">Lithium Disilicate (E-Max)</span>
              </div>
              <span class="font-bold font-mono text-slate-900 dark:text-white">26% ($369K)</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span class="font-medium text-slate-700 dark:text-slate-300">Titanium Abutments</span>
              </div>
              <span class="font-bold font-mono text-slate-900 dark:text-white">14% ($198K)</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span class="font-medium text-slate-700 dark:text-slate-300">Guided Surgery & Guides</span>
              </div>
              <span class="font-bold font-mono text-slate-900 dark:text-white">12% ($170K)</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="$router.push('/reports')"
          class="w-full mt-6 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
        >
          View Detailed Analytics
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SelectButton from 'primevue/selectbutton';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import { useDentalStore } from '@/stores/dental';
import { formatCurrency, formatDate } from '@/utils/format';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const timeframe = ref('Monthly');

const recentOrders = computed(() => store.getOrders().slice(0, 5));

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Ready':
      return 'success';
    case 'In Production':
    case 'Design':
      return 'info';
    case 'Review':
      return 'warn';
    default:
      return 'secondary';
  }
};

// Bar chart data matching Image 1 exactly
const barChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Personal Wallet',
      backgroundColor: '#64748b', // Elegant slate matching Image 1
      data: [3500, 9500, 14500, 3800, 15500, 7800, 11500, 13500, 16500, 4800, 11500, 5800],
      borderSkipped: false,
    },
    {
      label: 'Corporate Wallet',
      backgroundColor: '#94a3b8', // Medium light slate matching Image 1
      data: [2500, 8000, 2500, 7500, 3500, 6000, 9800, 8000, 4800, 7500, 8800, 3800],
      borderSkipped: false,
    },
    {
      label: 'Investment Wallet',
      backgroundColor: '#e2e8f0', // Soft pale blue-gray matching Image 1
      borderRadius: { topLeft: 6, topRight: 6 },
      borderSkipped: false,
      data: [3800, 6200, 2600, 7200, 2600, 4500, 5000, 8200, 4800, 6500, 5800, 4400],
    }
  ]
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      padding: 10,
      cornerRadius: 12,
    }
  },
  scales: {
    x: {
      stacked: true,
      categoryPercentage: 0.52,
      barPercentage: 0.65,
      grid: {
        display: false
      },
      ticks: {
        color: '#94a3b8',
        font: { size: 11, weight: '600' }
      }
    },
    y: {
      stacked: true,
      min: 0,
      max: 30000,
      ticks: {
        stepSize: 5000,
        color: '#94a3b8',
        font: { size: 11, weight: '600' },
        callback: (v: any) => v === 0 ? '0' : v.toLocaleString()
      },
      grid: {
        color: 'rgba(226, 232, 240, 0.8)'
      }
    }
  }
};
</script>
