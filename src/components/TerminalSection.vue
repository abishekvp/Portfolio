<template>
  <section id="terminal-section" class="section terminal-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>$ /bin/zsh - interactive CLI</span>
        </div>
        <h2>Developer <span class="gradient-text">Terminal</span></h2>
        <p class="text-secondary">
          Execute commands directly to inspect platform architecture, security benchmarks, or download credentials.
        </p>
      </div>

      <InteractiveTerminal />
    </div>
  </section>
</template>

<script>
import InteractiveTerminal from './InteractiveTerminal.vue';

export default {
  name: 'TerminalSection',
  components: {
    InteractiveTerminal
  }
};
</script>

<style scoped>
.terminal-section {
  position: relative;
  z-index: 2;
  padding: var(--spacing-2xl) 0;
}

.mb-2 {
  margin-bottom: 0.75rem;
}
</style>
