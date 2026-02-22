<template>
  <div class="theme-switcher" v-click-outside="closeDropdown">
    <button 
      class="theme-toggle btn-glass" 
      @click="toggleDropdown"
      aria-label="Change Theme"
      :style="{ '--theme-shadow': currentThemeShadow }"
    >
      <div class="color-preview" :style="{ background: currentThemeColor }"></div>
      <span class="theme-name">{{ currentThemeLabel }}</span>
      <span class="chevron" :class="{ 'rotated': isOpen }">▼</span>
    </button>

    <div class="theme-dropdown glass-card" :class="{ 'open': isOpen }">
      <div 
        v-for="theme in themes" 
        :key="theme.id"
        class="theme-option"
        :class="{ 'active': currentTheme === theme.id }"
        @click="setTheme(theme.id)"
      >
        <div class="theme-color" :style="{ background: theme.color }"></div>
        <span class="theme-label">{{ theme.label }}</span>
        <span v-if="currentTheme === theme.id" class="check">✓</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      isOpen: false,
      currentTheme: 'neored',
      themes: [
        { id: 'neored', label: 'Neo Red', color: '#9e2a2b' },
        { id: 'snow', label: 'Snow', color: '#ffffff' },
        { id: 'ocean', label: 'Ocean', color: '#0ea5e9' },
        { id: 'emerald', label: 'Emerald', color: '#10b981' },
        { id: 'amethyst', label: 'Amethyst', color: '#8b5cf6' },
        { id: 'sunset', label: 'Sunset', color: '#f97316' },
        { id: 'silver', label: 'Silver', color: '#94a3b8' }
      ]
    };
  },
  computed: {
    currentThemeColor() {
      const theme = this.themes.find(t => t.id === this.currentTheme);
      return theme ? theme.color : '#9e2a2b';
    },
    currentThemeLabel() {
        const theme = this.themes.find(t => t.id === this.currentTheme);
        return theme ? theme.label : 'Theme';
    },
    currentThemeShadow() {
      const theme = this.themes.find((t) => t.id === this.currentTheme);
      const hex = theme ? theme.color : "#9e2a2b";
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, 0.6)`;
    },
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'ocean';
    this.setTheme(savedTheme);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    setTheme(themeId) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute('data-theme', themeId);
      localStorage.setItem('theme', themeId);
      this.isOpen = false;
    }
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  }
};
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1001;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  min-width: 160px;
  justify-content: space-between;
  border-radius: 50px;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-base);
}

.theme-toggle:hover {
  background: rgba(20, 20, 20, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--theme-shadow);
}

.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.theme-name {
  flex: 1;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 500;
}

.chevron {
  font-size: 0.7rem;
  transition: transform var(--transition-base);
  opacity: 0.7;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.theme-dropdown {
  position: absolute;
  bottom: 110%; /* Makes it appear above */
  left: 0;
  width: 200px;
  padding: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--transition-base);
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
}

.theme-dropdown.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
  color: var(--color-text-secondary);
}

.theme-option:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-primary);
}

.theme-option.active {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}

.theme-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.theme-label {
  flex: 1;
  font-size: 0.9rem;
}

.check {
  font-size: 0.8rem;
  color: var(--color-accent-primary);
}

@media (max-width: 768px) {
  .theme-switcher {
    bottom: 1.5rem;
    left: 1.5rem;
  }
}
</style>
