<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Clinical Documents & Archives
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Secure cloud repository for intraoral STL scans, CBCT DICOM packages, lab slips, and prescriptions
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          @click="showUploadDialog = true"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <i class="pi pi-cloud-upload text-xs" />
          <span>Upload File</span>
        </button>
      </div>
    </div>

    <!-- Storage Telemetry -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-400 font-semibold">Total Cloud Storage</span>
          <i class="pi pi-database text-slate-400 text-sm" />
        </div>
        <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">42.8 GB</div>
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div class="bg-emerald-500 h-full rounded-full" style="width: 42.8%"></div>
        </div>
        <span class="text-[10px] text-slate-400 mt-1 block">42.8% of 100 GB tier utilized</span>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-400 font-semibold">3D CAD / STL Scans</span>
          <i class="pi pi-box text-emerald-500 text-sm" />
        </div>
        <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">1,480 Files</div>
        <p class="text-[10px] text-emerald-500 mt-2 font-medium">99.9% DICOM 3.0 verified</p>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-400 font-semibold">Lab Slips & PDF</span>
          <i class="pi pi-file-pdf text-rose-500 text-sm" />
        </div>
        <div class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">824 Slips</div>
        <p class="text-[10px] text-slate-400 mt-2 font-medium">Archived with doctor e-signatures</p>
      </div>

      <div class="p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-400 font-semibold">HIPAA Compliance</span>
          <i class="pi pi-shield text-sky-500 text-sm" />
        </div>
        <div class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">100% Encrypted</div>
        <p class="text-[10px] text-slate-400 mt-2 font-medium">AES-256 at rest & in transit</p>
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm">
      <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="selectedCategory = cat.value"
          :class="[
            'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
            selectedCategory === cat.value
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          ]"
        >
          {{ cat.label }} ({{ getCategoryCount(cat.value) }})
        </button>
      </div>

      <div class="w-full sm:w-72">
        <IconField iconPosition="left" class="w-full">
          <InputIcon class="pi pi-search text-xs" />
          <InputText
            v-model="searchQuery"
            placeholder="Search files, patients, orders..."
            class="w-full !rounded-2xl !py-1.5 !text-xs !bg-slate-50 dark:!bg-[#0c1220] !border-slate-200 dark:!border-slate-800"
          />
        </IconField>
      </div>
    </div>

    <!-- Documents Grid / List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="doc in filteredDocuments"
        :key="doc.id"
        class="group p-5 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <div
                :class="[
                  'w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-lg',
                  getFileIconClass(doc.type)
                ]"
              >
                <i :class="getFileIcon(doc.type)" />
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-bold text-slate-900 dark:text-white truncate" :title="doc.title">
                  {{ doc.title }}
                </h4>
                <p class="text-xs text-slate-400 truncate">
                  {{ doc.orderId }} • {{ doc.patientName }}
                </p>
              </div>
            </div>

            <Tag
              :value="doc.format.toUpperCase()"
              severity="secondary"
              class="!text-[10px] !font-bold !px-2 !py-0.5 !rounded-lg"
            />
          </div>

          <div class="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl mb-4 space-y-1">
            <div class="flex justify-between">
              <span>Category:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ doc.category }}</span>
            </div>
            <div class="flex justify-between">
              <span>File Size:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ doc.size }}</span>
            </div>
            <div class="flex justify-between">
              <span>Uploaded By:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ doc.uploader }}</span>
            </div>
            <div class="flex justify-between">
              <span>Date:</span>
              <span class="font-medium text-slate-700 dark:text-slate-200">{{ doc.date }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            @click="previewFile(doc)"
            class="flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <i class="pi pi-eye text-[11px]" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            @click="downloadFile(doc)"
            class="py-1.5 px-3 rounded-xl text-xs font-semibold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-1.5"
            title="Download original file"
          >
            <i class="pi pi-download text-[11px]" />
            <span>Get</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Dialog -->
    <Dialog
      v-model:visible="showUploadDialog"
      modal
      header="Upload Clinical Asset"
      :style="{ width: '92vw', maxWidth: '520px' }"
      :pt="{
        root: { class: '!rounded-3xl !border !border-slate-200 dark:!border-slate-800 !bg-white dark:!bg-[#090e18] !shadow-2xl' },
        header: { class: '!p-6 !border-b !border-slate-100 dark:!border-slate-800' },
        content: { class: '!p-6' }
      }"
    >
      <div class="space-y-4">
        <div>
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">File Category</label>
          <Select
            v-model="uploadForm.category"
            :options="['Intraoral Scans (STL/PLY)', 'CBCT Radiographs (DICOM)', 'Lab Prescription Slips', 'Consent Documents']"
            class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </div>

        <div>
          <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Associated Order / Case ID</label>
          <InputText
            v-model="uploadForm.orderId"
            placeholder="e.g. ORD-2024-001"
            class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
          />
        </div>

        <div class="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center hover:border-emerald-500/50 transition cursor-pointer">
          <i class="pi pi-cloud-upload text-3xl text-emerald-500 mb-2" />
          <p class="text-xs font-bold text-slate-800 dark:text-slate-200">Drag & drop files or browse</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Supports .STL, .PLY, .DCM, .ZIP, .PDF up to 250MB</p>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            @click="showUploadDialog = false"
            class="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="submitUpload"
            class="px-4 py-2 rounded-2xl text-xs font-bold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            Upload Document
          </button>
        </div>
      </div>
    </Dialog>

    <!-- Preview Dialog -->
    <Dialog
      v-model:visible="showPreviewDialog"
      modal
      :header="selectedDoc?.title || 'Document Preview'"
      :style="{ width: '92vw', maxWidth: '680px' }"
      :pt="{
        root: { class: '!rounded-3xl !border !border-slate-200 dark:!border-slate-800 !bg-white dark:!bg-[#090e18] !shadow-2xl' },
        header: { class: '!p-6 !border-b !border-slate-100 dark:!border-slate-800' },
        content: { class: '!p-6' }
      }"
    >
      <div v-if="selectedDoc" class="space-y-4">
        <div class="h-64 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-teal-500/10"></div>
          <i :class="[getFileIcon(selectedDoc.type), 'text-5xl text-emerald-400 mb-3 relative z-10']" />
          <h3 class="text-base font-bold relative z-10">{{ selectedDoc.title }}</h3>
          <p class="text-xs text-slate-400 relative z-10 mt-1">{{ selectedDoc.format.toUpperCase() }} Object • {{ selectedDoc.size }}</p>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mt-3 relative z-10">
            <i class="pi pi-check-circle text-xs" />
            Integrity Check Passed (SHA-256)
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
            <span class="text-slate-400 block">Associated Case</span>
            <span class="font-bold text-slate-900 dark:text-white">{{ selectedDoc.orderId }}</span>
          </div>
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900">
            <span class="text-slate-400 block">Patient Record</span>
            <span class="font-bold text-slate-900 dark:text-white">{{ selectedDoc.patientName }}</span>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            @click="showPreviewDialog = false"
            class="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Close
          </button>
          <button
            type="button"
            @click="downloadFile(selectedDoc)"
            class="px-4 py-2 rounded-2xl text-xs font-bold text-white bg-black dark:bg-white dark:text-black hover:opacity-90 transition flex items-center gap-1.5"
          >
            <i class="pi pi-download text-xs" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

