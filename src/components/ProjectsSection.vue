<template>
  <section id="projects" class="section projects-section">
    <div class="container-wide">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>// 04. ARCHITECTURAL_BUILDS</span>
        </div>
        <h2 v-html="projectsData.sectionTitle"></h2>
        <p class="text-secondary">{{ projectsData.sectionSubtitle }}</p>
      </div>

      <div class="projects-grid">
        <div
          v-for="(project, index) in allProjects"
          :key="project.id || index"
          class="project-card glass-card"
        >
          <!-- Project Top Bar (Terminal Window style) -->
          <div class="project-topbar">
            <div class="terminal-dots">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
            </div>
            <span class="project-meta-tag">BUILD_{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <!-- Project Body -->
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>

            <!-- Tags -->
            <div class="project-tags">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Links -->
            <div class="project-links">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="project-link-btn glass"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Source Code</span>
              </a>

              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener"
                class="project-link-btn demo-btn glass"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Live Demo</span>
              </a>
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
  name: "ProjectsSection",
  data() {
    return {
      projectsData: portfolioData.projects,
      apiProjects: []
    };
  },
  computed: {
    allProjects() {
      // If admin has projects configured via API, show them; otherwise show curated portfolio items
      if (this.apiProjects && this.apiProjects.length > 0) {
        return this.apiProjects;
      }
      return this.projectsData.items || [];
    }
  },
  mounted() {
    portfolioService.subscribe((data) => {
      if (data && data.apiProjects && data.apiProjects.length > 0) {
        this.apiProjects = data.apiProjects;
      } else if (data && data.projects) {
        this.projectsData = data.projects;
      }
    });
  }
};
</script>

<style scoped>
.projects-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
}

.project-card {
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-base);
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--glass-border-hover);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px var(--color-glow-1);
}

.project-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  background: rgba(10, 15, 28, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.project-meta-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-accent-tertiary);
  letter-spacing: 1px;
}

.project-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.35;
}

.project-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.25rem 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--color-accent-tertiary);
}

.project-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.project-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-primary);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-fast);
}

.project-link-btn:hover {
  background: var(--color-accent-primary);
  border-color: var(--color-accent-primary);
  color: #ffffff;
  transform: translateY(-2px);
}

.demo-btn:hover {
  background: #10b981;
  border-color: #10b981;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
