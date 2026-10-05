<template>
  <div>
    <!-- Mobile Backdrop -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
      @click="$emit('mobile-close')"
    />

    <!-- Sidebar Container -->
    <aside
      :class="[
        'fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 ease-in-out flex flex-col',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        collapsed ? 'w-20 p-2' : 'w-64 p-3'
      ]"
    >
      <div
        :class="[
          'h-full w-full rounded-3xl bg-white/95 dark:bg-[#090e18]/95 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-slate-900/5 backdrop-blur-xl flex flex-col justify-between overflow-hidden select-none',
          collapsed ? 'p-2 items-center' : 'p-3'
        ]"
      >
        <!-- Header / Logo -->
        <div
          v-if="collapsed"
          class="flex flex-col items-center gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800/70 w-full"
        >
          <router-link to="/dashboard" class="flex items-center justify-center" @click="$emit('mobile-close')">
            <PrimeLogo :show-text="false" />
          </router-link>
          <button
            type="button"
            class="hidden lg:flex w-7 h-7 rounded-xl items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            @click="$emit('toggle')"
            title="Expand Sidebar"
          >
            <i class="pi pi-chevron-right text-xs" />
          </button>
        </div>

        <div
          v-else
          class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/70 w-full"
        >
          <router-link to="/dashboard" class="flex items-center gap-2 overflow-hidden" @click="$emit('mobile-close')">
            <PrimeLogo :show-text="true" />
          </router-link>

          <button
            type="button"
            class="hidden lg:flex w-7 h-7 rounded-xl items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            @click="$emit('toggle')"
            title="Collapse Sidebar"
          >
            <i class="pi pi-chevron-left text-xs" />
          </button>
        </div>

        <!-- Navigation Menu -->
        <nav :class="['flex-1 my-2 space-y-1 overflow-y-auto no-scrollbar', collapsed ? 'w-full' : 'w-full pr-0.5']">
          <div v-if="!collapsed" class="px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Platform Menu
          </div>

          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="handleClick"
            v-tooltip.right="collapsed ? item.label : null"
            :class="[
              'group flex items-center transition-all duration-200',
              collapsed
                ? 'w-10 h-10 mx-auto justify-center rounded-2xl'
                : 'gap-3 px-3 py-2 rounded-2xl text-xs font-semibold',
              isActive(item.path)
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-md shadow-black/10 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            ]"
          >
            <div
              :class="[
                'w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110',
                isActive(item.path)
                  ? 'bg-white/10 dark:bg-black/10'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-500'
              ]"
            >
              <i :class="[item.icon, 'text-xs']" />
            </div>

            <span v-if="!collapsed" class="truncate flex-1">
              {{ item.label }}
            </span>

            <span
              v-if="!collapsed && item.badge"
              :class="[
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                isActive(item.path)
                  ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                  : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
              ]"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </nav>

        <!-- Footer / Theme & Profile -->
        <div :class="['pt-2.5 border-t border-slate-100 dark:border-slate-800/70 space-y-2', collapsed ? 'w-full flex flex-col items-center' : 'w-full']">
          <!-- Theme Switcher Pill -->
          <button
            type="button"
            @click="toggleTheme"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            :class="[
              'transition-colors border border-slate-200/60 dark:border-slate-800 cursor-pointer',
              'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
              collapsed
                ? 'w-10 h-10 p-0 rounded-2xl flex items-center justify-center'
                : 'w-full flex items-center gap-2 p-2 rounded-2xl text-xs font-semibold'
            ]"
          >
            <i :class="isDark ? 'pi pi-sun text-amber-500' : 'pi pi-moon text-slate-600'" class="text-xs" />
            <span v-if="!collapsed" class="truncate">{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>

          <!-- User Card -->
          <div
            :class="[
              'rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer',
              collapsed ? 'p-1 flex justify-center' : 'flex items-center gap-2 p-1.5'
            ]"
            title="Dr. Evan Vance • Chief Dental Technologist"
          >
            <div class="relative shrink-0">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                EV
              </div>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div v-if="!collapsed" class="min-w-0 flex-1">
              <p class="text-xs font-bold text-slate-900 dark:text-white truncate">Dr. Evan Vance</p>
              <p class="text-[10px] text-slate-400 truncate">Chief Technologist</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PrimeLogo from '@/components/ui/PrimeLogo.vue';
import { sound } from '@/utils/sound';
import { toggleThemeMode } from '@/utils/theme';
import { useDentalStore } from '@/stores/dental';

defineProps<{
  collapsed: boolean;
  mobileOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'mobile-close'): void;
}>();

const store = useDentalStore();
const route = useRoute();
const isDark = ref(document.documentElement.classList.contains('dark'));

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'pi pi-home', badge: 'Live' },
  { path: '/orders', label: 'Orders Hub', icon: 'pi pi-list', badge: '64' },
  { path: '/cards', label: 'Aura Cards Showcase', icon: 'pi pi-th-large', badge: 'New' },
  { path: '/cases', label: 'Cases & Rx', icon: 'pi pi-briefcase' },
  { path: '/scan-center', label: 'Scan Center', icon: 'pi pi-camera' },
  { path: '/workflow-board', label: 'Workflow Board', icon: 'pi pi-table' },
  { path: '/patients', label: 'Patients Directory', icon: 'pi pi-users' },
  { path: '/doctors', label: 'Clinicians', icon: 'pi pi-id-card' },
  { path: '/clinics', label: 'Partner Clinics', icon: 'pi pi-building' },
  { path: '/billing', label: 'Billing & Invoices', icon: 'pi pi-receipt' },
  { path: '/change-requests', label: 'Change Requests', icon: 'pi pi-history', badge: '3' },
  { path: '/documents', label: 'Digital Library', icon: 'pi pi-file' },
  { path: '/reports', label: 'Analytics & Reports', icon: 'pi pi-chart-pie' },
  { path: '/settings', label: 'Studio Settings', icon: 'pi pi-cog' },
];

const isActive = (path: string) => {
  if (path === '/dashboard') return route.path === '/dashboard' || route.path === '/';
  return route.path.startsWith(path);
};

const handleClick = () => {
  sound.playClick();
  emit('mobile-close');
};

const toggleTheme = () => {
  sound.playClick();
  const nextIsDark = toggleThemeMode();
  isDark.value = nextIsDark;
  store.theme = nextIsDark ? 'dark' : 'light';
};
</script>
