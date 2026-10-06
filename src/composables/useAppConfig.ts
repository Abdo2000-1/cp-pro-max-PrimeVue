import { ref } from 'vue';
import {
  type AppConfiguration,
  DEFAULT_APP_CONFIG,
  loadAppConfig,
  saveAppConfig,
  resetAppConfig
} from '@/config/appConfig';

const config = ref<AppConfiguration>(loadAppConfig());

if (typeof window !== 'undefined') {
  window.addEventListener('app-config-updated', (e: any) => {
    if (e.detail) {
      config.value = e.detail;
    }
  });
}

export function useAppConfig() {
  const updateConfig = (updater: (prev: AppConfiguration) => AppConfiguration) => {
    const next = updater(config.value);
    config.value = next;
    saveAppConfig(next);
  };

  const setConfig = (newConfig: AppConfiguration) => {
    config.value = newConfig;
    saveAppConfig(newConfig);
  };

  const reset = () => {
    const fresh = resetAppConfig();
    config.value = fresh;
  };

  return {
    config,
    updateConfig,
    saveConfig: setConfig,
    resetConfig: reset
  };
}
