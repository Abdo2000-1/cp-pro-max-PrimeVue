<template>
  <div class="space-y-6 w-full min-w-0">
    <!-- Header (Matching Image 3) -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Cards
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          You can make cards using Aura like below
        </p>
      </div>

      <button
        type="button"
        @click="addNewCard"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all cursor-pointer active:scale-95"
      >
        <i class="pi pi-plus text-xs" />
        <span>New Card</span>
      </button>
    </div>

    <!-- Cards Grid (Matching Image 3) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      
      <!-- ========================================================================= -->
      <!-- CARD 1: JACOB JONES USER PROFILE CARD                                     -->
      <!-- ========================================================================= -->
      <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <!-- Top Row -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="relative">
                <Avatar
                  image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                  shape="circle"
                  size="large"
                />
                <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
              </div>
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">Jacob Jones</h3>
                <p class="text-xs text-slate-400">hi@jacobjones.co</p>
              </div>
            </div>
            <button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <i class="pi pi-ellipsis-h text-sm" />
            </button>
          </div>

          <!-- Stats Box -->
          <div class="grid grid-cols-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 mb-4 text-center">
            <div class="border-r border-slate-200/60 dark:border-slate-800">
              <div class="font-extrabold text-base text-slate-900 dark:text-white">14.2k</div>
              <div class="text-[11px] text-slate-400">Followers</div>
            </div>
            <div>
              <div class="font-extrabold text-base text-slate-900 dark:text-white">359</div>
              <div class="text-[11px] text-slate-400">Following</div>
            </div>
          </div>

          <!-- Bio -->
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Meet Jacob Jones, the whimsical adventurer on a quest for life's quirks. From sock mysteries to subway adventures, join him for a laughter-filled journey!
          </p>

          <!-- Mutual Friends -->
          <div class="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800/80 mb-4">
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">Mutual friends</span>
            <AvatarGroup>
              <Avatar image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" shape="circle" size="small" />
              <Avatar image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" shape="circle" size="small" />
              <Avatar image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" shape="circle" size="small" />
              <Avatar label="+99" shape="circle" size="small" class="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold" />
            </AvatarGroup>
          </div>

          <!-- Joined / Hosted Pill Selector -->
          <div class="p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl flex gap-1 mb-4 select-none">
            <button
              type="button"
              @click="tabProfile = 'joined'"
              :class="[
                'flex-1 py-1.5 text-xs font-bold rounded-xl transition-all',
                tabProfile === 'joined' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              ]"
            >
              Joined
            </button>
            <button
              type="button"
              @click="tabProfile = 'hosted'"
              :class="[
                'flex-1 py-1.5 text-xs font-bold rounded-xl transition-all',
                tabProfile === 'hosted' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              ]"
            >
              Hosted
            </button>
          </div>

          <!-- Friends Mini-List with Join Button -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <Avatar image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" shape="circle" />
                <div>
                  <div class="font-bold text-xs text-slate-900 dark:text-white">Jacob Jones</div>
                  <div class="text-[10px] text-slate-400">hi@jacobjones.co</div>
                </div>
              </div>
              <button class="px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:opacity-90">
                Join
              </button>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <Avatar image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" shape="circle" />
                <div>
                  <div class="font-bold text-xs text-slate-900 dark:text-white">Courtney Henry</div>
                  <div class="text-[10px] text-slate-400">cou.henry41@courtney.co</div>
                </div>
              </div>
              <button class="px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:opacity-90">
                Join
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <button
          type="button"
          class="w-full mt-2 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-center gap-1.5 transition-colors"
        >
          <i class="pi pi-envelope text-xs" />
          <span>Messages</span>
        </button>
      </div>

      <!-- ========================================================================= -->
      <!-- CARD 2: UPLOAD FILES & METADATA CARD                                      -->
      <!-- ========================================================================= -->
      <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i class="pi pi-cloud-upload text-sm text-slate-600 dark:text-slate-300" />
            <h3 class="font-extrabold text-sm text-slate-900 dark:text-white">Upload Files</h3>
          </div>
          <button type="button" class="text-slate-400 hover:text-slate-600">
            <i class="pi pi-times text-xs" />
          </button>
        </div>

        <!-- Document Name -->
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Document Name</label>
          <InputText v-model="documentName" class="w-full text-xs !rounded-2xl" placeholder="Aura Theme" />
        </div>

        <!-- Drag & Drop Dropzone -->
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Upload Files</label>
          <div
            @click="triggerUpload"
            class="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-emerald-500 rounded-3xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-900/30"
          >
            <div class="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-600 dark:text-slate-300 shadow-2xs">
              <i class="pi pi-cloud-upload text-lg text-emerald-500" />
            </div>
            <div class="text-xs font-bold text-slate-800 dark:text-slate-200">
              Click to upload <span class="font-normal text-slate-400">or drop files</span>
            </div>
            <div class="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto">
              PDF, JPG, PNG, JPEG, DOC, CSV, XML, XMLX, XLS, XLSX (max 10MB)
            </div>
          </div>
        </div>

        <!-- Tag (Optional) Chips -->
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tag (Optional)</label>
          <div class="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-11">
            <Chip
              v-for="(tag, idx) in tags"
              :key="idx"
              :label="tag"
              removable
              @remove="tags.splice(idx, 1)"
              class="text-xs font-semibold !rounded-xl"
            />
            <input
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              placeholder="+ add tag..."
              class="text-xs bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 px-2 py-0.5"
            />
          </div>
        </div>

        <!-- Visibility Radio Selector -->
        <div class="flex items-center gap-6 pt-1 text-xs">
          <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            <input type="radio" v-model="visibility" value="everyone" class="accent-emerald-500" />
            <i class="pi pi-globe text-xs text-slate-400" />
            <span>Everyone</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-700 dark:text-slate-300">
            <input type="radio" v-model="visibility" value="admins" class="accent-emerald-500" />
            <i class="pi pi-users text-xs text-slate-400" />
            <span>Admins only</span>
          </label>
        </div>

        <!-- Buttons -->
        <div class="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            class="py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="submitUpload"
            class="py-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
          >
            Upload
          </button>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- CARD 3: USER PROFILES & SYSTEM CONTROLS (Right Column Top)                -->
      <!-- ========================================================================= -->
      <div class="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#090e18] border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <h3 class="font-extrabold text-sm text-slate-900 dark:text-white">User Profiles</h3>

        <!-- Pill Status Selector -->
        <div class="p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl flex gap-1 select-none">
          <button
            type="button"
            @click="statusPill = 'chilling'"
            :class="[
              'flex-1 py-1.5 text-xs font-bold rounded-xl transition-all',
              statusPill === 'chilling' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            ]"
          >
            Chilling
          </button>
          <button
            type="button"
            @click="statusPill = 'dnd'"
            :class="[
              'flex-1 py-1.5 text-xs font-bold rounded-xl transition-all',
              statusPill === 'dnd' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            ]"
          >
            Do Not Disturb
          </button>
        </div>

        <!-- Controls with PrimeVue ToggleSwitch -->
        <div class="space-y-3.5 pt-1 text-xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
              <i class="pi pi-volume-up text-xs text-slate-400" />
              <span>Sound</span>
            </div>
            <ToggleSwitch v-model="ctrlSound" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
              <i class="pi pi-wifi text-xs text-slate-400" />
              <span>Wi-Fi</span>
            </div>
            <ToggleSwitch v-model="ctrlWifi" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
              <i class="pi pi-moon text-xs text-slate-400" />
              <span>Dark Mode</span>
            </div>
            <ToggleSwitch v-model="ctrlDarkMode" @change="toggleTheme" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
              <i class="pi pi-map-marker text-xs text-slate-400" />
              <span>Location Services</span>
            </div>
            <ToggleSwitch v-model="ctrlLocation" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
              <i class="pi pi-shield text-xs text-slate-400" />
              <span>Privacy Settings</span>
            </div>
            <ToggleSwitch v-model="ctrlPrivacy" />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
              <i class="pi pi-sync text-xs text-slate-400" />
              <span>Auto Update</span>
            </div>
            <ToggleSwitch v-model="ctrlAutoUpdate" />
          </div>
        </div>

        <!-- ========================================================================= -->
        <!-- CARD 4: FORGOT PASSWORD & OTP (Embedded right below in col 3)            -->
        <!-- ========================================================================= -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center space-y-3">
          <h4 class="font-extrabold text-sm text-slate-900 dark:text-white">Forgot Password</h4>
          <p class="text-[11px] text-slate-400">Verification code sent to email</p>
          <div class="inline-block px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
            u*******m@gmail.com
          </div>

          <div class="text-[11px] text-slate-500 dark:text-slate-400">
            Didn't receive? <button class="font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">Resend</button>
          </div>

          <!-- PrimeVue InputOtp component -->
          <div class="flex justify-center my-2">
            <InputOtp v-model="otpCode" :length="6" class="gap-1.5" />
          </div>

          <button
            type="button"
            @click="submitOtp"
            class="w-full py-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
          >
            Change password
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import InputText from 'primevue/inputtext';
import Chip from 'primevue/chip';
import ToggleSwitch from 'primevue/toggleswitch';
import InputOtp from 'primevue/inputotp';
import { sound } from '@/utils/sound';

