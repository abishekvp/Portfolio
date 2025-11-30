<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-title">
        <h2 v-html="experienceData.sectionTitle"></h2>
        <p class="text-secondary">{{ experienceData.sectionSubtitle }}</p>
      </div>

      <div class="timeline">
        <div
          v-for="(exp, index) in experienceData.jobs"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            <div
              v-if="index < experienceData.jobs.length - 1"
              class="timeline-line"
            ></div>
          </div>
          <div class="timeline-content glass-card">
            <div class="timeline-header">
              <div>
                <h3>{{ exp.title }}</h3>
                <h4 class="company gradient-text">{{ exp.company }}</h4>
              </div>
              <span class="period">{{ exp.period }}</span>
            </div>
            <p>{{ exp.description }}</p>
            <div class="achievements">
              <div
                v-for="(achievement, i) in exp.achievements"
                :key="i"
                class="achievement"
              >
                <span class="achievement-bullet">▸</span>
                <span>{{ achievement }}</span>
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
  name: "ExperienceSection",
  data() {
    return {
      experienceData: portfolioData.experience,
    };
  },
};
</script>

<style scoped>
.timeline {
  position: relative;
  padding: var(--spacing-md) 0;
}

.timeline-item {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gradient-accent);
  box-shadow: 0 0 20px rgba(158, 42, 43, 0.5);
  z-index: 2;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(
    180deg,
    var(--color-accent-primary) 0%,
    rgba(158, 42, 43, 0.3) 100%
  );
  margin-top: 0.5rem;
}

.timeline-content {
  padding: var(--spacing-lg);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-md);
}

.timeline-header h3 {
  font-size: 1.375rem;
  margin-bottom: 0.25rem;
}

.company {
  font-size: 1.125rem;
  font-weight: 600;
}

.period {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  padding: 0.375rem 0.875rem;
  background: rgba(158, 42, 43, 0.15);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.timeline-content > p {
  margin-bottom: var(--spacing-md);
  color: var(--color-text-secondary);
}

.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.achievement {
  display: flex;
  gap: 0.75rem;
  align-items: start;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.achievement-bullet {
  color: var(--color-accent-primary);
  font-weight: 700;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 40px 1fr;
    gap: var(--spacing-md);
  }

  .timeline-header {
    flex-direction: column;
    align-items: start;
  }

  .period {
    align-self: start;
  }
}
</style>
