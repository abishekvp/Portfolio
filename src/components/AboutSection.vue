<template>
  <section id="about" class="section about-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>// 02. SYSTEM_SPECIFICATION</span>
        </div>
        <h2 v-html="aboutData.sectionTitle"></h2>
        <p class="text-secondary">{{ aboutData.sectionSubtitle }}</p>
      </div>

      <div class="about-content">
        <!-- Left Column: Core Competencies Box -->
        <div class="about-card-left glass-card">
          <div class="terminal-dots mb-3">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-tag ml-auto">CORE_STACK.yaml</span>
          </div>

          <h3 class="competency-title">{{ aboutData.whatIDo.title }}</h3>
          
          <div class="competency-list">
            <div
              v-for="(item, index) in aboutData.whatIDo.items"
              :key="index"
              class="competency-item"
            >
              <div class="competency-header">
                <span class="competency-bullet">#{{ index + 1 }}</span>
                <div class="competency-text-block">
                  <strong class="competency-name text-accent">{{ item.split(': ')[0] }}:</strong>
                  <span class="competency-desc">{{ item.split(': ').slice(1).join(': ') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Bio Narrative -->
        <div class="about-narrative glass-card">
          <div class="narrative-badge">
            <span>ROLE: SENIOR_SOFTWARE_ENGINEER</span>
          </div>

          <h3 class="narrative-headline">{{ aboutData.bio.title }}</h3>
          
          <div class="narrative-paragraphs">
            <p v-for="(paragraph, index) in aboutData.bio.paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>

          <!-- SIH Winner & Credential Highlights -->
          <div class="about-highlights-grid">
            <div
              v-for="(highlight, index) in aboutData.highlights"
              :key="index"
              class="highlight-card glass"
            >
              <div class="highlight-icon">{{ highlight.icon }}</div>
              <div class="highlight-info">
                <h4>{{ highlight.title }}</h4>
                <p>{{ highlight.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import portfolioData from "../data/portfolio.json";
import { portfolioService } from "../services/portfolioService";

export default {
  name: "AboutSection",
  data() {
    return {
      aboutData: portfolioData.about,
    };
  },
  mounted() {
    portfolioService.subscribe((data) => {
      if (data && data.about) {
        this.aboutData = data.about;
      }
    });
  }
};
</script>

<style scoped>
.about-section {
  position: relative;
  z-index: 1;
}

.mb-2 { margin-bottom: 0.75rem; }
.mb-3 { margin-bottom: 1rem; }
.ml-auto { margin-left: auto; }

.terminal-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: var(--spacing-xl);
  align-items: stretch;
}

/* Left Card */
.about-card-left {
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
}

.competency-title {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--color-text-primary);
}

.competency-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.competency-item {
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--color-accent-primary);
  transition: all var(--transition-fast);
}

.competency-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateX(4px);
}

.competency-header {
  display: flex;
  gap: 0.75rem;
  font-size: 0.92rem;
  line-height: 1.5;
}

.competency-bullet {
  font-family: var(--font-mono);
  color: var(--color-accent-tertiary);
  font-weight: 700;
}

.competency-text {
  color: var(--color-text-secondary);
}

/* Right Narrative Card */
.about-narrative {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.45);
}

.narrative-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #10b981;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.narrative-headline {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.narrative-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

/* Highlights Grid */
.about-highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.highlight-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  background: rgba(10, 15, 28, 0.6);
  border: 1px solid var(--glass-border);
  transition: transform var(--transition-fast);
}

.highlight-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
}

.highlight-icon {
  font-size: 1.6rem;
}

.highlight-info h4 {
  font-size: 0.92rem;
  margin-bottom: 0.15rem;
  color: var(--color-text-primary);
}

.highlight-info p {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.3;
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
  }

  .about-highlights-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .about-highlights-grid {
    grid-template-columns: 1fr;
  }
}
</style>
