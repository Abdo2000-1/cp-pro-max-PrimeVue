<template>
  <div class="flex items-center gap-2.5 select-none">
    <div class="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg shadow-black/10 shrink-0 transition-transform hover:scale-105">
      <!-- PrimeVue Helmet Icon SVG -->
      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 5V11C4 16.5 7.5 21.3 12 22C16.5 21.3 20 16.5 20 11V5L12 2ZM12 4.1L18 6.4V11C18 15.2 15.4 19.1 12 19.9C8.6 19.1 6 15.2 6 11V6.4L12 4.1ZM12 7L8 9V13.5C8 15.8 9.7 17.8 12 18.4C14.3 17.8 16 15.8 16 13.5V9L12 7ZM12 9.2L14 10.2V13.5C14 14.7 13.2 15.8 12 16.2C10.8 15.8 10 14.7 10 13.5V10.2L12 9.2Z"/>
      </svg>
    </div>
    <div v-if="showText" class="flex flex-col">
      <div class="flex items-center gap-1.5">
        <span class="font-extrabold tracking-wider text-base text-slate-900 dark:text-white font-sans">PRIMEVUE</span>
        <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-mono">AURA</span>
      </div>
      <span class="text-[10px] text-slate-400 font-medium tracking-tight">DentaLab Enterprise</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  showText?: boolean;
}>(), {
  showText: true,
});
</script>
