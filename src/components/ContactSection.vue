<template>
  <section id="contact" class="section contact-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>// 07. COMMUNICATION_CHANNELS</span>
        </div>
        <h2 v-html="contactData.sectionTitle"></h2>
        <p class="text-secondary">{{ contactData.sectionSubtitle }}</p>
      </div>

      <div class="contact-grid">
        <!-- Left: Interactive Admin Message Form -->
        <div class="contact-form-card glass-card">
          <div class="terminal-dots mb-3">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-tag ml-auto">send_message.sh</span>
          </div>

          <h3 class="form-heading">Send a Direct Transmission</h3>
          <p class="form-subheading">
            Whether you want to discuss platform engineering, security architectures, mentorship, or new opportunities.
          </p>

          <!-- Automatic Form Interception via data-abishek-contact -->
          <form data-abishek-contact class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Morgan"
                  class="glass-input"
                />
              </div>
              <div class="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. alex@example.com"
                  class="glass-input"
                />
              </div>
            </div>

            <div class="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Platform Engineering / IAM Advisory / General Inquiry"
                class="glass-input"
              />
            </div>

            <div class="form-group">
              <label>Message Payload *</label>
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Type your message here..."
                class="glass-input"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary submit-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>Transmit Message</span>
            </button>

            <!-- Auto-populated response container -->
            <div class="contact-response" style="display:none;"></div>
          </form>
        </div>

        <!-- Right: Contact Methods & Socials -->
        <div class="contact-info-col">
          <div class="contact-info-card glass-card">
            <h3 class="info-title">{{ contactData.intro }}</h3>
            <p class="info-roles">{{ contactData.roles }}</p>

            <div class="methods-list">
              <a
                v-for="method in contactData.methods"
                :key="method.name"
                :href="method.link"
                class="method-item glass"
                :target="method.name !== 'Email' && method.name !== 'Phone' ? '_blank' : undefined"
                :rel="method.name !== 'Email' && method.name !== 'Phone' ? 'noopener' : undefined"
              >
                <div class="method-icon-circle">{{ method.icon }}</div>
                <div class="method-text">
                  <span class="method-name font-mono">{{ method.name }}</span>
                  <span class="method-value">{{ method.value }}</span>
                </div>
                <span class="method-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          <!-- Social Links Grid -->
          <div class="socials-card glass-card">
            <h4 class="socials-title font-mono">// CONNECT_EXTERNALLY</h4>
            <div class="socials-grid">
              <a
                v-for="social in contactData.socials"
                :key="social.name"
                :href="social.link"
                target="_blank"
                rel="noopener"
                class="social-btn glass"
              >
                <span>{{ social.name }}</span>
                <span class="social-ext-icon">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="portfolio-footer">
        <div class="footer-content">
          <div class="footer-meta font-mono">
            <span class="pulse-dot"></span>
            <span>SYSTEM_ONLINE // DEPLOYED VIA VUE 3 & THREE.JS</span>
          </div>
          <p class="copyright">
            &copy; {{ new Date().getFullYear() }} Abishek VP. Architected with high-assurance platform standards.
          </p>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import portfolioData from "../data/portfolio.json";
import { portfolioService } from "../services/portfolioService";

export default {
  name: "ContactSection",
  data() {
    return {
      contactData: portfolioData.contact,
    };
  },
  mounted() {
    portfolioService.subscribe((data) => {
      if (data && data.contact) {
        this.contactData = data.contact;
      }
    });
  }
};
</script>

<style scoped>
.contact-section {
  position: relative;
  z-index: 1;
  padding-bottom: var(--spacing-xl);
}

.mb-2 { margin-bottom: 0.75rem; }
.mb-3 { margin-bottom: 1rem; }
.ml-auto { margin-left: auto; }

.font-mono {
  font-family: var(--font-mono);
}

.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: var(--spacing-2xl);
  align-items: start;
  margin-bottom: var(--spacing-3xl);
}

/* Left Form Card */
.contact-form-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
}

.form-heading {
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
  color: var(--color-text-primary);
}

.form-subheading {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
}

.glass-input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.92rem;
  outline: none;
  transition: all var(--transition-fast);
}

.glass-input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 12px var(--color-glow-1);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
  padding: 0.85rem 1.5rem;
}

/* Right Column */
.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-info-card,
.socials-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
}

.info-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.info-roles {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.methods-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.method-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(10, 15, 28, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: inherit;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.method-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--glass-border-hover);
  transform: translateX(4px);
}

.method-icon-circle {
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.method-name {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.method-value {
  font-size: 0.92rem;
  color: var(--color-text-primary);
  font-weight: 500;
}

.method-arrow {
  color: var(--color-accent-tertiary);
  font-size: 1.1rem;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.method-item:hover .method-arrow {
  opacity: 1;
  transform: translateX(3px);
}

.socials-title {
  font-size: 0.82rem;
  color: var(--color-accent-tertiary);
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
}

.socials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.75rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  background: rgba(10, 15, 28, 0.6);
  border: 1px solid var(--glass-border);
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all var(--transition-fast);
}

.social-btn:hover {
  background: var(--color-accent-primary);
  color: #ffffff;
  border-color: var(--color-accent-primary);
  transform: translateY(-2px);
}

.social-ext-icon {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Footer */
.portfolio-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 2rem;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.footer-meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #10b981;
  letter-spacing: 1px;
}

.copyright {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
