<template>
  <section id="home" class="hero-section">
    <div class="container">
      <div class="hero-grid">
        <!-- Left: Text Content -->
        <div class="hero-content">
          <!-- Terminal Status Pill -->
          <div class="hero-badge-wrapper animate-fade-in-up">
            <div class="code-badge">
              <span class="pulse-dot"></span>
              <span>// SENIOR PLATFORM & SECURITY ENGINEER</span>
            </div>
          </div>

          <h1 class="hero-name animate-fade-in-up" style="animation-delay: 0.1s">
            Abishek <span class="gradient-text">VP</span>
          </h1>

          <p class="hero-title animate-fade-in-up" style="animation-delay: 0.2s">
            Backend Architecture &bull; Enterprise Integrations &bull; IdP &bull; DevOps
          </p>

          <p class="hero-description animate-fade-in-up" style="animation-delay: 0.3s">
            Senior Software Engineer specializing in high-throughput backend architecture, enterprise DevOps integrations, Identity Provider management, and automated tooling at Securden.
          </p>

          <!-- Core stats / highlights -->
          <div class="hero-highlights animate-fade-in-up" style="animation-delay: 0.35s">
            <div class="highlight-item glass-card">
              <span class="highlight-icon">🛡️</span>
              <div>
                <span class="highlight-val">4+ Years</span>
                <span class="highlight-lbl">Security Engineering</span>
              </div>
            </div>
            <div class="highlight-item glass-card">
              <span class="highlight-icon">🏆</span>
              <div>
                <span class="highlight-val">SIH Winner</span>
                <span class="highlight-lbl">Smart India Hackathon</span>
              </div>
            </div>
            <div class="highlight-item glass-card">
              <span class="highlight-icon">⚡</span>
              <div>
                <span class="highlight-val">DevOps</span>
                <span class="highlight-lbl">Terraform, Ansible, Jenkins, etc,...</span>
              </div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="hero-actions animate-fade-in-up" style="animation-delay: 0.4s">
            <a href="#projects" class="btn btn-primary">
              View Architecture & Projects
            </a>
            <a
              href="/resume.pdf"
              download="Abishek_VP_Resume.pdf"
              data-track="resume"
              class="btn btn-glass resume-cta"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download CV</span>
            </a>
            <a href="#terminal-section" class="btn btn-glass cli-cta">
              <span>Launch Terminal CLI</span>
            </a>
          </div>
        </div>

        <!-- Right: Focal Glass Portrait -->
        <div class="hero-visual animate-fade-in" style="animation-delay: 0.45s">
          <div class="focal-card-container">
            <div class="portrait-glow"></div>
            <div class="portrait-frame glass">
              <img src="../assets/img/abi.jpg" alt="Abishek VP" class="portrait-img" />
              <div class="portrait-overlay">
                <div class="portrait-tag" style="margin-bottom: 40px">
                  <span class="tag-dot"></span>
                  <span>Software Engineer at Securden</span>
                </div>
              </div>
            </div>

            <!-- Floating Glass Badges -->
            <div class="floating-badge badge-top-right glass-card">
              <span class="badge-icon">🛡️</span>
              <div>
                <strong>Security Platform</strong>
                <p>PAM, Vault, Password Self-Serv...</p>
              </div>
            </div>

            <div class="floating-badge badge-bottom-left glass-card">
              <span class="badge-icon">⚙️</span>
              <div>
                <strong>IDP and DevOps</strong>
                <p>AD, Entra ID, Ansible, Jenkins, Ter...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
};
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: calc(var(--spacing-3xl) + 2rem) 0 var(--spacing-3xl) 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.hero-badge-wrapper {
  margin-bottom: -0.5rem;
}

.hero-name {
  font-size: clamp(3rem, 5.5vw, 4.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.hero-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-accent-tertiary);
  letter-spacing: 0.02em;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 620px;
}

/* Highlights */
.hero-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-top: 0.5rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: rgba(15, 23, 42, 0.45);
}

.highlight-icon {
  font-size: 1.5rem;
}

.highlight-val {
  display: block;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.highlight-lbl {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

/* Actions */
.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.8rem;
}

.resume-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cli-cta {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: #10b981;
}

/* Visual / Portrait */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.focal-card-container {
  position: relative;
  width: 100%;
  max-width: 420px;
}

.portrait-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, var(--color-glow-1) 0%, transparent 70%);
  filter: blur(40px);
  z-index: 0;
}

.portrait-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid var(--glass-border);
  z-index: 1;
}

.portrait-img {
  width: 100%;
  height: 480px;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.6s ease;
}

.portrait-frame:hover .portrait-img {
  transform: scale(1.03);
}

.portrait-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 100%);
  z-index: 2;
}

.portrait-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(10, 15, 28, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.82rem;
  font-family: var(--font-mono);
  color: #ffffff;
}

.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

/* Floating Badges */
.floating-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  z-index: 3;
}

.badge-top-right {
  top: -15px;
  right: -20px;
}

.badge-bottom-left {
  bottom: -20px;
  left: -20px;
}

.badge-icon {
  font-size: 1.4rem;
}

.floating-badge strong {
  display: block;
  font-size: 0.88rem;
  color: var(--color-text-primary);
}

.floating-badge p {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    text-align: center;
  }

  .hero-content {
    align-items: center;
  }

  .hero-description {
    margin: 0 auto;
  }

  .hero-highlights {
    justify-content: center;
    width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .focal-card-container {
    max-width: 360px;
  }

  .badge-top-right {
    right: 0;
  }

  .badge-bottom-left {
    left: 0;
  }
}

@media (max-width: 640px) {
  .hero-highlights {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-actions a {
    width: 100%;
    justify-content: center;
  }

  .portrait-img {
    height: 380px;
  }
}
</style>
