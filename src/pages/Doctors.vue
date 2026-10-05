<template>
  <div class="space-y-6 w-full min-w-0">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Prescribing Clinicians
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Licensed dentists, prosthodontists, and orthodontists submitting CAD/CAM cases
        </p>
      </div>

      <button
        type="button"
        @click="showAddModal = true"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm self-start sm:self-auto"
      >
        <i class="pi pi-plus text-xs" />
        <span>Add Clinician</span>
      </button>
    </div>

    <!-- DataTable -->
    <div class="rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
      <DataTable :value="doctors" responsiveLayout="scroll" class="p-datatable-sm text-xs" :rowHover="true">
        <Column field="name" header="Doctor">
          <template #body="{ data }">
            <div class="flex items-center gap-2.5">
              <Avatar :label="data.name.replace('Dr. ', '')[0]" shape="circle" class="bg-cyan-500/10 text-cyan-600 font-bold" />
              <div>
                <router-link :to="`/doctors/${data.id}`" class="font-extrabold text-slate-900 dark:text-white hover:text-indigo-500 transition-colors">
                  {{ data.name }}
                </router-link>
                <div class="text-[10px] text-slate-400">{{ data.specialty }}</div>
              </div>
            </div>
          </template>
        </Column>

        <Column field="clinicName" header="Affiliated Clinic" />
        <Column field="phone" header="Contact Phone" />
        <Column field="email" header="Email Address" />

        <Column field="status" header="Status">
          <template #body="{ data }">
            <Tag :value="data.status" severity="success" rounded class="text-[10px]" />
          </template>
        </Column>

        <Column header="Actions" bodyStyle="text-align: right">
          <template #body="{ data }">
            <router-link :to="`/doctors/${data.id}`" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Profile</span>
              <i class="pi pi-arrow-right text-[10px]" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Modal -->
    <Dialog v-model:visible="showAddModal" modal header="Add Clinician" :style="{ width: '420px' }">
      <div class="space-y-4 pt-2 text-xs">
        <div>
          <label class="block font-bold mb-1">Doctor Name</label>
          <InputText v-model="newDoc.name" class="w-full text-xs !rounded-2xl" placeholder="Dr. Arthur Morgan" />
        </div>
        <div>
          <label class="block font-bold mb-1">Specialty</label>
          <InputText v-model="newDoc.specialty" class="w-full text-xs !rounded-2xl" placeholder="Prosthodontics" />
        </div>
        <div>
          <label class="block font-bold mb-1">Clinic Name</label>
          <InputText v-model="newDoc.clinicName" class="w-full text-xs !rounded-2xl" placeholder="Apex Dental Studio" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="showAddModal = false" class="px-4 py-2 rounded-xl border">Cancel</button>
          <button @click="saveDoc" class="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold">Save Clinician</button>
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
import InputText from 'primevue/inputtext';
import { useDentalStore } from '@/stores/dental';
import { sound } from '@/utils/sound';

const store = useDentalStore();
const showAddModal = ref(false);
const newDoc = ref({ name: '', specialty: 'Prosthodontics', clinicName: 'Apex Dental Studio' });

const doctors = computed(() => store.getDoctors());

const saveDoc = () => {
  if (newDoc.value.name.trim()) {
    store.createDoctor({
      name: newDoc.value.name,
      specialty: newDoc.value.specialty,
      clinicName: newDoc.value.clinicName,
      status: 'Active',
      email: `${newDoc.value.name.toLowerCase().replace(/[^a-z]/g, '')}@dental.com`,
      phone: '+1 (555) 019-2831'
    });
    sound.playSuccess();
    showAddModal.value = false;
    newDoc.value = { name: '', specialty: 'Prosthodontics', clinicName: 'Apex Dental Studio' };
  }
};
</script>
