<template>
  <aside class="sidenav-wrapper" :class="{ 'is-hovered': isHovered, 'menu-open': isThemeMenuOpen }">
    <!-- Desktop Vertical Side Dock that expands on hover -->
    <nav
      class="sidenav-dock glass"
      :class="{ 'has-menu-open': isThemeMenuOpen }"
      aria-label="Portfolio Navigation"
      @mouseenter="isHovered = true"
      @mouseleave="handleMouseLeave"
    >
      <!-- Brand / Logo indicator: 'A' badge in collapsed state, full 'Abishek VP' in expanded state -->
      <a href="#home" class="dock-brand" title="Abishek VP — Home" @click="handleNavClick('home')">
        <span class="brand-badge">A</span>
        <span class="dock-label brand-title">
          Abishek <span class="gradient-text">VP</span>
        </span>
      </a>

      <div class="dock-divider"></div>

      <!-- Navigation links -->
      <div class="dock-items">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="dock-item"
          :class="{ active: activeSection === item.id }"
          @click="handleNavClick(item.id)"
        >
          <span class="dock-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="item.iconPath" />
            </svg>
          </span>
          <span class="dock-label">{{ item.label }}</span>
        </a>
      </div>

      <div class="dock-divider"></div>

      <!-- Quick action controls -->
      <div class="dock-actions">
        <!-- Theme Switcher Option directly in Sidenav -->
        <div class="theme-menu-wrapper" ref="themeMenuWrapper">
          <button
            class="dock-action-btn theme-btn"
            :class="{ active: isThemeMenuOpen }"
            @click.stop="toggleThemeMenu"
            title="Switch Color Theme"
            aria-label="Switch Color Theme"
          >
            <span class="theme-preview-dot" :style="{ background: currentThemeColor }"></span>
            <span class="dock-label">
              Theme: {{ currentThemeLabel }}
            </span>
          </button>

          <!-- Theme Flyout Menu (opaque, never transparent on hover) -->
          <div v-if="isThemeMenuOpen" class="theme-flyout" @click.stop>
            <div class="theme-flyout-header font-mono">Select Theme</div>
            <div
              v-for="t in themes"
              :key="t.id"
              class="theme-option-row"
              :class="{ 'theme-active': currentTheme === t.id }"
              @click="setTheme(t.id)"
            >
              <span class="theme-color-bullet" :style="{ background: t.color }"></span>
              <span class="theme-title font-mono">{{ t.label }}</span>
              <span v-if="currentTheme === t.id" class="theme-check">✓</span>
            </div>
          </div>
        </div>

        <!-- Terminal Modal Trigger -->
        <button
          class="dock-action-btn terminal-btn"
          @click="handleActionClick(() => $emit('toggle-terminal'))"
          title="Open Developer Terminal (CLI)"
          aria-label="Open Developer Terminal"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span class="dock-label">Terminal CLI</span>
        </button>

        <!-- Resume Download with data-track="resume" for admin silent tracking -->
        <a
          href="/resume.pdf"
          download="Abishek_VP_Resume.pdf"
          data-track="resume"
          data-analytics="resume_download"
          class="dock-action-btn resume-btn"
          title="Download Resume (PDF)"
          aria-label="Download Resume"
          @click="handleActionClick()"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span class="dock-label">Download CV</span>
        </a>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SideNavBar',
  emits: ['toggle-terminal'],
  data() {
    return {
      activeSection: 'home',
      isHovered: false,
      isThemeMenuOpen: false,
      observer: null,
      currentTheme: 'ocean',
      themes: [
        { id: 'velvet', label: 'Velvet 3D', color: '#a855f7' },
        { id: 'terminal', label: 'Matrix CLI', color: '#10b981' },
        { id: 'ocean', label: 'Ocean', color: '#0ea5e9' },
        { id: 'emerald', label: 'Emerald', color: '#10b981' },
        { id: 'neored', label: 'Neo Red', color: '#9e2a2b' },
        { id: 'amethyst', label: 'Amethyst', color: '#8b5cf6' },
        { id: 'sunset', label: 'Sunset', color: '#f97316' },
        { id: 'snow', label: 'Snow', color: '#ffffff' },
        { id: 'silver', label: 'Silver', color: '#94a3b8' }
      ],
      navItems: [
        {
          id: 'home',
          label: 'Home',
          iconPath: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
        },
        {
          id: 'terminal-section',
          label: 'Terminal',
          iconPath: 'M4 17l6-6-6-6m8 14h8'
        },
        {
          id: 'about',
          label: 'About',
          iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
        },
        {
          id: 'achievements',
          label: 'Achievements',
          iconPath: 'M12 15l-2 5l4-2l4 2l-2-5 M12 3a6 6 0 0 0 0 12a6 6 0 0 0 0-12'
        },
        {
          id: 'skills',
          label: 'Skills',
          iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
        },
        {
          id: 'projects',
          label: 'Projects',
          iconPath: 'M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 2.5 1.55L16.5 14.6a1.78 1.78 0 0 0 0-3.2z'
        },
        {
          id: 'experience',
          label: 'Experience',
          iconPath: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'
        },
        {
          id: 'testimonials',
          label: 'Testimonials',
          iconPath: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'
        },
        {
          id: 'contact',
          label: 'Contact',
          iconPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'
        }
      ]
    };
  },
  computed: {
    currentThemeColor() {
      const t = this.themes.find(th => th.id === this.currentTheme);
      return t ? t.color : '#0ea5e9';
    },
    currentThemeLabel() {
      const t = this.themes.find(th => th.id === this.currentTheme);
      return t ? t.label : 'Ocean';
    }
  },
  mounted() {
    this.initScrollSpy();
    const savedTheme = localStorage.getItem('theme') || 'ocean';
    this.setTheme(savedTheme);
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('touchstart', this.handleDocumentClick, { passive: true });
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('touchstart', this.handleDocumentClick);
  },
  methods: {
    setActive(id) {
      this.activeSection = id;
    },
    handleNavClick(id) {
      this.setActive(id);
      this.isThemeMenuOpen = false;
      this.isHovered = false;
    },
    handleActionClick(callback) {
      this.isThemeMenuOpen = false;
      this.isHovered = false;
      if (typeof callback === 'function') {
        callback();
      }
    },
    handleMouseLeave(event) {
      if (this.isThemeMenuOpen) {
        if (event && event.relatedTarget && this.$el && this.$el.contains(event.relatedTarget)) {
          return;
        }
      }
      this.isHovered = false;
    },
    toggleThemeMenu() {
      this.isThemeMenuOpen = !this.isThemeMenuOpen;
      if (this.isThemeMenuOpen) {
        this.isHovered = true;
      }
    },
    handleDocumentClick(e) {
      // If clicking outside the theme flyout, close theme menu
      if (this.isThemeMenuOpen && this.$refs.themeMenuWrapper && !this.$refs.themeMenuWrapper.contains(e.target)) {
        this.isThemeMenuOpen = false;
      }
      // If clicking anywhere outside the sidenav dock, close both theme selector and navbar dock
      if (this.$el && !this.$el.contains(e.target)) {
        this.isThemeMenuOpen = false;
        this.isHovered = false;
      }
    },
    setTheme(themeId) {
      this.currentTheme = themeId;
      document.documentElement.setAttribute('data-theme', themeId);
      localStorage.setItem('theme', themeId);
      this.isThemeMenuOpen = false;
      this.isHovered = false;
    },
    initScrollSpy() {
      const sectionIds = this.navItems.map(item => item.id);
      const elements = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

      if (elements.length === 0) return;

      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.activeSection = entry.target.id;
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0
        }
      );

      elements.forEach(el => this.observer.observe(el));
    }
  }
};
</script>

