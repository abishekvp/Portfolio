<template>
  <section id="testimonials" class="section testimonials-section">
    <div class="container">
      <div class="section-title">
        <div class="code-badge mb-2">
          <span>// 06. PEER_ENDORSEMENTS</span>
        </div>
        <h2>Testimonials & <span class="gradient-text">Feedback</span></h2>
        <p class="text-secondary">What colleagues, students, and clients say about my platform guidance and security engineering.</p>
      </div>

      <!-- Action Button: Open Testimonial Submission Form -->
      <div class="testimonial-actions-bar">
        <button class="btn btn-glass write-testimonial-btn" @click="showModal = true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <span>Share Your Testimonial / Endorsement</span>
        </button>
      </div>

      <!-- Testimonials Grid with 3D Flip Cards -->
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in allTestimonials"
          :key="index"
          class="testimonial-card-wrapper"
        >
          <div class="testimonial-card-inner">
            <!-- Front of Card -->
            <div class="testimonial-card-front glass-card">
              <div class="card-top-row">
                <div class="verified-pill font-mono">
                  <span class="verified-check">✓</span> Endorsement
                </div>
                <div class="quote-icon">“</div>
              </div>

              <div class="author-avatar-wrap">
                <img
                  v-if="testimonial.photo"
                  :src="testimonial.photo"
                  :alt="testimonial.name"
                  class="author-avatar"
                />
                <div v-else class="author-avatar-fallback">
                  {{ getInitials(testimonial.name) }}
                </div>
              </div>

              <h3 class="author-name">{{ testimonial.name }}</h3>
              <p class="author-title">{{ testimonial.title }}</p>
              <div class="flip-hint font-mono">Hover to read note &rarr;</div>
            </div>

            <!-- Back of Card -->
            <div class="testimonial-card-back glass-card">
              <div class="quote-mark font-mono">// VERIFIED_ENDORSEMENT</div>
              <p class="testimonial-text">{{ testimonial.text }}</p>
              <div class="author-info-back">
                <strong>{{ testimonial.name }}</strong>
                <span class="back-title">{{ testimonial.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonial Submission Modal (Auto-handled by portfolio_manager.js via data-abishek-testimonial) -->
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal-dialog glass-terminal">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="terminal-dot red" @click="closeModal"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
            </div>
            <div class="terminal-title">submit_testimonial.sh</div>
            <button class="modal-close-btn" @click="closeModal">&times;</button>
          </div>

          <div class="modal-body">
            <h3>Share Your Testimonial</h3>
            <p class="modal-desc">
              Your feedback is deeply appreciated and directly syncs to the admin platform for review.
            </p>

            <form data-abishek-testimonial enctype="multipart/form-data" class="testimonial-form">
              <div class="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sarah Jenifer"
                  class="glass-input"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Your Role</label>
                  <input
                    type="text"
                    name="role"
                    placeholder="e.g. VP of Engineering"
                    class="glass-input"
                  />
                </div>
                <div class="form-group">
                  <label>Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Acme Corp"
                    class="glass-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label font-mono">Profile Photo (Optional)</label>
                <div class="custom-file-upload-wrap">
                  <input
                    type="file"
                    id="testimonial-photo-input"
                    ref="photoInput"
                    name="photo"
                    accept="image/*"
                    class="hidden-file-input"
                    @change="handleFileSelected"
                  />
                  <label for="testimonial-photo-input" class="theme-file-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>{{ selectedFileName ? 'Change Photo' : 'Choose Photo File' }}</span>
                  </label>

                  <div v-if="selectedFileName" class="file-preview-pill">
                    <img v-if="filePreviewUrl" :src="filePreviewUrl" alt="Photo Preview" class="file-thumb" />
                    <span class="file-name font-mono">{{ selectedFileName }}</span>
                    <button type="button" class="file-remove-btn" @click.prevent="clearSelectedFile" title="Remove photo">&times;</button>
                  </div>
                  <span v-else class="file-hint font-mono">JPG, PNG, WebP</span>
                </div>
              </div>

              <!-- Rating parameter preserved silently for backend synchronization -->
              <input type="hidden" name="rating" value="5" />

              <div class="form-group">
                <label>Testimonial Content *</label>
                <textarea
                  name="content"
                  required
                  rows="4"
                  placeholder="Describe your experience collaborating with Abishek..."
                  class="glass-input"
                ></textarea>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-glass" @click="closeModal">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  Submit Testimonial
                </button>
              </div>

              <!-- Intercepted response container -->
              <div class="testimonial-response" style="display:none;"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { portfolioService } from "../services/portfolioService";

export default {
  name: 'TestimonialsSection',
  data() {
    return {
      showModal: false,
      selectedFileName: '',
      filePreviewUrl: null,
      apiTestimonials: [],
      defaultTestimonials: [
        {
          name: "Rahul M.",
          title: "Mentee & Software Engineer",
          text: "The guidance I received on platform engineering and backend scalability was invaluable. Abishek helped me master enterprise security best practices that completely accelerated my career.",
          rating: 5
        },
        {
          name: "Sarah J.",
          title: "Startup Founder & Advisor Client",
          text: "As a strategic advisor, Abishek's insights into password vault integration and automated identity synchronization transformed our security architecture. Highly recommended.",
          rating: 5
        },
        {
          name: "Vikram S.",
          title: "Computer Science Student & SIH Contender",
          text: "Mentorship sessions were a game-changer. The deep dive into DevOps automation, Terraform plugins, and active directory workflows gave me a decisive edge in the industry.",
          rating: 5
        }
      ]
    };
  },
  computed: {
    allTestimonials() {
      if (this.apiTestimonials && this.apiTestimonials.length > 0) {
        return this.apiTestimonials;
      }
      return this.defaultTestimonials;
    }
  },
  mounted() {
    portfolioService.subscribe((data) => {
      if (data && data.apiTestimonials && data.apiTestimonials.length > 0) {
        this.apiTestimonials = data.apiTestimonials;
      }
    });
  },
  beforeUnmount() {
    if (this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
    }
  },
  methods: {
    getInitials(name) {
      if (!name) return 'A';
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    },
    handleFileSelected(event) {
      const file = event.target.files && event.target.files[0];
      if (file) {
        this.selectedFileName = file.name;
        if (this.filePreviewUrl) {
          URL.revokeObjectURL(this.filePreviewUrl);
        }
        this.filePreviewUrl = URL.createObjectURL(file);
      } else {
        this.clearSelectedFile();
      }
    },
    clearSelectedFile() {
      this.selectedFileName = '';
      if (this.filePreviewUrl) {
        URL.revokeObjectURL(this.filePreviewUrl);
        this.filePreviewUrl = null;
      }
      if (this.$refs.photoInput) {
        this.$refs.photoInput.value = '';
      }
    },
    closeModal() {
      this.showModal = false;
      this.clearSelectedFile();
    }
  }
};
</script>

<style scoped>
.testimonials-section {
  position: relative;
  z-index: 1;
}

.mb-2 {
  margin-bottom: 0.75rem;
}

.font-mono {
  font-family: var(--font-mono);
}

.testimonial-actions-bar {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.write-testimonial-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  perspective: 1200px;
}

.testimonial-card-wrapper {
  background-color: transparent;
  height: 380px;
  perspective: 1200px;
  cursor: pointer;
}

.testimonial-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}

.testimonial-card-wrapper:hover .testimonial-card-inner {
  transform: rotateY(180deg);
}

.testimonial-card-front,
.testimonial-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.testimonial-card-front {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid var(--glass-border);
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.testimonial-card-back {
  background: rgba(10, 15, 28, 0.85);
  border: 1px solid var(--glass-border-hover);
  transform: rotateY(180deg);
  text-align: left;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.6), 0 15px 45px rgba(0, 0, 0, 0.6);
}

.card-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.75rem;
}

