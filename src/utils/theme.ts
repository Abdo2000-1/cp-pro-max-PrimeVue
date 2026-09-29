export interface CustomThemeConfig {
  mode: 'dark' | 'light';
  appBgColor: string;
  cardBgColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  primaryColor: string;
  isCustom: boolean;
}

export const STANDARD_LIGHT_CONFIG: CustomThemeConfig = {
  mode: 'light',
  appBgColor: '#f8fafc',
  cardBgColor: '#ffffff',
  buttonBgColor: '#090e18',
  buttonTextColor: '#ffffff',
  primaryColor: '#10b981',
  isCustom: false
};

export const STANDARD_DARK_CONFIG: CustomThemeConfig = {
  mode: 'dark',
  appBgColor: '#060911',
  cardBgColor: '#090e18',
  buttonBgColor: '#ffffff',
  buttonTextColor: '#000000',
  primaryColor: '#10b981',
  isCustom: false
};

export const THEME_PRESETS: { id: string; name: string; mode: 'dark' | 'light'; config: CustomThemeConfig }[] = [
  {
    id: 'aura-light',
    name: 'Aura Light (Official Default Clean)',
    mode: 'light',
    config: {
      mode: 'light',
      appBgColor: '#f8fafc',
      cardBgColor: '#ffffff',
      buttonBgColor: '#090e18',
      buttonTextColor: '#ffffff',
      primaryColor: '#10b981',
      isCustom: false
    }
  },
  {
    id: 'aura-dark',
    name: 'Aura Dark (Official Flagship)',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#060911',
      cardBgColor: '#090e18',
      buttonBgColor: '#ffffff',
      buttonTextColor: '#000000',
      primaryColor: '#10b981',
      isCustom: false
    }
  },
  {
    id: 'emerald-cyber',
    name: 'Cyber Dental (Emerald & Obsidian)',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#02150f',
      cardBgColor: '#04271c',
      buttonBgColor: '#10b981',
      buttonTextColor: '#ffffff',
      primaryColor: '#10b981',
      isCustom: true
    }
  },
  {
    id: 'indigo-studio',
    name: 'Indigo Prosthetic Studio',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#080c1d',
      cardBgColor: '#0e1633',
      buttonBgColor: '#6366f1',
      buttonTextColor: '#ffffff',
      primaryColor: '#6366f1',
      isCustom: true
    }
  },
  {
    id: 'royal-violet',
    name: 'Royal CAD/CAM Violet',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#0f081c',
      cardBgColor: '#1c0f33',
      buttonBgColor: '#8b5cf6',
      buttonTextColor: '#ffffff',
      primaryColor: '#8b5cf6',
      isCustom: true
    }
  },
  {
    id: 'crimson-ruby',
    name: 'Crimson Contrast',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#18040a',
      cardBgColor: '#2b0813',
      buttonBgColor: '#f43f5e',
      buttonTextColor: '#ffffff',
      primaryColor: '#f43f5e',
      isCustom: true
    }
  },
  {
    id: 'ocean-cyan',
    name: 'Nordic Ocean (Deep Cyan)',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#04131a',
      cardBgColor: '#082330',
      buttonBgColor: '#06b6d4',
      buttonTextColor: '#ffffff',
      primaryColor: '#06b6d4',
      isCustom: true
    }
  },
  {
    id: 'pitch-noir',
    name: 'Pitch Black (OLED True Black)',
    mode: 'dark',
    config: {
      mode: 'dark',
      appBgColor: '#000000',
      cardBgColor: '#0a0a0a',
      buttonBgColor: '#ffffff',
      buttonTextColor: '#000000',
      primaryColor: '#ffffff',
      isCustom: true
    }
  }
];

const STORAGE_KEY = 'dentalab_custom_theme_v2';

export const getSavedThemeConfig = (): CustomThemeConfig => {
  try {
    const themeMode = localStorage.getItem('dentalab-vue-theme');
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // If user specifically asked for theme mode
      if (themeMode === 'light') {
        if (parsed.mode === 'dark') return STANDARD_LIGHT_CONFIG;
      } else if (themeMode === 'dark') {
        if (parsed.mode === 'light') return STANDARD_DARK_CONFIG;
      }
      return parsed;
    }
    if (themeMode === 'dark') return STANDARD_DARK_CONFIG;
  } catch (e) {
    console.error('Error loading custom theme:', e);
  }
  // Clinical Clean Light Mode is default
  return STANDARD_LIGHT_CONFIG;
};

export const applyThemeConfig = (config: CustomThemeConfig) => {
  const root = document.documentElement;

  // 1. Dark/Light mode class and attributes
  if (config.mode === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('dentalab-vue-theme', 'dark');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('dentalab-vue-theme', 'light');
  }

  // 2. Custom theme active marker
  if (config.isCustom) {
    root.setAttribute('data-custom-theme', 'true');
  } else {
    root.removeAttribute('data-custom-theme');
  }

  // 3. CSS variables for app canvas, cards, and buttons
  root.style.setProperty('--theme-app-bg', config.appBgColor);
  root.style.setProperty('--theme-card-bg', config.cardBgColor);
  root.style.setProperty('--theme-btn-bg', config.buttonBgColor);
  root.style.setProperty('--theme-btn-text', config.buttonTextColor);
  root.style.setProperty('--theme-primary', config.primaryColor);

  // PrimeVue primary override
  root.style.setProperty('--p-primary-500', config.primaryColor);

  // 4. Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving custom theme:', e);
  }
};

/**
 * Toggle between standard clean Light Mode (default) and standard complete Dark Mode.
 * Returns true if new state is dark, false if light.
 */
export const toggleThemeMode = (): boolean => {
  const root = document.documentElement;
  const isCurrentlyDark = root.classList.contains('dark');
  const targetConfig = isCurrentlyDark ? STANDARD_LIGHT_CONFIG : STANDARD_DARK_CONFIG;
  applyThemeConfig(targetConfig);
  return !isCurrentlyDark;
};

/**
 * Initialize theme on app boot.
 */
export const initTheme = () => {
  const config = getSavedThemeConfig();
  applyThemeConfig(config);
};
