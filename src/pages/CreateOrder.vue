<template>
  <div class="space-y-6 w-full min-w-0 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <router-link
            to="/orders"
            class="text-xs font-semibold text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
          >
            <i class="pi pi-arrow-left text-[10px]" />
            <span>Back to Orders</span>
          </router-link>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
          Create Digital Prescription
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Submit new prosthetic order with interactive tooth mapping and instant CAD cost estimation
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition cursor-pointer"
        >
          Reset
        </button>
        <button
          type="button"
          @click="submitPrescription"
          :disabled="isSubmitting"
          class="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          <i :class="isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-check'" class="text-xs" />
          <span>{{ isSubmitting ? 'Submitting...' : 'Dispatch Order' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Patient & Prescribing Doctor Section (Full Width) -->
    <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">1</span>
        <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Patient & Prescribing Doctor</h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Prescribing Doctor *</label>
          <Select
            v-model="form.doctor"
            :options="doctorOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select Prescriber"
            class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Clinic / Practice *</label>
          <Select
            v-model="form.clinic"
            :options="clinicOptions"
            placeholder="Select Dental Clinic"
            class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Patient Full Name *</label>
          <InputText
            v-model="form.patientName"
            placeholder="e.g. Johnathan Miller"
            class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Due Date *</label>
          <InputText
            v-model="form.dueDate"
            type="date"
            class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </div>
      </div>
    </div>

    <!-- 2. Anatomical Dental Odontogram (Full Width Panoramic Clinical View) -->
    <div class="w-full">
      <TeethChart
        v-model="selectedTeeth"
        v-model:tooth-restorations="toothRestorations"
        :readonly="false"
        :showToolbar="true"
      />
    </div>

    <!-- 3. Bottom Grid: Material Selection & Instructions (2 cols) + Live Summary (1 col) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left 2 Cols: Material & Technical Instructions -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Material & Indication -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">3</span>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Material & Indication</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              v-for="mat in materials"
              :key="mat.id"
              @click="form.material = mat.name; form.unitPrice = mat.price"
              :class="[
                'p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between',
                form.material === mat.name
                  ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 ring-1 ring-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-[#0c1220]/50'
              ]"
            >
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-bold text-slate-900 dark:text-white">{{ mat.name }}</span>
                  <i v-if="form.material === mat.name" class="pi pi-check text-emerald-500 text-xs" />
                </div>
                <p class="text-[11px] text-slate-400">{{ mat.desc }}</p>
              </div>
              <div class="text-xs font-extrabold text-slate-900 dark:text-white mt-3">
                ${{ mat.price }} <span class="text-[10px] font-normal text-slate-400">/ unit</span>
              </div>
            </div>
          </div>

          <!-- Shade Selector -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">VITA Classical Shade *</label>
              <Select
                v-model="form.shade"
                :options="['A1', 'A2', 'A3', 'A3.5', 'A4', 'B1', 'B2', 'B3', 'C1', 'C2', 'D2', 'BL1 (Bleach)', 'BL2', 'BL3']"
                placeholder="Choose Shade"
                class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
              />
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Translucency / Esthetic Tier</label>
              <Select
                v-model="form.translucency"
                :options="['High Translucency (HT - 49%)', 'Super Translucent (ST - 44%)', 'Ultra Translucent Anterior (UTML - 46%)', 'High Opacity Core']"
                placeholder="Select Level"
                class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
              />
            </div>
          </div>
        </div>

        <!-- Clinical Notes & Special Instructions -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center">4</span>
            <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Lab Technician Instructions</h3>
          </div>

          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Add margin design preferences, contact tightness, pontic design, or occlusion instructions..."
            class="w-full rounded-2xl p-3 text-xs bg-slate-50 dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition"
          ></textarea>
        </div>
      </div>

      <!-- Right 1 Col: Summary & Actions -->
      <div class="space-y-6">
        <!-- Live Cost Breakdown -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <h3 class="text-base font-extrabold text-slate-900 dark:text-white">Prescription Summary</h3>

          <div class="space-y-3 text-xs">
            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-400">Doctor</span>
              <span class="font-bold text-slate-900 dark:text-white truncate max-w-[140px]">{{ form.doctor || 'Unselected' }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-400">Patient</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ form.patientName || 'Untitled' }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-400">Restoration</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ form.material }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-400">Shade</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ form.shade }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-400">Units Count</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ selectedTeeth.length }} unit(s)</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-400">Selected Teeth</span>
              <span class="font-mono text-slate-700 dark:text-slate-300">
                {{ selectedTeeth.length ? selectedTeeth.sort((a,b)=>a-b).join(', ') : 'None' }}
              </span>
            </div>

            <!-- Priority Toggle -->
            <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span class="font-bold text-slate-900 dark:text-white block">Rush 24h Turnaround</span>
                <span class="text-[10px] text-slate-400">+$60.00 rush lab surcharge</span>
              </div>
              <ToggleSwitch v-model="form.isRush" />
            </div>

            <!-- Total Price -->
            <div class="pt-3">
              <div class="flex justify-between items-baseline">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Total</span>
                <span class="text-2xl font-black text-slate-900 dark:text-white">${{ calculateTotal() }}</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-1">Invoice billed automatically upon CAD sign-off.</p>
            </div>
          </div>

          <button
            type="button"
            @click="submitPrescription"
            :disabled="isSubmitting"
            class="w-full py-3 rounded-2xl text-xs font-extrabold text-white bg-black dark:bg-white dark:text-black shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <i class="pi pi-bolt text-xs" />
            <span>Submit to Production</span>
          </button>
        </div>

        <!-- Scan Drag & Drop Area -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <i class="pi pi-cloud-upload text-3xl text-emerald-500 mb-2" />
          <h4 class="text-xs font-bold text-slate-900 dark:text-white">Attach Digital Impressions</h4>
          <p class="text-[11px] text-slate-400 mt-1">Direct upload STL scans or DICOM sets</p>
          <div class="mt-3">
            <span class="inline-block px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              1 File Attached: UpperPrep.stl
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import ToggleSwitch from 'primevue/toggleswitch';
import { useToast } from 'primevue/usetoast';
import { useDentalStore } from '@/stores/dental';
import TeethChart from '@/components/ui/TeethChart.vue';
import confetti from 'canvas-confetti';

