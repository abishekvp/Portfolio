<template>
  <section id="about" class="section">
    <div class="container">
      <div class="section-title">
        <h2 v-html="aboutData.sectionTitle"></h2>
        <p class="text-secondary">{{ aboutData.sectionSubtitle }}</p>
      </div>

      <div class="about-content">
        <div class="about-image-wrapper">
          <div class="what-i-do">
            <h4>{{ aboutData.whatIDo.title }}</h4>
            <ul>
              <li v-for="(item, index) in aboutData.whatIDo.items" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="about-text">
          <h3>{{ aboutData.bio.title }}</h3>
          <p v-for="(paragraph, index) in aboutData.bio.paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="about-highlights">
        <div
          v-for="(highlight, index) in aboutData.highlights"
          :key="index"
          class="highlight glass-card"
        >
          <div class="highlight-icon">{{ highlight.icon }}</div>
          <div class="highlight-content">
            <h4>{{ highlight.title }}</h4>
            <p>{{ highlight.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import portfolioData from "../data/portfolio.json";

export default {
  name: "AboutSection",
  data() {
    return {
      aboutData: portfolioData.about,
    };
  },
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