interface ClinicalDoc {
  id: string;
  title: string;
  orderId: string;
  patientName: string;
  category: 'STL Scans' | 'DICOM CBCT' | 'Lab Slips' | 'Consents';
  format: 'stl' | 'ply' | 'dcm' | 'pdf' | 'zip';
  type: '3d' | 'dicom' | 'pdf' | 'archive';
  size: string;
  uploader: string;
  date: string;
}

const categories = [
  { label: 'All Assets', value: 'all' },
  { label: 'STL / 3D Scans', value: 'STL Scans' },
  { label: 'DICOM Radiographs', value: 'DICOM CBCT' },
  { label: 'Lab Slips', value: 'Lab Slips' },
  { label: 'Consents', value: 'Consents' },
];

const selectedCategory = ref('all');
const searchQuery = ref('');
const showUploadDialog = ref(false);
const showPreviewDialog = ref(false);
const selectedDoc = ref<ClinicalDoc | null>(null);

const uploadForm = ref({
  category: 'Intraoral Scans (STL/PLY)',
  orderId: '',
});

const documents = ref<ClinicalDoc[]>([
  {
    id: 'DOC-901',
    title: 'Upper_Maxilla_Prep_Scan_T14.stl',
    orderId: 'ORD-2024-001',
    patientName: 'Eleanor Vance',
    category: 'STL Scans',
    format: 'stl',
    type: '3d',
    size: '18.4 MB',
    uploader: 'Dr. Sarah Mitchell',
    date: 'Today, 10:15 AM'
  },
  {
    id: 'DOC-902',
    title: 'Mandibular_Opposing_Bite.ply',
    orderId: 'ORD-2024-001',
    patientName: 'Eleanor Vance',
    category: 'STL Scans',
    format: 'ply',
    type: '3d',
    size: '14.2 MB',
    uploader: 'Dr. Sarah Mitchell',
    date: 'Today, 10:16 AM'
  },
  {
    id: 'DOC-903',
    title: 'Implant_Guide_Surgical_Plan.pdf',
    orderId: 'ORD-2024-003',
    patientName: 'Marcus Sterling',
    category: 'Lab Slips',
    format: 'pdf',
    type: 'pdf',
    size: '3.8 MB',
    uploader: 'Dr. Robert Chen',
    date: 'Yesterday'
  },
  {
    id: 'DOC-904',
    title: 'CBCT_Full_Arch_Volume_0.2mm.zip',
    orderId: 'ORD-2024-004',
    patientName: 'Sophia Lin',
    category: 'DICOM CBCT',
    format: 'zip',
    type: 'archive',
    size: '184.6 MB',
    uploader: 'Beacon Dental Studio',
    date: 'Sep 24, 2026'
  },
  {
    id: 'DOC-905',
    title: 'Signed_Prosthetic_Consent_Form.pdf',
    orderId: 'ORD-2024-002',
    patientName: 'Alexander Hayes',
    category: 'Consents',
    format: 'pdf',
    type: 'pdf',
    size: '1.2 MB',
    uploader: 'Reception Staff',
    date: 'Sep 23, 2026'
  },
  {
    id: 'DOC-906',
    title: 'Zirconia_Bridge_Framework_V2.stl',
    orderId: 'ORD-2024-005',
    patientName: 'David Kim',
    category: 'STL Scans',
    format: 'stl',
    type: '3d',
    size: '22.1 MB',
    uploader: 'Tech. Evan Vance',
    date: 'Sep 22, 2026'
  }
]);

