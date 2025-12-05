<template>
  <div id="app" class="app">
    <NavigationBar />
    <main>
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
    <ThemeSwitcher />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import AchievementsSection from "./components/AchievementsSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import ExperienceSection from "./components/ExperienceSection.vue";
import ContactSection from "./components/ContactSection.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    HeroSection,
    AboutSection,
    AchievementsSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection,
    ThemeSwitcher,
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
}

.app::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 30%,
      var(--color-glow-1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      var(--color-glow-2) 0%,
      transparent 50%
    );
  pointer-events: none;
  z-index: 0;
}

main {
  position: relative;
  z-index: 1;
}
</style>
