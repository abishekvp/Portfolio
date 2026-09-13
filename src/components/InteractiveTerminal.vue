<template>
  <div class="terminal-container glass-terminal" :class="{ 'terminal-modal-view': isModal }">
    <!-- Terminal Titlebar -->
    <div class="terminal-header">
      <div class="terminal-dots">
        <span class="terminal-dot red" @click="handleDotClose" title="Minimize / Reset"></span>
        <span class="terminal-dot yellow" @click="clearTerminal" title="Clear Screen"></span>
        <span class="terminal-dot green" @click="toggleMaximize" title="Expand"></span>
      </div>
      <div class="terminal-title">
        <span class="terminal-user">abishek@platform-sec</span>:<span class="terminal-path">~</span> (zsh - 80x24)
      </div>
      <div class="terminal-status">
        <span class="status-indicator"></span>
        <span>READY</span>
      </div>
    </div>

    <!-- Terminal Output Screen -->
    <div class="terminal-screen" ref="screenRef" @click="focusInput">
      <!-- Welcome Banner -->
      <div class="terminal-welcome">
        <pre class="ascii-banner">
   ___   ___  _____ _____ _   _ _____ _   __
  / _ \  |  _ \_   _/  ___| | | |  ___| | / /
 / /_\ \ | |_/ / | | \ `--.| |_| | |__ | |/ / 
 |  _  | | ___ \ | |  `--. \  _  |  __||    \ 
 | | | |_| |_/ /_| |_/\__/ / | | | |___| |\  \
 \_| |_(_)\____/ \___/\____/\_| |_|____/\_| \_/
        </pre>
        <p class="welcome-text">
          <strong class="text-accent">Abishek VP</strong> — Senior Software Engineer | Enterprise Security, IdP & DevOps Integ...<br />
          SIH Winner • Securden Platform Engineer • Password Vault & SSPR Integrations.
        </p>
        <p class="welcome-hint">
          Type <span class="cmd-pill">help</span> to view all commands or click the shortcut chips below.
        </p>
      </div>

      <!-- Command History -->
      <div
        v-for="(item, index) in history"
        :key="index"
        class="history-item"
      >
        <div class="history-cmd-line">
          <span class="prompt-user">abishek@sec</span>:<span class="prompt-path">~</span>$
          <span class="history-command">{{ item.command }}</span>
        </div>
        <div class="history-output" v-html="item.output"></div>
      </div>

      <!-- Current Prompt Line -->
      <div class="terminal-input-line">
        <span class="prompt-user">abishek@sec</span>:<span class="prompt-path">~</span>$
        <input
          ref="cmdInput"
          v-model="currentCommand"
          type="text"
          class="terminal-input"
          spellcheck="false"
          autocomplete="off"
          @keydown.enter="executeCommand"
          @keydown.up.prevent="navigateHistory('up')"
          @keydown.down.prevent="navigateHistory('down')"
        />
        <span class="cursor-blink"></span>
      </div>
    </div>

    <!-- Quick Command Chips for mobile and fast exploration -->
    <div class="terminal-chips">
      <span class="chips-label">Quick actions:</span>
      <button
        v-for="chip in quickChips"
        :key="chip.cmd"
        class="chip-btn"
        @click="runChipCommand(chip.cmd)"
      >
        {{ chip.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveTerminal',
  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentCommand: '',
      historyIndex: -1,
      pastCommands: [],
      history: [
        {
          command: 'whoami',
          output: `<span class="text-cyan">abishek.vp</span> &bull; Senior Software Engineer specializing in Backend Architecture, Enterprise DevOps Integrations, and Identity Providers (IdP).`
        }
      ],
      quickChips: [
        { label: 'help', cmd: 'help' },
        { label: 'about', cmd: 'about' },
        { label: 'skills', cmd: 'skills' },
        { label: 'projects', cmd: 'projects' },
        { label: 'experience', cmd: 'experience' },
        { label: 'sih-winner', cmd: 'sih' },
        { label: 'resume.pdf', cmd: 'resume' },
        { label: 'clear', cmd: 'clear' }
      ]
    };
  },
  methods: {
    focusInput() {
      if (this.$refs.cmdInput) {
        this.$refs.cmdInput.focus();
      }
    },
    runChipCommand(cmd) {
      this.currentCommand = cmd;
      this.executeCommand();
    },
    executeCommand() {
      const rawCmd = this.currentCommand.trim();
      if (!rawCmd) return;

      this.pastCommands.push(rawCmd);
      this.historyIndex = this.pastCommands.length;

      const [command, ...args] = rawCmd.split(' ');
      const output = this.handleCommand(command.toLowerCase(), args);

      if (command.toLowerCase() === 'clear') {
        this.history = [];
      } else {
        this.history.push({ command: rawCmd, output });
      }

      this.currentCommand = '';
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    handleCommand(cmd, args) {
      switch (cmd) {
        case 'help':
          return `
<div class="cmd-table">
  <div><span class="cmd-name">help</span> — Display this command reference guide</div>
  <div><span class="cmd-name">about</span> — Detailed engineer bio, philosophy, and accomplishments</div>
  <div><span class="cmd-name">skills</span> — Full technical stack (Backend, Enterprise Integrations, IdP, DevOps)</div>
  <div><span class="cmd-name">projects</span> — Key enterprise and open-source platform solutions</div>
  <div><span class="cmd-name">experience</span> — Securden career trajectory & vault engineering</div>
  <div><span class="cmd-name">sih</span> — Smart India Hackathon Winner insights</div>
  <div><span class="cmd-name">resume</span> — Download verified CV (PDF) with analytics</div>
  <div><span class="cmd-name">contact</span> — Get in touch via Email, LinkedIn, or GitHub</div>
  <div><span class="cmd-name">whoami</span> — Identity and current context</div>
  <div><span class="cmd-name">sudo hire</span> — Unlock VIP recruiter access</div>
  <div><span class="cmd-name">clear</span> — Clear terminal output</div>
</div>`;

        case 'about':
          return `
<p><strong>Abishek VP</strong> — Senior Software Engineer with 4+ years of expertise building resilient enterprise applications and connecting DevOps toolchains.</p>
<p>&bull; <strong>Backend Architecture:</strong> Designing high-throughput, secure, and resilient enterprise applications.</p>
<p>&bull; <strong>Enterprise Integrations:</strong> Seamlessly connecting and integrating extensive DevOps toolchains.</p>
<p>&bull; <strong>Identity Providers:</strong> Implementing and managing Identity Provider (IdP) integrations.</p>
<p>&bull; <strong>Automated Tooling:</strong> Scripting automations and streamlining workflows with Playwright, BeautifulSoup4, and Selenium, alongside DevOps tools such as Ansible, Jenkins, Terraform, Chef, and Puppet.</p>
<p>&bull; <strong>Awards:</strong> Smart India Hackathon (SIH) Winner.</p>`;

        case 'skills':
          return `
<div class="skills-output">
  <div><span class="text-cyan">Backend Architecture:</span> Python, Django, REST APIs, SQL, PostgreSQL, MongoDB, High-throughput systems</div>
  <div><span class="text-green">Identity Providers (IdP):</span> Active Directory, Entra ID (Azure AD), Google Workspace, SSPR Engine</div>
  <div><span class="text-purple">Enterprise Integrations:</span> Terraform, Ansible, Jenkins, CI/CD, Chef, Puppet, Docker</div>
  <div><span class="text-yellow">Automated Tooling:</span> Playwright, BeautifulSoup4, Selenium, Bash/Shell scripting</div>
</div>`;

        case 'projects':
          return `
<div class="projects-output">
  <div class="project-line">
    &bull; <strong class="text-cyan">Securden Password Vault Plugins</strong> — Custom Ansible & Terraform integrations for automated privileged credential retrieval.
  </div>
  <div class="project-line">
    &bull; <strong class="text-cyan">Enterprise SSPR Engine</strong> — Self-service password reset & directory synchronization platform across Active Directory & Entra ID.
  </div>
  <div class="project-line">
    &bull; <strong class="text-cyan">SIH Winner Platform</strong> — Award-winning distributed solution recognized at national level hackathon.
  </div>
  <p class="mt-2 text-muted">Scroll down to the <a href="#projects" class="term-link">Projects Section</a> for full architecture breakdowns & repos.</p>
</div>`;

        case 'experience':
          return `
<p><strong>Securden Inc.</strong> &bull; Senior Software Engineer (4+ Years)</p>
<p>- Architected credential rotation pipelines and zero-trust vault access protocols.</p>
<p>- Built custom published plugins for DevOps ecosystems (Ansible, Jenkins, Terraform).</p>
<p>- Led enterprise client migrations and identity synchronization modules.</p>`;

        case 'sih':
          return `
<p class="text-yellow"><strong>🏆 SMART INDIA HACKATHON WINNER</strong></p>
<p>Led the team to first place in the national-level Smart India Hackathon, designing and deploying an enterprise-grade automated platform under rigorous evaluation by industry leaders.</p>`;

        case 'resume':
          this.triggerResumeDownload();
          return `
<p class="text-green">&#x2714; Initiating download for <strong>Abishek_VP_Resume.pdf</strong>...</p>
<p class="text-muted">Direct link: <a href="/resume.pdf" download="Abishek_VP_Resume.pdf" data-track="resume" class="term-link">Click here if download did not start</a>.</p>`;

        case 'contact':
          return `
<div class="contact-output">
  <div>&bull; <strong>Email:</strong> <a href="mailto:contact@abishek.in" class="term-link">contact@abishek.in</a></div>
  <div>&bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/abishek-v-p" target="_blank" class="term-link">linkedin.com/in/abishek-v-p</a></div>
  <div>&bull; <strong>GitHub:</strong> <a href="https://github.com/abishekvp" target="_blank" class="term-link">github.com/abishekvp</a></div>
  <div>&bull; <strong>Instagram:</strong> <a href="https://www.instagram.com/abiraj.vp06/" target="_blank" class="term-link">abiraj.vp06</a></div>
</div>`;

        case 'whoami':
          return `You are a distinguished visitor exploring Abishek's platform engineering and security capabilities.`;

        case 'sudo':
          if (args.join(' ') === 'hire') {
            return `
<div class="text-green">
  <strong>[ACCESS GRANTED]</strong> Welcome aboard! Let's build extraordinary platforms together.<br />
  Direct phone/email credentials unlocked. Redirecting to <a href="#contact" class="term-link">#contact</a>.
</div>`;
          }
          return `<span class="text-red">sudo: unknown command. Did you mean 'sudo hire'?</span>`;

        default:
          return `<span class="text-red">zsh: command not found: ${cmd}</span>. Type <span class="cmd-pill">help</span> for a list of valid commands.`;
      }
    },
    navigateHistory(direction) {
      if (direction === 'up' && this.historyIndex > 0) {
        this.historyIndex--;
        this.currentCommand = this.pastCommands[this.historyIndex];
      } else if (direction === 'down' && this.historyIndex < this.pastCommands.length - 1) {
        this.historyIndex++;
        this.currentCommand = this.pastCommands[this.historyIndex];
      } else if (direction === 'down') {
        this.historyIndex = this.pastCommands.length;
        this.currentCommand = '';
      }
    },
    scrollToBottom() {
      const screen = this.$refs.screenRef;
      if (screen) {
        screen.scrollTop = screen.scrollHeight;
      }
    },
    triggerResumeDownload() {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Abishek_VP_Resume.pdf';
      link.setAttribute('data-track', 'resume');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    clearTerminal() {
      this.history = [];
      this.currentCommand = '';
    },
    handleDotClose() {
      this.clearTerminal();
    },
    toggleMaximize() {
      const el = this.$el;
      if (el) el.classList.toggle('terminal-maximized');
    }
  }
};
</script>

<style scoped>
.terminal-container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(var(--accent-rgb, 14, 165, 233), 0.15);
  transition: all var(--transition-base);
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: rgba(13, 20, 36, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
}

.terminal-dots {
  display: flex;
  gap: 8px;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.terminal-dot:hover {
  transform: scale(1.2);
}

.terminal-title {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--color-text-muted);
  letter-spacing: 0.4px;
}

.terminal-user {
  color: var(--color-accent-tertiary);
}

.terminal-path {
  color: #10b981;
}

.terminal-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #10b981;
  letter-spacing: 1px;
}

