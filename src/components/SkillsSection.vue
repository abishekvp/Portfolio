<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-title">
        <h2>Skills & <span class="gradient-text">Expertise</span></h2>
        <p class="text-secondary">Technologies I work with</p>
      </div>

      <div class="skills-grid">
        <div
          v-for="category in skillCategories"
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
                <div class="detail-row">
                  <span class="detail-label">How I Learned:</span>
                  <p class="detail-text">{{ skill.learned }}</p>
                </div>
                <div class="detail-row">
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
export default {
  name: "SkillsSection",
  data() {
    return {
      skillCategories: [
        {
          name: "Backend & Platform",
          icon: "⚙️",
          skills: [
            { 
              name: "Python / Django", 
              learned: "Mastered through building scalable web applications and automation scripts, focusing on ORM and MVC patterns.",
              implemented: "Core backend architecture for Securden's SSPR module and the SIH 2024 winning research platform."
            },
            { 
              name: "FastAPI / REST APIs", 
              learned: "Adopted for high-performance microservices and asynchronous request handling.",
              implemented: "Designed secure API endpoints for enterprise identity integrations and internal tools."
            },
            { 
              name: "PostgreSQL / SQL", 
              learned: "Deep dive into relational database design, indexing, and query optimization.",
              implemented: "Managed complex data schemas for user identity management and transaction logging."
            },
            { 
              name: "System Architecture", 
              learned: "Mentorship from senior engineers and studying distributed system patterns.",
              implemented: "Designed scalable, fault-tolerant architectures for enterprise security products."
            },
          ],
        },
        {
          name: "Identity & Security",
          icon: "🛡️",
          skills: [
            { 
              name: "IAM (Azure AD, LDAP, GWS)", 
              learned: "Extensive research on identity protocols and hands-on integration testing.",
              implemented: "Seamless directory sync and authentication flows for major enterprise providers."
            },
            { 
              name: "SSPR / PAM", 
              learned: "Specialized training in privileged access management and self-service workflows.",
              implemented: "Developed the Self-Service Password Reset portal used by enterprise clients."
            },
            { 
              name: "OAuth2 / SAML / SCIM", 
              learned: "Studying RFC specifications and implementing secure auth handshakes.",
              implemented: "Enabled SSO and user provisioning capabilities across the security suite."
            },
            { 
              name: "Security Automation", 
              learned: "Combining scripting with security best practices to reduce manual toil.",
              implemented: "Automated credential rotation and security compliance checks."
            },
          ],
        },
        {
          name: "DevOps & Automation",
          icon: "🔧",
          skills: [
            { 
              name: "Terraform / IaC", 
              learned: "Practicing infrastructure as code to manage cloud resources reproducibly.",
              implemented: "Provisioned and managed cloud infrastructure for development and staging environments."
            },
            { 
              name: "Jenkins / CI/CD", 
              learned: "Setting up automated build and deployment pipelines for continuous delivery.",
              implemented: "Streamlined the release process, reducing deployment time and errors."
            },
            { 
              name: "Ansible / Chef / Puppet", 
              learned: "Learning configuration management tools to standardize server setups.",
              implemented: "Automated server configuration and package management across fleet."
            },
            { 
              name: "Selenium / Playwright", 
              learned: "Writing robust end-to-end tests to ensure application stability.",
              implemented: "Created comprehensive test suites for critical user flows and UI interactions."
            },
          ],
        },
        {
          name: "Frontend & Tools",
          icon: "💻",
          skills: [
            { 
              name: "React / JavaScript", 
              learned: "Building interactive user interfaces and single-page applications.",
              implemented: "Developed dynamic dashboards and responsive frontend components."
            },
            { 
              name: "Ember.js", 
              learned: "Working with legacy enterprise codebases and maintaining stability.",
              implemented: "Maintained and enhanced existing frontend modules for long-term projects."
            },
            { 
              name: "HTML / CSS / AJAX", 
              learned: "Fundamental web technologies honed through years of project work.",
              implemented: "Crafted pixel-perfect, responsive layouts and smooth asynchronous updates."
            },
            { 
              name: "Git / VS Code / Postman", 
              learned: "Daily usage and exploring advanced features for productivity.",
              implemented: "Version control, code editing, and API testing in daily development workflow."
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.skill-category {
  padding: var(--spacing-xl);
}

.category-header {
  display: flex;
  align-items: center;
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
  flex-direction: column;
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
}

.skill-item:hover {
  background: rgba(255, 250, 250, 0.05);
  border-color: rgba(158, 42, 43, 0.3);
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

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
