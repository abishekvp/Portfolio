<template>
  <div id="app" class="app">
    <!-- Three.js 3D Velvet Background Animation on Scroll -->
    <Background3D />

    <!-- Top Right Brand Bar (Replacing Top Navbar, title to full right) -->
    <header class="top-brand-bar">
      <a href="#home" class="brand-logo-link">
        <span class="pulse-dot"></span>
        <span class="brand-title-text font-mono">
          <span class="terminal-prompt">$</span> Abishek.<span class="gradient-text">VP</span>
        </span>
      </a>
    </header>

    <!-- Expandable Pulse Side Nav Dock (pulse-template style) with Theme Picker -->
    <SideNavBar @toggle-terminal="toggleTerminalModal" />

    <!-- Main Content Stream (Allocated space on desktop to avoid hiding content) -->
    <main class="main-content">
      <HeroSection />
      <TerminalSection />
      <AboutSection />
      <AchievementsSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </main>

    <!-- Floating Global Terminal Modal (summonable via dock or shortcut) -->
    <div v-if="isTerminalModalOpen" class="terminal-modal-overlay" @click.self="isTerminalModalOpen = false">
      <div class="terminal-modal-wrapper">
        <div class="modal-control-bar">
          <span class="hint-text font-mono">Press ESC or click outside to dismiss</span>
          <button class="modal-close" @click="isTerminalModalOpen = false">&times;</button>
        </div>
        <InteractiveTerminal :is-modal="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Background3D from "./components/Background3D.vue";
import SideNavBar from "./components/SideNavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import TerminalSection from "./components/TerminalSection.vue";
import AboutSection from "./components/AboutSection.vue";
import AchievementsSection from "./components/AchievementsSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import InteractiveTerminal from "./components/InteractiveTerminal.vue";
import { portfolioService } from "./services/portfolioService";

export default {
  name: "App",
  components: {
    Background3D,
    SideNavBar,
    HeroSection,
    TerminalSection,
    AboutSection,
    AchievementsSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    TestimonialsSection,
    ContactSection,
    InteractiveTerminal,
  },
  data() {
    return {
      isTerminalModalOpen: false,
    };
  },
  mounted() {
    // Initialize live portfolio data from admin.abishek.in / portfolio_manager.js
    portfolioService.init();

    // Global keyboard shortcut to open terminal (Ctrl + ~ or `)
    window.addEventListener("keydown", this.handleGlobalKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleGlobalKeyDown);
  },
  methods: {
    toggleTerminalModal() {
      this.isTerminalModalOpen = !this.isTerminalModalOpen;
    },
    handleGlobalKeyDown(e) {
      if (e.key === "Escape" && this.isTerminalModalOpen) {
        this.isTerminalModalOpen = false;
      }
      if (e.ctrlKey && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        this.toggleTerminalModal();
      }
    },
  },
};
</script>

<style scoped>
.font-mono {
  font-family: var(--font-mono);
}

.app {
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
  overflow-x: hidden;
}

/* Top Right Brand Header */
.top-brand-bar {
  position: fixed;
  top: 1.25rem;
  right: 2rem;
  z-index: 1000;
}

.brand-logo-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1.1rem;
  border-radius: 9999px;
  background: rgba(10, 15, 28, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: all var(--transition-fast);
}

.brand-logo-link:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.6), 0 0 15px var(--color-glow-1);
}

.brand-title-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.terminal-prompt {
  color: #10b981;
}

/* Main Content Layout with Space Allocated for Sidenavbar */
.main-content {
  position: relative;
  z-index: 1;
  transition: padding 0.3s ease;
}

@media (min-width: 769px) {
  .main-content {
    padding-left: 92px;
    padding-right: 1.5rem;
  }
}

@media (max-width: 768px) {
  .top-brand-bar {
    right: 1rem;
    top: 1rem;
  }
  
  .main-content {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 5.5rem; /* Room for bottom dock */
  }
}

/* Modal Overlay */
.terminal-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 2500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.terminal-modal-wrapper {
  width: 100%;
  max-width: 960px;
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalPop {
  0% {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
}

.hint-text {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.modal-close {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.modal-close:hover {
  color: #ffffff;
}
</style>
