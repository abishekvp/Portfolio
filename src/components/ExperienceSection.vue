<template>
  <section id="experience" class="section experience-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>// 05. CAREER_TRAJECTORY</span>
        </div>
        <h2 v-html="experienceData.sectionTitle"></h2>
        <p class="text-secondary">{{ experienceData.sectionSubtitle }}</p>
      </div>

      <div class="timeline">
        <div
          v-for="(exp, index) in allJobs"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <div class="timeline-dot">
              <span class="pulse-dot"></span>
            </div>
            <div
              v-if="index < allJobs.length - 1"
              class="timeline-line"
            ></div>
          </div>

          <div class="timeline-content glass-card">
            <div class="timeline-header">
              <div>
                <div class="job-status-tag">
                  <span class="status-marker">●</span>
                  <span>{{ exp.is_current ? 'CURRENT POSITION' : 'PAST POSITION' }}</span>
                </div>
                <h3>{{ exp.title || exp.job_title }}</h3>
                <h4 class="company gradient-text">
                  <a
                    v-if="exp.companyUrl"
                    :href="exp.companyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="company-link"
                  >
                    {{ exp.company }}
                    <span class="link-icon">↗</span>
                  </a>
                  <span v-else>{{ exp.company }}</span>
                </h4>
              </div>

              <div class="timeline-meta">
                <span class="period font-mono">{{ exp.period || formatPeriod(exp.start_date, exp.end_date, exp.is_current) }}</span>
                <a
                  v-if="exp.companyUrl"
                  :href="exp.companyUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="period site-btn"
                >
                  Visit Site
                </a>
              </div>
            </div>

            <p class="role-desc">{{ exp.description }}</p>

            <div class="achievements" v-if="exp.achievements && exp.achievements.length">
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
import { portfolioService } from "../services/portfolioService";

export default {
  name: "ExperienceSection",
  data() {
    return {
      experienceData: portfolioData.experience,
      apiExperience: []
    };
  },
  computed: {
    allJobs() {
      if (this.apiExperience && this.apiExperience.length > 0) {
        return this.apiExperience.map(item => ({
          title: item.job_title,
          company: item.company,
          companyUrl: '',
          start_date: item.start_date,
          end_date: item.end_date,
          is_current: item.is_current,
          description: item.description,
          achievements: item.technologies ? item.technologies.split(',').map(t => `Key Tech: ${t.trim()}`) : []
        }));
      }
      return this.experienceData.jobs || [];
    }
  },
  mounted() {
    portfolioService.subscribe((data) => {
      if (data && data.apiExperience && data.apiExperience.length > 0) {
        this.apiExperience = data.apiExperience;
      } else if (data && data.experience) {
        this.experienceData = data.experience;
      }
    });
  },
  methods: {
    formatPeriod(start, end, current) {
      if (!start) return '';
      const s = new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const e = current ? 'Present' : (end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
      return `${s} – ${e}`;
    }
  }
};
</script>

<style scoped>
.experience-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.9);
  border: 2px solid var(--color-accent-primary);
  box-shadow: 0 0 15px var(--color-glow-1);
  z-index: 2;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(
    180deg,
    var(--color-accent-primary) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  margin-top: 0.5rem;
}

.timeline-content {
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-xl);
  transition: all var(--transition-base);
}

.timeline-content:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px var(--color-glow-1);
}

.job-status-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #10b981;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.status-marker {
  font-size: 0.8rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--spacing-md);
  gap: var(--spacing-md);
}

.timeline-header h3 {
  font-size: 1.35rem;
  color: var(--color-text-primary);
}

.company {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0.2rem;
}

.company-link {
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.company-link:hover {
  color: var(--color-accent-primary);
}

.link-icon {
  font-size: 0.8em;
  opacity: 0.7;
}

.timeline-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.period {
  font-size: 0.82rem;
  color: var(--color-text-secondary);
  padding: 0.35rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.site-btn {
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all var(--transition-fast);
}

.site-btn:hover {
  background: var(--color-accent-primary);
  color: #ffffff;
}

.role-desc {
  margin-bottom: var(--spacing-md);
  color: var(--color-accent-tertiary);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.achievements {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
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
    grid-template-columns: 36px 1fr;
    gap: var(--spacing-md);
  }

  .timeline-header {
    flex-direction: column;
    align-items: start;
  }

  .timeline-meta {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