const tabProfile = ref<'joined' | 'hosted'>('joined');
const documentName = ref('Aura Theme');
const tags = ref(['ui', 'redesign', 'dashboard']);
const newTag = ref('');
const visibility = ref('everyone');

const statusPill = ref('chilling');
const ctrlSound = ref(true);
const ctrlWifi = ref(true);
const ctrlDarkMode = ref(document.documentElement.classList.contains('dark'));
const ctrlLocation = ref(false);
const ctrlPrivacy = ref(true);
const ctrlAutoUpdate = ref(false);

const otpCode = ref('023841');

const addTag = () => {
  if (newTag.value.trim()) {
    tags.value.push(newTag.value.trim());
    newTag.value = '';
    sound.playClick();
  }
};

const triggerUpload = () => {
  sound.playClick();
  alert('Simulating PrimeVue Aura File dropzone upload.');
};

const submitUpload = () => {
  sound.playSuccess();
  alert(`Uploaded document "${documentName.value}" with tags: [${tags.value.join(', ')}]`);
};

const submitOtp = () => {
  sound.playSuccess();
  alert(`Verification successful for OTP: ${otpCode.value}`);
};

const addNewCard = () => {
  sound.playPop();
  alert('Opening PrimeVue Card Template Wizard.');
};

const toggleTheme = () => {
  if (ctrlDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
</script>
