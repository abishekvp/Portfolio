<template>
  <section id="achievements" class="section">
    <div class="container">
      <div class="section-title">
        <h2>Achievements & <span class="gradient-text">Recognition</span></h2>
        <p class="text-secondary">Milestones and contributions</p>
      </div>

      <div class="achievements-grid">
        <div class="achievement-card glass-card">
          <div class="achievement-icon">🏆</div>
          <div class="achievement-content">
            <h3>SIH 2022 Winner</h3>
            <p>Winner of Smart India Hackathon 2022, a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives.</p>
          </div>
        </div>

        <div class="achievement-card glass-card">
          <div class="achievement-icon">🎤</div>
          <div class="achievement-content">
            <h3>AI Horizon 2022</h3>
            <p>Orchestrated AI Horizon 2022, leading the organization and execution of the event focused on Artificial Intelligence advancements.</p>
          </div>
        </div>

        <div class="achievement-card glass-card">
          <div class="achievement-icon">👨‍🏫</div>
          <div class="achievement-content">
            <h3>Peer Mentorship</h3>
            <p>Conducted placement training for batchmates covering Web Development (HTML, CSS, JS), Figma designing, Git/GitHub, and hosting static websites with GitHub Pages.</p>
          </div>
        </div>

        <div class="achievement-card glass-card">
          <div class="achievement-icon">⚖️</div>
          <div class="achievement-content">
            <h3>Jury Member</h3>
            <p>Served as a Jury member for St. Thomas College Internal SIH 2024, evaluating innovative projects and selecting teams for the national level.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AchievementsSection",
};
</script>

<style scoped>
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.achievement-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  transition: all var(--transition-base);
}

.achievement-card:hover {
  transform: translateY(-5px);
  border-color: rgba(158, 42, 43, 0.3);
  background: rgba(255, 250, 250, 0.05);
}

.achievement-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.achievement-content h3 {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.achievement-content p {
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
