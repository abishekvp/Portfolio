<template>
  <section id="projects" class="section">
    <div class="container-wide">
      <div class="section-title">
        <h2 v-html="projectsData.sectionTitle"></h2>
        <p class="text-secondary">{{ projectsData.sectionSubtitle }}</p>
      </div>

      <div class="projects-grid">
        <div
          v-for="project in projectsData.items"
          :key="project.id"
          class="project-card glass-card"
        >
          <div class="project-image">
            <div class="project-placeholder">
              <span>{{ project.title }}</span>
            </div>
            <div class="project-overlay">
              <a
                :href="project.demo"
                class="btn btn-primary btn-sm"
                target="_blank"
                rel="noopener"
              >
                Live Demo
              </a>
              <a
                :href="project.github"
                class="btn btn-glass btn-sm"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
            </div>
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{
                tag
              }}</span>
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
  name: "ProjectsSection",
  data() {
    return {
      projectsData: portfolioData.projects,
    };
  },
};
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.project-card {
  padding: 0;
  overflow: hidden;
  transition: all var(--transition-base);
}

.project-card:hover {
  transform: translateY(-8px);
}

.project-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  background: var(--color-bg-tertiary);
  overflow: hidden;
}

.project-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-subtle);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.btn-sm {
  padding: 0.625rem 1.5rem;
  font-size: 0.875rem;
}

.project-content {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.project-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.project-content p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  padding: 0.375rem 0.875rem;
  background: var(--color-tag-bg);
  border: 1px solid var(--color-tag-border);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all var(--transition-fast);
  cursor: default;
}

.tag:hover {
  border-color: var(--color-accent-primary);
  background: var(--color-tag-border);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
