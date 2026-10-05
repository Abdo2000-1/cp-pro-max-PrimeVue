<template>
  <div class="space-y-6 w-full min-w-0 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Studio Preferences & Theme Customizer
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Customize background colors, dark/light canvas, button colors, and dental clinical conventions
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          @click="resetToDefaultTheme"
          class="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition cursor-pointer"
        >
          Reset Theme
        </button>
        <button
          type="button"
          @click="applyCurrentTheme"
          class="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-black dark:bg-white dark:text-black rounded-2xl shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <i class="pi pi-check text-xs" />
          <span>Apply Theme</span>
        </button>
      </div>
    </div>

    <!-- 1. Real-Time Custom Theme Engine -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left 2 Cols: Controls & Pickers -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Curated Presets -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Curated Theme Presets</h3>
              <p class="text-xs text-slate-400">Click any preset to instantly dress the entire application</p>
            </div>
            <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              8 Presets
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              v-for="preset in THEME_PRESETS"
              :key="preset.id"
              type="button"
              @click="loadPreset(preset)"
              :class="[
                'p-3 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between group',
                currentPresetId === preset.id
                  ? 'border-indigo-500 ring-2 ring-indigo-500/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-slate-50/50 dark:bg-[#0c1220]/50'
              ]"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10" :style="{ backgroundColor: preset.config.buttonBgColor }" />
                  <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: preset.config.primaryColor }" />
                </div>
                <span class="text-[10px] font-bold uppercase text-slate-400">{{ preset.mode }}</span>
              </div>
              <div>
                <span class="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-indigo-500 transition-colors">
                  {{ preset.name }}
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- Interactive Custom Color Palette Pickers -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Custom Color Tuner</h3>
              <p class="text-xs text-slate-400">Choose custom hex colors for background, cards, buttons, and accents</p>
            </div>
            <!-- Dark / Light Mode Switcher -->
            <div class="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                @click="customTheme.mode = 'dark'; updateLiveTheme()"
                :class="[
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5',
                  customTheme.mode === 'dark' ? 'bg-black text-white dark:bg-slate-700 dark:text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                ]"
              >
                <i class="pi pi-moon text-[10px]" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                @click="customTheme.mode = 'light'; updateLiveTheme()"
                :class="[
                  'px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5',
                  customTheme.mode === 'light' ? 'bg-white text-black shadow-xs' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                ]"
              >
                <i class="pi pi-sun text-[10px]" />
                <span>Light</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- App Background Color -->
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/60 dark:border-slate-800/60">
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Main App Canvas Background
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="customTheme.appBgColor"
                  @input="updateLiveTheme"
                  class="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5 shrink-0"
                />
                <input
                  type="text"
                  v-model="customTheme.appBgColor"
                  @change="updateLiveTheme"
                  class="flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Card Background Color -->
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/60 dark:border-slate-800/60">
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Panel & Card Background
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="customTheme.cardBgColor"
                  @input="updateLiveTheme"
                  class="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5 shrink-0"
                />
                <input
                  type="text"
                  v-model="customTheme.cardBgColor"
                  @change="updateLiveTheme"
                  class="flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Button Background Color -->
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/60 dark:border-slate-800/60">
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Primary Button Background
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="customTheme.buttonBgColor"
                  @input="updateLiveTheme"
                  class="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5 shrink-0"
                />
                <input
                  type="text"
                  v-model="customTheme.buttonBgColor"
                  @change="updateLiveTheme"
                  class="flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Button Text Color -->
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/60 dark:border-slate-800/60">
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Button Text Color
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="customTheme.buttonTextColor"
                  @input="updateLiveTheme"
                  class="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5 shrink-0"
                />
                <input
                  type="text"
                  v-model="customTheme.buttonTextColor"
                  @change="updateLiveTheme"
                  class="flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <!-- Primary Accent Color -->
            <div class="sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1220] border border-slate-200/60 dark:border-slate-800/60">
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                PrimeVue Accent & Telemetry Color
              </label>
              <div class="flex items-center gap-2">
                <input
                  type="color"
                  v-model="customTheme.primaryColor"
                  @input="updateLiveTheme"
                  class="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5 shrink-0"
                />
                <input
                  type="text"
                  v-model="customTheme.primaryColor"
                  @change="updateLiveTheme"
                  class="flex-1 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <!-- Quick Palette Dots -->
                <div class="flex items-center gap-1.5 pl-2">
                  <button
                    v-for="color in ['#10b981', '#0ea5e9', '#6366f1', '#8b5cf6', '#f43f5e', '#f59e0b', '#14b8a6']"
                    :key="color"
                    type="button"
                    @click="customTheme.primaryColor = color; updateLiveTheme()"
                    class="w-5 h-5 rounded-full cursor-pointer hover:scale-110 transition-transform"
                    :style="{ backgroundColor: color }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right 1 Col: Live Component Preview -->
      <div class="space-y-6">
        <div
          class="p-6 rounded-3xl border shadow-xl space-y-4 transition-all"
          :style="{
            backgroundColor: customTheme.cardBgColor,
            borderColor: customTheme.mode === 'dark' ? '#1e293b' : '#e2e8f0'
          }"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider" :style="{ color: customTheme.primaryColor }">
              Live Theme Preview
            </span>
            <Tag value="Active Preview" severity="success" class="!text-[10px] !font-bold" />
          </div>

          <div>
            <h4 class="text-base font-extrabold" :style="{ color: customTheme.mode === 'dark' ? '#ffffff' : '#0f172a' }">
              Dr. Sarah Mitchell, DDS
            </h4>
            <p class="text-xs" :style="{ color: customTheme.mode === 'dark' ? '#94a3b8' : '#64748b' }">
              Apex Dental Care • Prosthodontics
            </p>
          </div>

          <div
            class="p-4 rounded-2xl border text-xs space-y-1"
            :style="{
              backgroundColor: customTheme.appBgColor,
              borderColor: customTheme.mode === 'dark' ? '#1e293b' : '#e2e8f0',
              color: customTheme.mode === 'dark' ? '#e2e8f0' : '#1e293b'
            }"
          >
            <div class="flex justify-between">
              <span>Selected Arch:</span>
              <strong :style="{ color: customTheme.primaryColor }">Maxilla #14</strong>
            </div>
            <div class="flex justify-between">
              <span>Restoration:</span>
              <strong>Multi-Layer Zirconia</strong>
            </div>
          </div>

          <button
            type="button"
            class="w-full py-2.5 rounded-2xl text-xs font-extrabold shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            :style="{
              backgroundColor: customTheme.buttonBgColor,
              color: customTheme.buttonTextColor
            }"
          >
            <i class="pi pi-check text-xs" />
            <span>Custom Action Button</span>
          </button>
        </div>

        <!-- Odontology Convention & Sound Preferences -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <h3 class="text-sm font-extrabold text-slate-900 dark:text-white">Odontology & System Standards</h3>

          <div>
            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Dental Notation System</label>
            <Select
              v-model="notationSystem"
              :options="['Universal Numbering (1 - 32)', 'FDI World Dental (11-48)', 'Palmer Notation (1-8)']"
              class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
            />
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-xs font-bold text-slate-900 dark:text-white block">Auditory Chimes</span>
              <span class="text-[10px] text-slate-400">Audio feedback on clicks & orders</span>
            </div>
            <ToggleSwitch :modelValue="store.soundEnabled" @update:modelValue="store.toggleSound" />
          </div>

          <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              @click="reseedMockData"
              class="w-full py-2 rounded-2xl text-xs font-bold text-rose-600 bg-rose-500/10 hover:bg-rose-500/20 transition cursor-pointer"
            >
              Re-seed Lab Database (All JSON Records)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Select from 'primevue/select';
