<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cases & Multi-Unit Treatments
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Comprehensive patient treatments, surgical guide sequences, and multi-restoration cases
        </p>
      </div>

      <router-link
        to="/orders/create"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all self-start sm:self-auto"
      >
        <i class="pi pi-plus text-xs" />
        <span>New Clinical Case</span>
      </router-link>
    </div>

    <!-- Toolbar -->
    <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="w-full sm:w-80">
        <IconField class="w-full">
          <InputIcon class="pi pi-search text-xs text-slate-400" />
          <InputText v-model="searchQuery" placeholder="Search cases by patient, doctor, title..." class="w-full text-xs !rounded-2xl" />
        </IconField>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-auto flex-wrap">
        <Select
          v-model="statusFilter"
          :options="['All', 'Active', 'In Progress', 'Review', 'Closed']"
          placeholder="Status"
          class="text-xs !rounded-2xl w-32"
        />
        <MultiSelect
          v-if="viewMode === 'table'"
          v-model="selectedColumns"
          :options="allColumns"
          optionLabel="header"
          placeholder="Columns"
          :maxSelectedLabels="2"
          class="text-xs !rounded-2xl w-36"
        />
        <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            @click="viewMode = 'table'"
            :class="['p-1.5 rounded-xl text-xs font-bold transition-all', viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400']"
            title="Table View"
          >
            <i class="pi pi-list text-xs" />
          </button>
          <button
            type="button"
            @click="viewMode = 'grid'"
            :class="['p-1.5 rounded-xl text-xs font-bold transition-all', viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-400']"
            title="Card Grid View"
          >
            <i class="pi pi-th-large text-xs" />
          </button>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-if="viewMode === 'table'" class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
      <DataTable :value="filteredCases" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column v-if="isColVisible('caseNumber')" field="caseNumber" header="Case #" sortable>
          <template #body="{ data }">
            <router-link :to="`/cases/${data.id}`" class="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              #{{ data.caseNumber }}
            </router-link>
          </template>
        </Column>

        <Column v-if="isColVisible('title')" field="title" header="Case Title" sortable>
          <template #body="{ data }">
            <div class="font-bold text-slate-900 dark:text-white">{{ data.title }}</div>
            <div class="text-[10px] text-slate-400">{{ data.ordersCount || 1 }} Order(s) linked</div>
          </template>
        </Column>

        <Column v-if="isColVisible('patientName')" field="patientName" header="Patient" sortable>
          <template #body="{ data }">
            <div class="font-semibold text-slate-800 dark:text-slate-200">{{ data.patientName }}</div>
          </template>
        </Column>

        <Column v-if="isColVisible('doctorName')" field="doctorName" header="Doctor & Clinic" sortable>
          <template #body="{ data }">
            <div class="text-slate-800 dark:text-slate-200">{{ data.doctorName }}</div>
            <div class="text-[10px] text-slate-400">{{ data.clinicName }}</div>
          </template>
        </Column>

        <Column v-if="isColVisible('status')" field="status" header="Status" sortable>
          <template #body="{ data }">
            <Tag :value="data.status" severity="info" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column v-if="isColVisible('priority')" field="priority" header="Priority" sortable>
          <template #body="{ data }">
            <Tag :value="data.priority" :severity="data.priority === 'Urgent' ? 'danger' : 'warn'" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column v-if="isColVisible('actions')" header="Action" bodyStyle="text-align: right">
          <template #body="{ data }">
            <router-link :to="`/cases/${data.id}`" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>View Case</span>
              <i class="pi pi-arrow-right text-[10px]" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Grid View -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="c in filteredCases"
        :key="c.id"
        class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">#{{ c.caseNumber }}</span>
            <Tag :value="c.status" severity="info" rounded class="text-[10px]" />
          </div>
          <h3 class="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
            {{ c.title }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Patient: <strong>{{ c.patientName }}</strong></p>
          <div class="text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span>{{ c.doctorName }}</span>
            <span>{{ c.clinicName }}</span>
          </div>
        </div>

        <router-link
          :to="`/cases/${c.id}`"
          class="w-full mt-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-center text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors block"
        >
          Open Case Portfolio
        </router-link>
      </div>
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

const store = useDentalStore();
const searchQuery = ref('');
const statusFilter = ref('All');
const viewMode = ref<'table' | 'grid'>('table');

const allColumns = [
  { field: 'caseNumber', header: 'Case #' },
  { field: 'title', header: 'Case Title' },
  { field: 'patientName', header: 'Patient' },
  { field: 'doctorName', header: 'Doctor & Clinic' },
  { field: 'status', header: 'Status' },
  { field: 'priority', header: 'Priority' },
  { field: 'actions', header: 'Action' },
];

const selectedColumns = ref([...allColumns]);

const isColVisible = (field: string) => {
  return selectedColumns.value.some(c => c.field === field);
};

const cases = computed(() => store.getCases());

const filteredCases = computed(() => {
  return cases.value.filter(c => {
    const q = searchQuery.value.toLowerCase();
    const matchesSearch = !q || c.caseNumber.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || (c.patientName || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter.value === 'All' || c.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});
</script>
