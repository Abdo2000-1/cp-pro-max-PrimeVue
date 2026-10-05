<template>
  <header class="sticky top-0 z-30 px-3 pt-3 pb-1 select-none">
    <div class="rounded-3xl bg-white/90 dark:bg-[#090e18]/90 border border-slate-200/90 dark:border-slate-800/90 shadow-sm backdrop-blur-xl px-4 py-2.5 flex items-center justify-between gap-4">
      
      <!-- Left: Mobile Menu + Title & Breadcrumb -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="lg:hidden p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          @click="$emit('mobile-toggle')"
          aria-label="Toggle Mobile Menu"
        >
          <i class="pi pi-bars text-sm" />
        </button>

        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[10px] font-bold">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>Overview • Live</span>
          </div>

          <h2 class="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
            {{ currentTitle }}
          </h2>
        </div>
      </div>

      <!-- Center: PrimeVue IconField Search -->
      <div class="hidden md:flex flex-1 max-w-md mx-2">
        <IconField class="w-full">
          <InputIcon class="pi pi-search text-xs text-slate-400" />
          <InputText
            v-model="searchQuery"
            placeholder="Search orders, patients, doctors (Ctrl+K)..."
            class="w-full text-xs !rounded-2xl !bg-slate-50 dark:!bg-slate-900/80 !border-slate-200 dark:!border-slate-800 focus:!border-indigo-500 focus:!ring-1 focus:!ring-indigo-500"
            @keyup.enter="handleSearch"
          />
        </IconField>
      </div>

      <!-- Right: Action Pills & Notifications -->
      <div class="flex items-center gap-2">
        <!-- Date Range Pill (Image 2 style) -->
        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 text-xs font-medium text-slate-600 dark:text-slate-300">
          <i class="pi pi-calendar text-xs text-slate-400" />
          <span class="font-mono text-[11px]">{{ currentDateRange }}</span>
        </div>


        <!-- Notifications Dropdown -->
        <div class="relative" ref="notifRef">
          <button
            type="button"
            @click="notifOpen = !notifOpen"
            class="relative p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Notifications"
          >
            <i class="pi pi-bell text-sm" />
            <span
              v-if="unreadCount > 0"
              class="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-xs"
            >
              {{ unreadCount }}
            </span>
          </button>

          <!-- Notification Dropdown Popover -->
          <div
            v-if="notifOpen"
            class="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-3 animate-fade-in"
          >
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span class="text-xs font-bold text-slate-900 dark:text-white">Recent Lab Alerts</span>
              <span class="text-[10px] text-indigo-500 font-mono font-semibold">{{ unreadCount }} new</span>
            </div>
            <div class="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto my-1">
              <div
                v-for="notif in notifications.slice(0, 4)"
                :key="notif.id"
                class="py-2 px-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl transition-colors cursor-pointer"
                @click="notifOpen = false; $router.push(notif.relatedId ? `/orders/${notif.relatedId}` : '/dashboard')"
              >
                <div class="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                  <span>{{ notif.title }}</span>
                  <span class="text-[10px] text-slate-400 font-normal">{{ timeAgo(notif.createdAt) }}</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{{ notif.message }}</p>
              </div>
            </div>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <router-link
                to="/orders"
                @click="notifOpen = false"
                class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View Live Orders Hub →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Quick New Order Action -->
        <router-link
          to="/orders/create"
          class="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all active:scale-95"
        >
          <i class="pi pi-plus text-xs font-bold" />
          <span class="hidden sm:inline">New Rx</span>
        </router-link>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useDentalStore } from '@/stores/dental';
import { timeAgo } from '@/utils/format';
import { sound } from '@/utils/sound';

defineEmits<{
  (e: 'mobile-toggle'): void;
}>();

const route = useRoute();
const router = useRouter();
const store = useDentalStore();

const searchQuery = ref('');
const notifOpen = ref(false);

const notifications = computed(() => store.notifications);
const unreadCount = computed(() => store.unreadNotificationsCount);

const currentDateRange = computed(() => {
  const d = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(d.getDate() + 7);
  return `${d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })} - ${nextWeek.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`;
});

const currentTitle = computed(() => {
  const name = route.name as string || '';
  if (name.includes('Order')) return 'Prescription Management';
  if (name.includes('Cards')) return 'Aura Cards Showcase';
  if (name.includes('Patient')) return 'Patient Health Records';
  if (name.includes('Doctor')) return 'Clinician Directory';
  if (name.includes('Billing')) return 'Accounts & Receivables';
  if (name.includes('Scan')) return 'Intake Scan Center';
  if (name.includes('Workflow')) return 'Production Pipeline';
  return 'Portfolio command';
});

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    sound.playClick();
    router.push(`/orders?search=${encodeURIComponent(searchQuery.value)}`);
  }
};

</script>
