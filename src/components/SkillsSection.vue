<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-title">
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
            <div class="category-icon">{{ category.icon }}</div>
            <h3>{{ category.name }}</h3>
          </div>
          <div class="skills-list">
            <div
              v-for="skill in category.skills"
              :key="skill.name"
              class="skill-item"
            >
              <h4 class="skill-name">{{ skill.name }}</h4>
              <div class="skill-details">
                <div class="detail-row" v-if="skill.learned">
                  <span class="detail-label">How I Learned:</span>
                  <p class="detail-text">{{ skill.learned }}</p>
                </div>
                <div class="detail-row" v-if="skill.implemented">
                  <span class="detail-label">Where Implemented:</span>
                  <p class="detail-text">{{ skill.implemented }}</p>
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

export default {
  name: "SkillsSection",
  data() {
    return {
      skillsData: portfolioData.skills,
    };
  },
};
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
}

.skill-category {
  padding: var(--spacing-xl);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: center; /* Center category title */
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.category-icon {
  font-size: 2rem;
}

.category-header h3 {
  font-size: 1.5rem;
}

.skills-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 250, 250, 0.03);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 250, 250, 0.05);
  transition: all var(--transition-base);
  flex: 1 1 300px;
  max-width: 400px;
}

.skill-item:hover {
  background: rgba(255, 250, 250, 0.05);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
}

.skill-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-accent-primary);
}

.skill-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  font-weight: 600;
}

.detail-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .skill-item {
    flex-basis: 100%; /* Full width on mobile */
    max-width: 100%;
  }
}
</style>