const router = useRouter();
const toast = useToast();
const dentalStore = useDentalStore();

const isSubmitting = ref(false);
const selectedTeeth = ref<number[]>([14]);
const toothRestorations = ref<Record<number, any>>({ 14: 'crown' });

const doctorOptions = [
  { label: 'Dr. Sarah Mitchell', value: 'Dr. Sarah Mitchell' },
  { label: 'Dr. Robert Chen', value: 'Dr. Robert Chen' },
  { label: 'Dr. Elena Rostova', value: 'Dr. Elena Rostova' },
  { label: 'Dr. Michael Taylor', value: 'Dr. Michael Taylor' },
];

const clinicOptions = [
  'Apex Dental Care',
  'PureSmile Cosmetic Studio',
  'Beacon Oral Surgery',
  'Artisan Dental Lab Group',
];

const materials = [
  { id: 'zirc', name: 'Multi-layer Zirconia', price: 185, desc: 'High flexural strength 1200 MPa' },
  { id: 'emax', name: 'IPS e.max Press', price: 195, desc: 'Maximum anterior esthetics 500 MPa' },
  { id: 'titan', name: 'Titanium Abutment', price: 245, desc: 'Precision milled custom emergence' },
  { id: 'pmma', name: 'PMMA Long-Term Temp', price: 65, desc: 'Diagnostics & prototype try-ins' },
  { id: 'brux', name: 'Bruxism Nightguard', price: 110, desc: 'Thermosensitive 3D printed resin' },
];

const form = ref({
  doctor: 'Dr. Sarah Mitchell',
  clinic: 'Apex Dental Care',
  patientName: 'Eleanor Vance',
  dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0],
  material: 'Multi-layer Zirconia',
  unitPrice: 185,
  shade: 'A2',
  translucency: 'High Translucency (HT - 49%)',
  isRush: false,
  notes: 'Match margin depth closely to prep line. Incisal translucency level 2.',
});

const calculateTotal = () => {
  const units = Math.max(1, selectedTeeth.value.length);
  const base = units * form.value.unitPrice;
  const rush = form.value.isRush ? 60 : 0;
  return base + rush;
};

const resetForm = () => {
  selectedTeeth.value = [14];
  toothRestorations.value = { 14: 'crown' };
  form.value.patientName = '';
  form.value.notes = '';
};

const submitPrescription = () => {
  if (!form.value.patientName) {
    toast.add({
      severity: 'warn',
      summary: 'Patient Required',
      detail: 'Please provide patient full name',
      life: 3000
    });
    return;
  }

  isSubmitting.value = true;

  setTimeout(() => {
    isSubmitting.value = false;

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    toast.add({
      severity: 'success',
      summary: 'Order Submitted',
      detail: `Prescription dispatched to CAD queue ($${calculateTotal()})`,
      life: 3500
    });

    setTimeout(() => {
      router.push('/orders');
    }, 1200);
  }, 700);
};
</script>
