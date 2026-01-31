<template>
  <section id="home" class="hero-spotlight">
    <!-- Full Screen Blurred Background -->
    <div class="hero-full-bg">
      <img src="../../assets/img/abi.jpg" alt="Background" class="bg-image-blurred" />
      <div class="bg-overlay"></div>
    </div>

    <div class="container content-wrapper">
      <div class="hero-grid">
        <div class="hero-text">
          <h1 class="hero-title animate-fade-in-up">
            Senior Software Engineer
          </h1>
          <p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.2s">
            Platform Engineering • Security Integrations • Automation
          </p>
          <p class="hero-description animate-fade-in-up" style="animation-delay: 0.3s">
            I design and build secure platform systems, IAM workflows, DevOps automation modules, and enterprise identity integrations. Currently working at Securden, building SSPR platforms, secure credential automation pipelines, and cloud-based security integrations.
          </p>
          <p class="hero-tagline animate-fade-in-up" style="animation-delay: 0.35s">
            <strong>Secure • Integrate • Automate • Scale</strong>
          </p>
          <div class="hero-cta animate-fade-in-up" style="animation-delay: 0.4s">
            <a href="#experience" class="btn btn-primary">Work Experience</a>
            <a href="#contact" class="btn btn-glass">Get In Touch</a>
          </div>
        </div>

        <div class="hero-image-focal animate-fade-in" style="animation-delay: 0.5s">
          <div class="focal-image-container">
            <img src="../../assets/img/abi.jpg" alt="Abishek VP" class="focal-image" />
            <div class="focal-glow"></div>
          </div>
          <div class="hero-stats-glass glass-card">
            <div class="stat">
              <div class="stat-value gradient-text">4+</div>
              <div class="label">Years Exp</div>
            </div>
            <div class="stat">
              <div class="stat-value gradient-text">10+</div>
              <div class="label">Projects</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated background orbs from original for continuity -->
    <div class="hero-background-effects">
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSpotlight'
}
</script>

<style scoped>
.hero-spotlight {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: var(--spacing-3xl) 0;
}

/* Full Background Logic */
.hero-full-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-image-blurred {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(40px) brightness(0.4) saturate(1.2);
  transform: scale(1.1); /* Prevent white edges from blur */
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    var(--color-bg-primary) 80%
  );
  opacity: 0.8;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  margin-bottom: var(--spacing-xs);
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--color-accent-tertiary);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.hero-description {
  max-width: 600px;
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.hero-cta {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

/* Focal Image Styling */
.hero-image-focal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
}

.focal-image-container {
  position: relative;
  width: 380px;
  height: 500px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid var(--glass-border);
  transition: transform var(--transition-slow);
}

.focal-image-container:hover {
  transform: translateY(-10px) rotate(1deg);
}

.focal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.focal-image-container:hover .focal-image {
  transform: scale(1.05);
}

.focal-glow {
  position: absolute;
  top: -20%;
  right: -20%;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%);
  opacity: 0.15;
  filter: blur(50px);
  z-index: -1;
  pointer-events: none;
}

.hero-stats-glass {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  padding: var(--spacing-md) var(--spacing-xl);
  width: fit-content;
  backdrop-filter: blur(30px);
  border: 1px solid var(--glass-border-hover);
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-muted);
}

/* Background Effects */
.hero-background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
}

.hero-orb-1 {
  width: 600px;
  height: 600px;
  background: var(--color-accent-primary);
  top: -10%;
  right: -5%;
}

.hero-orb-2 {
  width: 400px;
  height: 400px;
  background: var(--color-accent-secondary);
  bottom: 0%;
  left: -5%;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    text-align: center;
  }
  
  .hero-text {
    align-items: center;
  }
  
  .hero-description {
    margin: 0 auto;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .focal-image-container {
    width: 320px;
    height: 420px;
  }
}

@media (max-width: 768px) {
  .hero-spotlight {
    padding-top: 100px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .focal-image-container {
    width: 280px;
    height: 360px;
  }
  
  .hero-stats-glass {
    padding: var(--spacing-sm) var(--spacing-lg);
  }
}
</style>
