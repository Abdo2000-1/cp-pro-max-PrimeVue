<template>
  <div class="space-y-6 w-full min-w-0 pb-16">
    <!-- Header -->
    <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sliders class="w-5 h-5" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Configuration Management System (CMS)
              </h1>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                PrimeVue Aura Engine
              </span>
            </div>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Centralized external administrative control over UI branding, themes, endpoints, and features
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          @click="handleReset"
          class="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
        >
          <RotateCcw class="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>

        <button
          type="button"
          @click="handleSave"
          class="flex items-center gap-1.5 px-5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
        >
          <Save class="w-3.5 h-3.5" />
          <span>Save & Apply Configuration</span>
        </button>
      </div>
    </div>

    <!-- Notification -->
    <div
      v-if="savedNotification"
      class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 shadow-sm"
    >
      <CheckCircle2 class="w-4 h-4 text-emerald-500" />
      <span>Configuration updated successfully! Dynamic settings are now globally live.</span>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="activeTab = tab.id"
        :class="[
          'flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
          activeTab === tab.id
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
        ]"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- TAB 1: BRANDING -->
    <div v-if="activeTab === 'branding'" class="bg-white dark:bg-[#090e18] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <h2 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
        <Sparkles class="w-4 h-4 text-emerald-500" />
        <span>Platform Identity & Versioning</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Application Full Name</label>
          <input
            v-model="formState.branding.appName"
            type="text"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
          />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Short Brand Name</label>
          <input
            v-model="formState.branding.shortName"
            type="text"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
          />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Version String</label>
          <input
            v-model="formState.branding.version"
            type="text"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs"
          />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Build Number</label>
          <input
            v-model="formState.branding.buildNumber"
            type="text"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-xs"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Legal Copyright Holder</label>
          <input
            v-model="formState.branding.copyrightHolder"
            type="text"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs"
          />
        </div>
      </div>
    </div>

    <!-- TAB 2: POWER BI -->
    <div v-if="activeTab === 'powerbi'" class="bg-white dark:bg-[#090e18] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <h2 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
        <BarChart3 class="w-4 h-4 text-emerald-500" />
        <span>Microsoft Power BI Service & Azure Gateway</span>
      </h2>
      <div class="space-y-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Live Power BI Embed URL / Public Fabric Link</label>
          <input
            v-model="formState.powerBi.defaultEmbedUrl"
            type="url"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs"
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Workspace ID</label>
            <input
              v-model="formState.powerBi.workspaceId"
              type="text"
              class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-xs"
            />
          </div>
          <div>
            <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">PBIX Dataset Name</label>
            <input
              v-model="formState.powerBi.datasetName"
              type="text"
              class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: LINKS -->
    <div v-if="activeTab === 'links'" class="bg-white dark:bg-[#090e18] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <h2 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
        <Share2 class="w-4 h-4 text-emerald-500" />
        <span>Corporate Endpoints & Footer Links</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Support Email</label>
          <input
            v-model="formState.links.supportEmail"
            type="email"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs"
          />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Support Portal URL</label>
          <input
            v-model="formState.links.supportPortal"
            type="url"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs"
          />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Documentation URL</label>
          <input
            v-model="formState.links.documentationUrl"
            type="url"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs"
          />
        </div>
        <div>
          <label class="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status Page URL</label>
          <input
            v-model="formState.links.statusPageUrl"
            type="url"
            class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs"
          />
        </div>
      </div>
    </div>

    <!-- TAB 4: FEATURES -->
    <div v-if="activeTab === 'features'" class="bg-white dark:bg-[#090e18] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
      <h2 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
        <Database class="w-4 h-4 text-emerald-500" />
        <span>System Feature Flags</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <label class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between cursor-pointer">
          <span class="font-bold text-slate-800 dark:text-slate-200">Power BI Live Embed</span>
          <input
            type="checkbox"
            v-model="formState.features.enablePowerBIRealEmbed"
            class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
        </label>
        <label class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between cursor-pointer">
          <span class="font-bold text-slate-800 dark:text-slate-200">Excel Column Resize</span>
          <input
            type="checkbox"
            v-model="formState.features.enableTableExcelResize"
            class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
        </label>
        <label class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between cursor-pointer">
          <span class="font-bold text-slate-800 dark:text-slate-200">Sound Effects</span>
          <input
            type="checkbox"
            v-model="formState.features.enableSoundEffects"
            class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  Sliders, Save, RotateCcw, CheckCircle2, Sparkles, BarChart3,
  Share2, Database, Palette
} from 'lucide-vue-next';
import { useAppConfig } from '@/composables/useAppConfig';
import { sound } from '@/utils/sound';

const { config, saveConfig, resetConfig } = useAppConfig();
const formState = reactive(JSON.parse(JSON.stringify(config.value)));
const savedNotification = ref(false);
const activeTab = ref<'branding' | 'theme' | 'links' | 'features' | 'powerbi'>('branding');

const tabs = [
  { id: 'branding' as const, label: 'Branding & Version', icon: Sparkles },
  { id: 'powerbi' as const, label: 'Power BI Gateway', icon: BarChart3 },
  { id: 'links' as const, label: 'Links & Endpoints', icon: Share2 },
  { id: 'features' as const, label: 'Feature Flags', icon: Database },
];

const handleSave = () => {
  saveConfig(formState);
  sound.playClick(800);
  savedNotification.value = true;
  setTimeout(() => {
    savedNotification.value = false;
  }, 3000);
};

const handleReset = () => {
  if (confirm('Restore default configuration?')) {
    resetConfig();
    location.reload();
  }
};
</script>
