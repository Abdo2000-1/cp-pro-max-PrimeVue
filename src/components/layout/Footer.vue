<template>
  <footer class="w-full bg-white/95 dark:bg-[#070b14]/95 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto py-5 px-4 sm:px-6 lg:px-8 text-xs select-none">
    <div class="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Brand, Logo & Versioning -->
      <div class="flex flex-wrap items-center gap-3">
        <router-link to="/dashboard" class="flex items-center gap-2 group">
          <div class="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-xs">
            <Layers class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span class="font-extrabold text-slate-900 dark:text-white tracking-tight">
            {{ config.branding.appName }}
          </span>
        </router-link>

        <span class="px-2 py-0.5 rounded-full font-mono font-bold text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {{ config.branding.version }} ({{ config.branding.buildNumber }})
        </span>

        <span class="text-slate-400 text-[11px] hidden sm:inline">
          © {{ currentYear }} {{ config.branding.copyrightHolder }}
        </span>
      </div>

      <!-- Real Links & Support Section -->
      <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
        <router-link
          to="/cms"
          class="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold hover:underline border border-emerald-200 dark:border-emerald-800"
          title="Open Configuration CMS Engine"
        >
          <Sliders class="w-3 h-3" />
          <span>Admin CMS</span>
        </router-link>

        <a
          :href="`mailto:${config.links.supportEmail}`"
          class="hover:text-emerald-600 transition-colors flex items-center gap-1"
          title="Email 3DDX Technical Support"
        >
          <LifeBuoy class="w-3 h-3" />
          <span>Support</span>
        </a>

        <a
          :href="config.links.documentationUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-emerald-600 transition-colors flex items-center gap-1"
        >
          <FileText class="w-3 h-3" />
          <span>Docs</span>
          <ExternalLink class="w-2.5 h-2.5 opacity-60" />
        </a>

        <a
          :href="config.links.statusPageUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-emerald-600 transition-colors flex items-center gap-1"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status</span>
        </a>

        <a
          :href="config.links.privacyPolicyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-emerald-600 transition-colors"
        >
          Privacy
        </a>

        <a
          :href="config.links.termsOfServiceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-emerald-600 transition-colors"
        >
          Terms
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Layers, LifeBuoy, FileText, ExternalLink, Sliders } from 'lucide-vue-next';
import { useAppConfig } from '@/composables/useAppConfig';

const { config } = useAppConfig();
const currentYear = computed(() => new Date().getFullYear());
</script>
