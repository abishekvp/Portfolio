<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-title">
        <h2>About <span class="gradient-text">Me</span></h2>
        <p class="text-secondary">Get to know me better</p>
      </div>

      <div class="about-content">
        <div class="about-image-wrapper">

          <div class="what-i-do">
            <h4>What I Do</h4>
            <ul>
              <li>Platform Engineering & Backend Architecture</li>
              <li>Identity & Access Management (SSPR, Azure AD, LDAP, GWS)</li>
              <li>Secure Automation for DevOps & CI/CD Tools</li>
              <li>Full-stack Product Development with Python & JavaScript</li>
            </ul>
          </div>


        </div>

        <div class="about-text">
          <h3>Platform & Security Engineer</h3>
          <p>
            I'm Abishek VP, a Platform & Security Engineer specializing in
            secure automations, cloud identity integrations, and enterprise
            IAM-driven workflows. I build systems that combine platform
            engineering with cybersecurity principles—focusing on SSPR modules,
            DevOps credential automation, browser extension security, and
            identity provider integrations.
          </p>
          <p>
            With experience across Python, Django, Terraform, Jenkins, Azure AD,
            Google Workspace, React, and DevOps tooling, I deliver scalable and
            secure solutions used in enterprise environments. I also won the
            Smart India Hackathon 2024 for building a dynamic research funding
            intelligence platform for government use.
          </p>




        </div>
      </div>

      <div class="about-highlights">
        <div class="highlight glass-card">
          <div class="highlight-icon">🛡️</div>
          <div class="highlight-content">
            <h4>Security First</h4>
            <p>Enterprise IAM & SSPR</p>
          </div>
        </div>
        <div class="highlight glass-card">
          <div class="highlight-icon">⚙️</div>
          <div class="highlight-content">
            <h4>Automation</h4>
            <p>DevOps CI/CD Integration</p>
          </div>
        </div>
        <div class="highlight glass-card">
          <div class="highlight-icon">🏆</div>
          <div class="highlight-content">
            <h4>Achievement</h4>
            <p>SIH 2024 Winner</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutSection",
};
</script>

<style scoped>
.about-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--spacing-2xl);
  align-items: start;
}

.about-image-wrapper {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}





.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.about-text h3 {
  margin-bottom: var(--spacing-sm);
}

.about-text p {
  line-height: 1.8;
}

.what-i-do {
  margin: 0;
  padding: var(--spacing-md);
  background: rgba(255, 250, 250, 0.03);
  border-left: 3px solid var(--color-accent-primary);
  border-radius: var(--radius-sm);
}

.what-i-do h4 {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.what-i-do ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.what-i-do li {
  color: var(--color-text-secondary);
  padding-left: 1.5rem;
  position: relative;
}

.what-i-do li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--color-accent-primary);
  font-weight: 700;
}

.about-highlights {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
  width: 100%;
}

.highlight {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-md);
}

.highlight-icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
}

.highlight-content h4 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.highlight-content p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .about-image-wrapper {
    position: static;
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .about-highlights {
    grid-template-columns: 1fr;
  }
}
</style>
