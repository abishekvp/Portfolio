<template>
  <section id="projects" class="section">
    <div class="container-wide">
      <div class="section-title">
        <h2>Featured <span class="gradient-text">Projects</span></h2>
        <p class="text-secondary">Some of my recent work</p>
      </div>

      <div class="projects-grid">
        <div
          v-for="project in projects"
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
export default {
  name: "ProjectsSection",
  data() {
    return {
      projects: [
        {
          id: 1,
          title: "Enterprise SSPR Platform",
          description:
            "Secure self-service password reset platform with MFA, identity validation, and multi-directory integration (Azure AD, GWS, LDAP). Reduced helpdesk reset calls by 60%+.",
          tags: ["Django", "Azure AD", "LDAP", "MFA", "SSPR"],
          demo: "#",
          github: "#",
        },
        {
          id: 2,
          title: "DevOps Secrets Automation",
          description:
            "Secure credential automation plugins for Terraform, Jenkins, Ansible, Chef, and Puppet. Eliminates hard-coded secrets in CI/CD pipelines with scoped tokens and rotation.",
          tags: ["Python", "Terraform", "Jenkins", "REST API"],
          demo: "#",
          github: "#",
        },
        {
          id: 3,
          title: "Secure Browser Extension",
          description:
            "Enterprise credential autofill extension with AES-GCM encryption, domain isolation, policy-controlled access, and safe input injection for secure credential delivery.",
          tags: ["JavaScript", "Browser APIs", "AES-GCM", "Security"],
          demo: "#",
          github: "#",
        },
        {
          id: 4,
          title: "GrantBase.gov.in – SIH Winner",
          description:
            "National research funding intelligence platform with real-time grant scraping, domain-based alerts, and zero stale storage. Winner of Smart India Hackathon 2024.",
          tags: ["Django", "Selenium", "BeautifulSoup", "Real-time"],
          demo: "#",
          github: "#",
        },
        {
          id: 5,
          title: "Identity Provider Integrations",
          description:
            "Enterprise identity integrations with Azure AD, Google Workspace, and LDAP including user provisioning, group sync, and SCIM/SAML workflows.",
          tags: ["Azure AD", "Google Workspace", "SCIM", "SAML"],
          demo: "#",
          github: "#",
        },
        {
          id: 6,
          title: "LDAPS Connector for AD",
          description:
            "Secure LDAPS connector for on-prem AD password write-back with throttling, brute force protection, and enterprise-grade audit logging.",
          tags: ["Python", "LDAP", "Active Directory", "Security"],
          demo: "#",
          github: "#",
        },
      ],
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
  background: rgba(158, 42, 43, 0.2);
  border: 1px solid rgba(158, 42, 43, 0.3);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
