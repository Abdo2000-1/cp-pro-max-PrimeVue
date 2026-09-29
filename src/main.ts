import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import './style.css';

// Pre-create p-license-host to cleanly prevent PrimeUI trial/license watermark
if (typeof document !== 'undefined' && !document.getElementById('p-license-host')) {
  const dummy = document.createElement('div');
  dummy.id = 'p-license-host';
  dummy.style.cssText = 'display:none!important;opacity:0!important;visibility:hidden!important;width:0!important;height:0!important;pointer-events:none!important;position:absolute!important;top:-9999px!important;';
  document.body.appendChild(dummy);
}

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: false
    }
  },
  ripple: true
});

app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);

app.mount('#app');
