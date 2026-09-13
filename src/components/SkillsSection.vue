<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>// 03. CAPABILITIES_MATRIX</span>
        </div>
        <h2 v-html="skillsData.sectionTitle"></h2>
        <p class="text-secondary">{{ skillsData.sectionSubtitle }}</p>
      </div>

      <div class="skills-grid">
        <div
          v-for="category in skillsData.categories"
          :key="category.name"
          class="skill-category glass-card"
        >
          <div class="category-header">
            <div class="category-title-wrap">
              <span class="category-icon">{{ category.icon }}</span>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="category-pill">
              <span>{{ category.skills.length }} Technologies</span>
            </div>
          </div>

          <div class="skills-list">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="skill-item glass"
            >
              <div class="skill-main">
                <h4 class="skill-name">{{ skill.name }}</h4>
                <div class="skill-status-tag">
                  <span class="pulse-dot-sm"></span>
                  <span>PRODUCTION READY</span>
                </div>
              </div>

              <div class="skill-details" v-if="skill.learned || skill.implemented">
                <div class="detail-row" v-if="skill.implemented">
                  <span class="detail-label">Deployment:</span>
                  <p class="detail-text">{{ skill.implemented }}</p>
                </div>
                <div class="detail-row" v-if="skill.learned">
                  <span class="detail-label">Knowledge:</span>
                  <p class="detail-text">{{ skill.learned }}</p>
                </div>
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
  name: "SkillsSection",
  data() {
    return {
      skillsData: portfolioData.skills,
    };
  },
  mounted() {
    portfolioService.subscribe((data) => {
      if (data && data.skills) {
        this.skillsData = data.skills;
      }
    });
  }
};
</script>

<style scoped>
.skills-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: var(--spacing-xl);
}

.skill-category {
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.category-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-icon {
  font-size: 1.6rem;
}

.category-header h3 {
  font-size: 1.25rem;
  color: var(--color-text-primary);
}

.category-pill {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-accent-tertiary);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.skill-item {
  padding: 0.9rem 1.1rem;
  border-radius: var(--radius-md);
  background: rgba(10, 15, 28, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all var(--transition-fast);
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
}

.skill-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.skill-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.skill-status-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: #10b981;
  letter-spacing: 0.5px;
}

.pulse-dot-sm {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.skill-details {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
}

.detail-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.detail-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.detail-text {
  color: var(--color-text-secondary);
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