<style scoped>
.font-mono {
  font-family: var(--font-mono);
}

.sidenav-wrapper {
  position: fixed;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1100;
}

.sidenav-dock {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.85rem 0.6rem;
  width: 62px;
  border-radius: var(--radius-xl);
  background: rgba(10, 15, 28, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: width 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, background 0.28s ease;
  overflow: visible;
}

/* Expanded state on hover or when theme menu is open */
.sidenav-dock:hover,
.sidenav-wrapper.is-hovered .sidenav-dock,
.sidenav-dock.has-menu-open {
  width: 220px;
  background: rgba(10, 15, 28, 0.92);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px var(--color-glow-1);
}

/* Brand Section: 'A' badge + full unfragmented name 'Abishek VP' in separate text format */
.dock-brand {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  height: 40px;
  padding: 0 0.5rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.dock-brand:hover {
  background: rgba(255, 255, 255, 0.08);
}

.brand-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: #ffffff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.05rem;
  line-height: 1;
  box-shadow: 0 0 14px var(--color-glow-1);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  flex-shrink: 0;
}

.dock-brand:hover .brand-badge {
  transform: scale(1.08);
  box-shadow: 0 0 20px var(--color-glow-1);
}

.brand-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.4px;
  line-height: 1;
  white-space: nowrap;
}