.status-indicator {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.terminal-screen {
  padding: 1.5rem;
  min-height: 380px;
  max-height: 520px;
  overflow-y: auto;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  line-height: 1.65;
  color: #e2e8f0;
  cursor: text;
}

.ascii-banner {
  color: var(--color-accent-primary);
  font-size: clamp(0.55rem, 1.3vw, 0.82rem);
  line-height: 1.15;
  margin-bottom: 0.8rem;
  font-weight: 700;
  overflow-x: hidden;
  text-shadow: 0 0 12px var(--color-glow-1);
}

.welcome-text {
  margin-bottom: 0.5rem;
  color: #cbd5e1;
}

.welcome-hint {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.history-item {
  margin-bottom: 1rem;
}

.history-cmd-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  margin-bottom: 0.35rem;
}

.prompt-user {
  color: #10b981;
  font-weight: 600;
}

.prompt-path {
  color: var(--color-accent-tertiary);
  font-weight: 600;
}

.history-command {
  color: #ffffff;
  font-weight: 500;
}

.history-output {
  color: #cbd5e1;
  padding-left: 0.5rem;
  border-left: 2px solid rgba(255, 255, 255, 0.08);
}

.terminal-input-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: #ffffff;
  caret-color: transparent; /* custom cursor */
}

/* Chips Toolbar */
.terminal-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(8, 12, 22, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.chips-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-right: 0.3rem;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--color-accent-tertiary);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-btn:hover {
  background: var(--color-accent-primary);
  color: #ffffff;
  border-color: var(--color-accent-primary);
  transform: translateY(-1px);
}

/* Helpers */
.cmd-pill {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--color-accent-primary);
  font-family: var(--font-mono);
}

.text-accent { color: var(--color-accent-primary); }
.text-cyan { color: #38bdf8; }
.text-green { color: #10b981; }
.text-purple { color: #c084fc; }
.text-yellow { color: #fbbf24; }
.text-red { color: #f87171; }

.term-link {
  color: var(--color-accent-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.cmd-table {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.4rem 0;
}

.cmd-name {
  color: #38bdf8;
  font-weight: 600;
  display: inline-block;
  width: 100px;
}

@media (max-width: 768px) {
  .terminal-screen {
    padding: 1rem;
    min-height: 280px;
    max-height: 380px;
    font-size: 0.8rem;
  }

  .terminal-chips {
    padding: 0.5rem 0.8rem;
  }
}
</style>
