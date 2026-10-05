<template>
  <div class="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-[#060911] text-slate-900 dark:text-white transition-colors">
    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden">
      <!-- Left Hero Pane -->
      <div class="p-8 sm:p-10 bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden">
        <div class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div>
          <!-- PrimeVue Logo & Title -->
          <div class="flex items-center gap-3">
            <PrimeLogo size="lg" />
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-base font-black tracking-tight">PrimeVue</span>
                <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">Aura v4</span>
              </div>
              <p class="text-xs text-slate-400">Dental Prosthetics Cloud</p>
            </div>
          </div>

          <div class="mt-12 space-y-4">
            <h2 class="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              Precision CAD/CAM Dental Lab OS
            </h2>
            <p class="text-xs text-slate-400 leading-relaxed">
              Designed strictly with PrimeVue 4 and the flagship Aura design system. Real-time odontogram telemetry, 7-stage manufacturing pipelines, and DICOM/STL integration.
            </p>

            <div class="space-y-2.5 pt-4 text-xs text-slate-300">
              <div class="flex items-center gap-2">
                <i class="pi pi-check text-indigo-400 text-xs" />
                <span>32-Tooth Interactive Universal Odontogram</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-check text-indigo-400 text-xs" />
                <span>High-density Aura DataTables with live filters</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-check text-indigo-400 text-xs" />
                <span>HIPAA & GDPR Compliant DICOM cloud repository</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800 mt-8 text-xs text-slate-500">
          Powered by PrimeVue v4.5 • Vite • Tailwind v4
        </div>
      </div>

      <!-- Right Form Pane -->
      <div class="p-8 sm:p-10 flex flex-col justify-between">
        <div>
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-black tracking-tight text-slate-900 dark:text-white">Welcome Back</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Sign in to access your laboratory workstation</p>
          </div>

          <!-- Quick Fill Demo Profiles -->
          <div class="mt-6">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Quick Sign In (Demo)</span>
            <div class="grid grid-cols-2 gap-2">
              <button
                type="button"
                @click="fillCredentials('chief')"
                class="px-2.5 py-2 rounded-xl text-left border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-xs transition cursor-pointer bg-slate-50/50 dark:bg-slate-900/50"
              >
                <span class="font-bold text-slate-800 dark:text-slate-200 block">Dr. Vance</span>
                <span class="text-[10px] text-slate-400">Chief Technologist</span>
              </button>

              <button
                type="button"
                @click="fillCredentials('doctor')"
                class="px-2.5 py-2 rounded-xl text-left border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-xs transition cursor-pointer bg-slate-50/50 dark:bg-slate-900/50"
              >
                <span class="font-bold text-slate-800 dark:text-slate-200 block">Dr. Mitchell</span>
                <span class="text-[10px] text-slate-400">Prescribing Clinician</span>
              </button>
            </div>
          </div>

          <!-- Form Inputs -->
          <form @submit.prevent="handleLogin" class="mt-6 space-y-4">
            <div>
              <label class="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
              <InputText
                v-model="email"
                type="email"
                required
                placeholder="clinician@dental-vue.com"
                class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" class="text-[11px] text-indigo-500 hover:underline">Forgot?</a>
              </div>
              <InputText
                v-model="password"
                type="password"
                required
                placeholder="••••••••••••"
                class="w-full !rounded-2xl !text-xs !bg-slate-50 dark:!bg-[#0c1220]"
              />
            </div>

            <div class="flex items-center justify-between pt-1">
              <div class="flex items-center gap-2">
                <ToggleSwitch v-model="rememberMe" />
                <span class="text-xs text-slate-600 dark:text-slate-400">Remember session</span>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-3 rounded-2xl text-xs font-extrabold text-white bg-black dark:bg-white dark:text-black shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              <i :class="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-arrow-right'" class="text-xs" />
              <span>{{ isLoading ? 'Authenticating...' : 'Sign In to Studio' }}</span>
            </button>
          </form>
        </div>

        <div class="pt-6 text-center text-xs text-slate-400">
          Need partner access? <a href="#" class="font-bold text-slate-900 dark:text-white underline">Register Clinic</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import { useToast } from 'primevue/usetoast';
import PrimeLogo from '@/components/ui/PrimeLogo.vue';

const router = useRouter();
const toast = useToast();

const email = ref('e.vance@dental-vue.com');
const password = ref('password123');
const rememberMe = ref(true);
const isLoading = ref(false);

const fillCredentials = (role: 'chief' | 'doctor') => {
  if (role === 'chief') {
    email.value = 'e.vance@dental-vue.com';
    password.value = 'primevue2026';
  } else {
    email.value = 's.mitchell@apexdental.com';
    password.value = 'doctor2026';
  }
};

const handleLogin = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    toast.add({
      severity: 'success',
      summary: 'Authenticated',
      detail: 'Welcome back to PrimeVue Dental Studio',
      life: 2500
    });
    router.push('/dashboard');
  }, 600);
};
</script>
