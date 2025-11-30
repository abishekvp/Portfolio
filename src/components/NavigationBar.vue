<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
    <div class="container">
      <div class="navbar-content">
        <div
          class="navbar-links"
          :class="{ 'navbar-links-open': mobileMenuOpen }" 
        >
          <a href="#home" @click="closeMobileMenu" :style="getMenuItemStyle(0)">Home</a>
          <a href="#about" @click="closeMobileMenu" :style="getMenuItemStyle(1)">About</a>
          <a href="#achievements" @click="closeMobileMenu" :style="getMenuItemStyle(2)">Achievements</a>
          <a href="#skills" @click="closeMobileMenu" :style="getMenuItemStyle(3)">Skills</a>
          <a href="#projects" @click="closeMobileMenu" :style="getMenuItemStyle(4)">Projects</a>
          <a href="#experience" @click="closeMobileMenu" :style="getMenuItemStyle(5)">Experience</a>
          <a href="#contact" @click="closeMobileMenu" :style="getMenuItemStyle(6)">Contact</a>
        </div>

        <a href="#home" class="navbar-logo">
              <span class="logo-text">
                <span class="logo-zoom">
                  <span class="logo-version logo-lowercase"><span class="logo-highlight">A</span>bi</span>
                  <span class="logo-version logo-uppercase"><span class="logo-highlight">A</span>BI</span>
                </span>
                <span class="logo-middle">
                  <span class="logo-version logo-shek">shek</span>
                  <span class="logo-version logo-raj">RAJ</span>
                </span>
                <span> </span><span class="logo-highlight">VP</span>
              </span>
            </a>

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
    getMenuItemStyle(index) {
      if (!this.mobileMenuOpen) return {};
      return {
        animationDelay: `${index * 0.1}s`
      };
    }
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
  font-size: 2rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.logo-text {
  color: var(--color-text-primary);
}

.logo-highlight {
  color: var(--color-accent-primary);
}

.logo-middle {
  display: inline-block;
  position: relative;
}

.logo-shek {
  opacity: 1;
}

.logo-raj {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.navbar-logo:hover .logo-shek {
  opacity: 0;
}

.navbar-logo:hover .logo-raj {
  opacity: 0.2;
}

.logo-zoom {
  display: inline-block;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.logo-version {
  transition: opacity 0.4s ease;
}

.logo-lowercase {
  opacity: 1;
}

.logo-uppercase {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.navbar-logo:hover .logo-zoom {
  transform: scale(1.3);
}

.navbar-logo:hover .logo-lowercase {
  opacity: 0;
}

.navbar-logo:hover .logo-uppercase {
  opacity: 1;
}

.navbar-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
  background: rgba(255, 250, 250, 0.03);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  /* border: 1px solid rgba(255, 250, 250, 0.1); */
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
    top: 80px;
    left: -100%;
    flex-direction: column;
    gap: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    padding: 2rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 250, 250, 0.1);
    transition: left 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    min-width: 250px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .navbar-links-open {
    left: 1rem;
  }

  .navbar-links a {
    width: 100%;
    text-align: left;
    padding: 1rem 1.5rem;
    margin: 0.5rem 0;
    background: rgba(255, 250, 250, 0.03);
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 250, 250, 0.05);
    transform: translateX(-50px) rotateY(-15deg);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .navbar-links-open a {
    animation: slideInFloat 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }

  @keyframes slideInFloat {
    0% {
      transform: translateX(-50px) translateZ(-100px) rotateY(-15deg);
      opacity: 0;
    }
    60% {
      transform: translateX(10px) translateZ(20px) rotateY(2deg);
    }
    100% {
      transform: translateX(0) translateZ(0) rotateY(0deg);
      opacity: 1;
    }
  }

  .navbar-links a:hover {
    transform: translateX(5px) translateZ(10px);
    background: rgba(255, 250, 250, 0.08);
    border-color: rgba(158, 42, 43, 0.3);
    box-shadow: 0 5px 15px rgba(158, 42, 43, 0.2);
  }
}
</style>
