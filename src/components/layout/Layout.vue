<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
    <!-- Floating Aura Sidebar -->
    <Sidebar
      :collapsed="sidebarCollapsed"
      :mobile-open="mobileOpen"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
      @mobile-close="mobileOpen = false"
    />

    <!-- Main Dynamic Content Column -->
    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300 ease-in-out min-w-0',
        sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
      ]"
    >
      <!-- Top Sticky Header -->
      <Header @mobile-toggle="mobileOpen = !mobileOpen" />

      <!-- Page Content with Fluid Page Transition -->
      <main class="flex-1 p-3 sm:p-5 lg:p-6 max-w-7xl w-full mx-auto min-w-0 overflow-x-hidden">
        <router-view v-slot="{ Component }">
          <Transition name="page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </main>

      <!-- Signature PrimeVue Aura Footer -->
      <footer class="py-3 px-6 text-xs text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200/60 dark:border-slate-800/60 select-none">
        <div class="flex items-center gap-2">
          <span class="inline-flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="font-medium text-[11px]">PrimeVue v4 • Aura Flagship Preset • Pure Vue 3 Composition API</span>
        </div>
        <div class="flex items-center gap-3 text-[11px] font-mono">
          <span>PrimeIcons</span>
          <span>•</span>
          <span>Chart.js Engine</span>
          <span>•</span>
          <span>Tailwind CSS v4</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';
import { useDentalStore } from '@/stores/dental';
import { getSavedThemeConfig, applyThemeConfig } from '@/utils/theme';

const store = useDentalStore();
const sidebarCollapsed = ref(false);
const mobileOpen = ref(false);

onMounted(() => {
  store.init();
  applyThemeConfig(getSavedThemeConfig());
});
</script>
