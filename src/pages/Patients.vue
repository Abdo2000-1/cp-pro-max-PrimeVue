<template>
  <div class="space-y-6 w-full min-w-0">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Patients Directory
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Patient health profiles, digital dental charts, and case histories ({{ patients.length }} registered)
        </p>
      </div>

      <button
        type="button"
        @click="showAddPatientModal = true"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all self-start sm:self-auto"
      >
        <i class="pi pi-user-plus text-xs" />
        <span>Add Patient</span>
      </button>
    </div>

    <!-- Toolbar -->
    <div class="p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="w-full sm:w-80">
        <IconField class="w-full">
          <InputIcon class="pi pi-search text-xs text-slate-400" />
          <InputText v-model="searchQuery" placeholder="Search patients by name, email, clinic..." class="w-full text-xs !rounded-2xl" />
        </IconField>
      </div>

      <div class="flex items-center gap-2 self-end sm:self-auto">
        <Select
          v-model="statusFilter"
          :options="['All', 'Active', 'Inactive']"
          placeholder="Status"
          class="text-xs !rounded-2xl w-32"
        />
      </div>
    </div>

    <!-- DataTable -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
      <DataTable :value="filteredPatients" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column field="name" header="Patient">
          <template #body="{ data }">
            <div class="flex items-center gap-2.5">
              <Avatar :label="data.name[0]" shape="circle" class="bg-emerald-500/10 text-emerald-600 font-bold" />
              <div>
                <router-link :to="`/patients/${data.id}`" class="font-extrabold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
                  {{ data.name }}
                </router-link>
                <div class="text-[10px] text-slate-400">DOB: {{ formatDate(data.dob) }} ({{ data.gender }})</div>
              </div>
            </div>
          </template>
        </Column>

        <Column field="phone" header="Contact">
          <template #body="{ data }">
            <div class="font-mono text-slate-800 dark:text-slate-200">{{ data.phone }}</div>
            <div class="text-[10px] text-slate-400">{{ data.email }}</div>
          </template>
        </Column>

        <Column field="clinicName" header="Clinic / Doctor">
          <template #body="{ data }">
            <div class="font-medium text-slate-800 dark:text-slate-200">{{ data.clinicName }}</div>
            <div class="text-[10px] text-slate-400">{{ data.doctorName }}</div>
          </template>
        </Column>

        <Column field="ordersCount" header="Prescriptions" sortable>
          <template #body="{ data }">
            <span class="font-mono font-bold">{{ data.ordersCount || 0 }} Cases</span>
          </template>
        </Column>

        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status" :severity="data.status === 'Active' ? 'success' : 'secondary'" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column header="Actions" bodyStyle="text-align: right">
          <template #body="{ data }">
            <router-link :to="`/patients/${data.id}`" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Profile</span>
              <i class="pi pi-arrow-right text-[10px]" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Add Patient Dialog Modal -->
    <Dialog v-model:visible="showAddPatientModal" modal header="Register New Patient" :style="{ width: '420px' }" class="!rounded-3xl">
      <div class="space-y-4 pt-2 text-xs">
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
          <InputText v-model="newPatient.name" class="w-full text-xs !rounded-2xl" placeholder="e.g. Eleanor Vance" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
          <InputText v-model="newPatient.email" class="w-full text-xs !rounded-2xl" placeholder="e.g. e.vance@gmail.com" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
          <InputText v-model="newPatient.phone" class="w-full text-xs !rounded-2xl" placeholder="e.g. +1 (555) 392-1084" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Clinic</label>
          <InputText v-model="newPatient.clinicName" class="w-full text-xs !rounded-2xl" placeholder="e.g. Bright Smile Dental" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="showAddPatientModal = false" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">Cancel</button>
          <button @click="savePatient" class="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold">Save Patient</button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { useDentalStore } from '@/stores/dental';
import { formatDate } from '@/utils/format';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const searchQuery = ref('');
const statusFilter = ref('All');
const showAddPatientModal = ref(false);

const newPatient = ref({
  name: '',
  email: '',
  phone: '',
  clinicName: 'Bright Smile Dental'
});

const patients = computed(() => store.getPatients());

const filteredPatients = computed(() => {
  return patients.value.filter(p => {
    const q = searchQuery.value.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.clinicName.toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q);
    const matchS = statusFilter.value === 'All' || p.status === statusFilter.value;
    return matchQ && matchS;
  });
});

const savePatient = () => {
  if (newPatient.value.name.trim()) {
    store.createPatient({
      name: newPatient.value.name,
      email: newPatient.value.email,
      phone: newPatient.value.phone,
      clinicName: newPatient.value.clinicName,
      status: 'Active',
      dob: '1992-06-15',
      gender: 'F'
    });
    sound.playSuccess();
    showAddPatientModal.value = false;
    newPatient.value = { name: '', email: '', phone: '', clinicName: 'Bright Smile Dental' };
  }
};
</script>