.dock-divider {
  width: calc(100% - 8px);
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.2rem 4px;
}

/* Items */
.dock-items {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.dock-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  height: 40px;
  padding: 0 0.5rem;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.dock-item:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.08);
}

.dock-item.active {
  color: var(--color-accent-primary);
  background: rgba(var(--accent-rgb, 14, 165, 233), 0.15);
  box-shadow: 0 0 12px var(--color-glow-1);
}

.dock-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  flex-shrink: 0;
}

/* Navbar names: smoothly expand and fade in whenever navbar expands */
.dock-label {
  font-family: var(--font-display, inherit);
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  white-space: nowrap;
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  pointer-events: none;
  transform: translateX(-6px);
  transition: opacity 0.22s ease 0.05s, max-width 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease;
}

.sidenav-dock:hover .dock-label,
.sidenav-wrapper.is-hovered .dock-label,
.sidenav-dock.has-menu-open .dock-label {
  opacity: 1;
  max-width: 170px;
  pointer-events: auto;
  transform: translateX(0);
}

/* Actions Section */
.dock-actions {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
}

.dock-action-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  height: 38px;
  padding: 0 0.5rem;
  border-radius: var(--radius-md);
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.dock-action-btn:hover {
  color: var(--color-accent-primary);
  background: rgba(255, 255, 255, 0.08);
}

.dock-action-btn.theme-btn:hover,
.dock-action-btn.theme-btn.active {
  background: rgba(255, 255, 255, 0.14) !important;
  color: var(--color-accent-primary);
}

.theme-preview-dot {
  width: 18px;
  height: 18px;
  min-width: 18px;
  margin: 0 7px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 8px currentColor;
}

.theme-menu-wrapper {
  position: relative;
  width: 100%;
}

/* Theme Flyout: anchored towards bottom, capped with scrollbar so it never overflows off page */
.theme-flyout {
  position: absolute;
  left: calc(100% + 12px);
  bottom: -20px;
  width: 200px;
  max-height: min(390px, calc(100vh - 120px));
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.65rem 0.5rem;
  background: #080d1a !important; /* Fully opaque dark background, never transparent on hover */
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.9), 0 0 25px rgba(0, 0, 0, 0.7);
  z-index: 1200;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
}

.theme-flyout:hover {
  background: #080d1a !important; /* Maintain 100% opacity on hover */
}

/* Seamless mouse bridge between dock and flyout */
.theme-flyout::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 0;
  bottom: 0;
  width: 12px;
}

.theme-flyout::-webkit-scrollbar {
  width: 4px;
}

.theme-flyout::-webkit-scrollbar-track {
  background: transparent;
}

.theme-flyout::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
}

.theme-flyout::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent-primary);
}

.theme-flyout-header {
  position: sticky;
  top: 0;
  background: #080d1a;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.75px;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.4rem 0.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
}

.theme-option-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  flex-shrink: 0;
  background: #0d1527; /* Solid base row background */
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.theme-option-row:hover {
  background: #1e293b !important; /* Fully opaque, crisp high-contrast hover state */
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(2px);
}

.theme-option-row.theme-active {
  background: #1e293b;
  border-color: var(--color-accent-primary);
  box-shadow: inset 0 0 0 1px var(--color-accent-primary);
}

.theme-color-bullet {
  width: 12px;
  height: 12px;
  min-width: 12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.theme-title {
  font-size: 0.82rem;
  color: var(--color-text-primary);
  flex: 1;
  white-space: nowrap;
}

.theme-check {
  font-size: 0.8rem;
  color: #10b981;
}

/* Mobile Responsive Bottom Dock */
@media (max-width: 768px) {
  .sidenav-wrapper {
    left: 50%;
    bottom: 1.25rem;
    top: auto;
    transform: translateX(-50%);
    width: auto;
    max-width: 95vw;
  }

  .sidenav-dock {
    flex-direction: row;
    width: auto !important;
    padding: 0.5rem 0.85rem;
    gap: 0.4rem;
    border-radius: 9999px;
  }

  .dock-brand,
  .dock-divider,
  .dock-label {
    display: none !important;
  }

  .dock-items {
    flex-direction: row;
    gap: 0.2rem;
    width: auto;
  }

  .dock-item,
  .dock-action-btn {
    width: 36px;
    height: 36px;
    padding: 0;
    justify-content: center;
  }

  .theme-flyout {
    left: auto;
    right: 0;
    top: auto;
    bottom: calc(100% + 12px);
    width: 185px;
    max-height: 55vh;
  }
}
</style>