import ToggleSwitch from 'primevue/toggleswitch';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import { useDentalStore } from '@/stores/dental';
import { THEME_PRESETS, getSavedThemeConfig, applyThemeConfig, type CustomThemeConfig } from '@/utils/theme';
import { sound } from '@/utils/sound';

const toast = useToast();
const store = useDentalStore();

const currentPresetId = ref('aura-light');
const customTheme = ref<CustomThemeConfig>({ ...THEME_PRESETS[0].config });
const notationSystem = ref('Universal Numbering (1 - 32)');

onMounted(() => {
  const saved = getSavedThemeConfig();
  customTheme.value = { ...saved };
  const matched = THEME_PRESETS.find(p => p.config.appBgColor === saved.appBgColor && p.config.cardBgColor === saved.cardBgColor);
  if (matched) currentPresetId.value = matched.id;
});

const loadPreset = (preset: typeof THEME_PRESETS[0]) => {
  currentPresetId.value = preset.id;
  customTheme.value = { ...preset.config };
  applyThemeConfig(customTheme.value);
  sound.playClick();
  toast.add({
    severity: 'success',
    summary: 'Preset Applied',
    detail: `Applied ${preset.name}`,
    life: 2500
  });
};

const updateLiveTheme = () => {
  currentPresetId.value = 'custom';
  customTheme.value.isCustom = true;
  applyThemeConfig(customTheme.value);
};

const applyCurrentTheme = () => {
  applyThemeConfig(customTheme.value);
  sound.playSuccess();
  toast.add({
    severity: 'success',
    summary: 'Theme Saved & Applied',
    detail: 'All colors and preferences have been synchronized',
    life: 3000
  });
};

const resetToDefaultTheme = () => {
  loadPreset(THEME_PRESETS[0]);
};

const reseedMockData = async () => {
  await store.resetData();
  sound.playSuccess();
  toast.add({
    severity: 'info',
    summary: 'Mock Database Re-seeded',
    detail: 'Refreshed with 50+ real orders, patients, and clinics',
    life: 3500
  });
};
</script>
