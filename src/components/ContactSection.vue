<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section-title">
        <h2 v-html="contactData.sectionTitle"></h2>
        <p class="text-secondary">{{ contactData.sectionSubtitle }}</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-card glass-card">
            <h3>{{ contactData.intro }}</h3>
            <p>{{ contactData.roles }}</p>

            <div class="contact-methods">
              <a 
                v-for="method in contactData.methods" 
                :key="method.name"
                :href="method.link"
                class="contact-method"
                :target="method.name !== 'Email' ? '_blank' : undefined"
                :rel="method.name !== 'Email' ? 'noopener' : undefined"
              >
                <div class="method-icon">{{ method.icon }}</div>
                <div class="method-content">
                  <h4>{{ method.name }}</h4>
                  <p>{{ method.value }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="social-links">
          <h3>Connect With Me</h3>
          <div class="social-grid">
            <a
              v-for="social in contactData.socials"
              :key="social.name"
              :href="social.link"
              target="_blank"
              rel="noopener"
              class="social-link glass-card"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="getIconPath(social.name)" />
              </svg>
              <span>{{ social.name }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>
          &copy; {{ new Date().getFullYear() }} Abishek VP. Built with Vue.js & precision engineering.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import portfolioData from "../data/portfolio.json";

export default {
  name: "ContactSection",
  data() {
    return {
      contactData: portfolioData.contact,
      socialIcons: {
        GitHub: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
        LinkedIn: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
        Twitter: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
        Medium: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
        Leetcode: "M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z",
        Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"
      }
    };
  },
  methods: {
    getIconPath(name) {
      return this.socialIcons[name] || "";
    }
  }
};
</script>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-3xl);
}

.contact-card {
  padding: var(--spacing-xl);
}

.contact-card h3 {
  margin-bottom: var(--spacing-md);
}

.contact-card > p {
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-secondary);
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.contact-method {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(255, 250, 250, 0.03);
  border: 1px solid rgba(255, 250, 250, 0.05);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-base);
}

.contact-method:hover {
  background: rgba(255, 250, 250, 0.05);
  border-color: rgba(255, 250, 250, 0.1);
  transform: translateX(4px);
}

.method-icon {
  font-size: 1.75rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-subtle);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.method-content h4 {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.method-content p {
  font-size: 1rem;
  color: var(--color-text-primary);
  font-weight: 500;
}

.social-links h3 {
  margin-bottom: var(--spacing-lg);
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: all var(--transition-base);
  aspect-ratio: 1;
}

.social-link:hover {
  transform: translateY(-4px);
  background: rgba(255, 250, 250, 0.08);
}

.social-link svg {
  width: 32px;
  height: 32px;
  color: var(--color-accent-primary);
  transition: all var(--transition-base);
}

.social-link:hover svg {
  transform: scale(1.1);
  color: var(--color-accent-secondary);
}

.social-link span {
  font-size: 0.875rem;
  font-weight: 600;
}

.footer {
  text-align: center;
  padding-top: var(--spacing-2xl);
  border-top: 1px solid rgba(255, 250, 250, 0.1);
}

.footer p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
