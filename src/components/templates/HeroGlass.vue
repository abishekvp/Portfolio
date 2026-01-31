<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
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
        
        <div class="hero-image-section">
          <div class="hero-image-container animate-fade-in" style="animation-delay: 0.45s">
            <div class="hero-image-glow"></div>
            <div class="hero-image-wrapper">
              <img src="../../assets/img/abi.jpg" alt="Abishek VP" class="profile-image" />
              <div class="image-overlay"></div>
            </div>
          </div>

          <div class="hero-card glass-card animate-fade-in" style="animation-delay: 0.6s">
            <div class="hero-stats">
              <div class="stat">
                <div class="stat-value gradient-text">4+</div>
                <div class="stat-label">Years Experience</div>
              </div>
              <div class="stat">
                <div class="stat-value gradient-text">10+</div>
                <div class="stat-label">Production Projects</div>
              </div>
              <div class="stat">
                <div class="stat-value gradient-text">5</div>
                <div class="stat-label">DevOps Tools Integrated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="hero-background">
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroGlass'
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: var(--spacing-3xl) 0;
  overflow: hidden;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.hero-title {
  opacity: 0;
  margin-bottom: var(--spacing-sm);
}

.hero-subtitle {
  font-size: 1.75rem;
  color: var(--color-text-secondary);
  font-weight: 600;
  opacity: 0;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 550px;
  line-height: 1.8;
  opacity: 0;
}

.hero-tagline {
  font-size: 1rem;
  color: var(--color-text-primary);
  opacity: 0;
  margin-top: -0.5rem;
}

.hero-cta {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
  opacity: 0;
}

.hero-image-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  align-items: center;
}

.hero-image-container {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%);
  opacity: 0.2;
  filter: blur(40px);
  z-index: -1;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 8px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  opacity: 0.95;
  transition: transform var(--transition-slow);
  filter: contrast(1.05) brightness(0.95);
  mask-image: radial-gradient(circle, black 60%, transparent 100%);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
  pointer-events: none;
}

.hero-image-wrapper:hover .profile-image {
  transform: scale(1.05);
}

.hero-card {
  padding: var(--spacing-lg);
  width: 100%;
  opacity: 0;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  font-family: var(--font-display);
  line-height: 1;
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.hero-orb-1 {
  width: 400px;
  height: 400px;
  background: var(--color-accent-primary);
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.hero-orb-2 {
  width: 300px;
  height: 300px;
  background: var(--color-accent-secondary);
  bottom: 20%;
  left: 5%;
  animation-delay: 2s;
}

.hero-orb-3 {
  width: 250px;
  height: 250px;
  background: var(--color-accent-tertiary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .hero-image-container {
    width: 280px;
    height: 280px;
  }
  
  .hero-card {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: calc(var(--spacing-3xl) + 60px) 0 var(--spacing-2xl);
  }
  
  .hero-cta {
    flex-direction: column;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .hero-orb {
    filter: blur(60px);
  }
}
</style>
