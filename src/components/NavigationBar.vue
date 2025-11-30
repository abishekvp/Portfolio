<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
    <div class="container">
      <div class="navbar-content">
        <a href="#home" class="navbar-logo">
          <span class="gradient-text">Abishek VP</span>
        </a>

        <div
          class="navbar-links"
          :class="{ 'navbar-links-open': mobileMenuOpen }"
        >
          <a href="#home" @click="closeMobileMenu">Home</a>
          <a href="#about" @click="closeMobileMenu">About</a>
          <a href="#achievements" @click="closeMobileMenu">Achievements</a>
          <a href="#skills" @click="closeMobileMenu">Skills</a>
          <a href="#projects" @click="closeMobileMenu">Projects</a>
          <a href="#experience" @click="closeMobileMenu">Experience</a>
          <a href="#contact" @click="closeMobileMenu">Contact</a>
        </div>

        <button
          class="navbar-toggle"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      scrolled: false,
      mobileMenuOpen: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all var(--transition-base);
}

.navbar-scrolled {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 250, 250, 0.1);
  padding: 1rem 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.navbar-links a {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  transition: color var(--transition-base);
}

.navbar-links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-accent);
  transition: width var(--transition-base);
}

.navbar-links a:hover {
  color: var(--color-text-primary);
}

.navbar-links a:hover::after {
  width: 100%;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.navbar-toggle span {
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  transition: all var(--transition-base);
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }

  .navbar-links {
    position: fixed;
    top: 70px;
    right: -100%;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    padding: 2rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 250, 250, 0.1);
    transition: right var(--transition-base);
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  .navbar-links-open {
    right: 1rem;
  }

  .navbar-links a {
    width: 100%;
    text-align: center;
  }
}
</style>