const getCategoryCount = (catValue: string) => {
  if (catValue === 'all') return documents.value.length;
  return documents.value.filter(d => d.category === catValue).length;
};

const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchesCat = selectedCategory.value === 'all' || doc.category === selectedCategory.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !query || 
      doc.title.toLowerCase().includes(query) ||
      doc.patientName.toLowerCase().includes(query) ||
      doc.orderId.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });
});

const getFileIcon = (type: string) => {
  switch (type) {
    case '3d': return 'pi pi-box';
    case 'dicom':
    case 'archive': return 'pi pi-folder';
    case 'pdf': return 'pi pi-file-pdf';
    default: return 'pi pi-file';
  }
};

const getFileIconClass = (type: string) => {
  switch (type) {
    case '3d': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    case 'archive': return 'bg-amber-500/10 text-amber-500';
    case 'pdf': return 'bg-rose-500/10 text-rose-500';
    default: return 'bg-slate-100 text-slate-600';
  }
};

const previewFile = (doc: ClinicalDoc) => {
  selectedDoc.value = doc;
  showPreviewDialog.value = true;
};

const downloadFile = (doc: ClinicalDoc) => {
  toast.add({
    severity: 'success',
    summary: 'Download Initialized',
    detail: `Exporting ${doc.title} (${doc.size})`,
    life: 3000
  });
};

const submitUpload = () => {
  toast.add({
    severity: 'success',
    summary: 'Upload Complete',
    detail: 'Asset uploaded and verified via DICOM/STL scanner',
    life: 3500
  });
  showUploadDialog.value = false;
};
</script>