.verified-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  color: var(--color-accent-primary);
  background: rgba(var(--accent-rgb, 14, 165, 233), 0.12);
  border: 1px solid var(--glass-border);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  letter-spacing: 0.5px;
}

.verified-check {
  color: #10b981;
  font-weight: 700;
}

.quote-icon {
  font-size: 3rem;
  line-height: 1;
  color: var(--color-accent-primary);
  opacity: 0.35;
}

.author-avatar-wrap {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  margin-bottom: 1rem;
  overflow: hidden;
  border: 2px solid var(--color-accent-primary);
  box-shadow: 0 0 15px var(--color-glow-1);
}

.author-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
  font-family: var(--font-display);
}

.author-name {
  font-size: 1.35rem;
  margin-bottom: 0.25rem;
  color: var(--color-text-primary);
}

.author-title {
  color: var(--color-accent-tertiary);
  font-size: 0.9rem;
  font-weight: 500;
}

.flip-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 1px;
  margin-top: 1.5rem;
}

.quote-mark {
  font-size: 0.75rem;
  color: #10b981;
  letter-spacing: 1px;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  font-style: italic;
  margin: 1rem 0;
  flex-grow: 1;
}

.author-info-back {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
}

.author-info-back strong {
  color: var(--color-text-primary);
  font-size: 0.95rem;
}

.back-title {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-dialog {
  width: 100%;
  max-width: 580px;
  background: rgba(15, 23, 42, 0.92);
  border: 1px solid var(--glass-border-hover);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 1;
}

.modal-close-btn:hover {
  color: #ffffff;
}

.modal-body {
  padding: 1.75rem;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-body h3 {
  font-size: 1.4rem;
  margin-bottom: 0.35rem;
}

.modal-desc {
  font-size: 0.88rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
}

.testimonial-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.82rem;
  font-family: var(--font-mono);
  color: var(--color-text-secondary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.glass-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.92rem;
  outline: none;
  transition: all var(--transition-fast);
}

.glass-input:focus {
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 10px var(--color-glow-1);
}

/* Custom File Upload Theme Button */
.custom-file-upload-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.25rem 0;
}

.hidden-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.theme-file-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.15rem;
  border-radius: var(--radius-md);
  background: var(--gradient-primary);
  color: #ffffff;
  font-family: var(--font-display, inherit);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px var(--color-glow-1), 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-fast);
  user-select: none;
}

.theme-file-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--color-glow-1), 0 4px 12px rgba(0, 0, 0, 0.4);
  filter: brightness(1.1);
}

.theme-file-btn:active {
  transform: translateY(0);
}

.file-preview-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.file-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-accent-primary);
}

.file-name {
  font-size: 0.8rem;
  color: var(--color-text-primary);
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-remove-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.15rem;
  line-height: 1;
  padding: 0 0.15rem;
  transition: color var(--transition-fast);
}

.file-remove-btn:hover {
  color: #ef4444;
}

.file-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
