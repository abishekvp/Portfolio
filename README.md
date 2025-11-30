# Portfolio Website

A stunning, professional portfolio website built with Vue.js featuring a neo-black theme, glassmorphism effects, and premium UI design.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The development server will start at `http://localhost:5173`

## ✨ Features

- **Neo-Black Theme**: Deep black backgrounds with elegant gray accents
- **Glassmorphism UI**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Fade-ins, slides, and hover effects
- **Fully Responsive**: Mobile-first design that works on all devices
- **Modern Stack**: Built with Vue 3 and Vite for optimal performance
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Global styles & design system
│   ├── components/
│   │   ├── NavigationBar.vue     # Sticky navigation
│   │   ├── HeroSection.vue       # Landing hero
│   │   ├── AboutSection.vue      # About me
│   │   ├── SkillsSection.vue     # Skills showcase
│   │   ├── ProjectsSection.vue   # Project portfolio
│   │   ├── ExperienceSection.vue # Work timeline
│   │   └── ContactSection.vue    # Contact & social links
│   ├── App.vue                   # Main app component
│   └── main.js                   # App entry point
├── index.html                    # HTML entry point
├── vite.config.js               # Vite configuration
└── package.json                 # Project dependencies

```

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **Hero Section** (`src/components/HeroSection.vue`):

   - Change "Your Name" to your actual name
   - Update the subtitle and description
   - Modify the stats (years of experience, projects, clients)

2. **About Section** (`src/components/AboutSection.vue`):

   - Replace the bio text with your story
   - Add your profile image in the `.about-image` div

3. **Skills Section** (`src/components/SkillsSection.vue`):

   - Update the `skillCategories` array with your actual skills
   - Adjust skill levels (0-100%)

4. **Projects Section** (`src/components/ProjectsSection.vue`):

   - Replace placeholder projects with your actual projects
   - Add project images or screenshots
   - Update demo and GitHub links

5. **Experience Section** (`src/components/ExperienceSection.vue`):

   - Update the `experiences` array with your work history
   - Modify job titles, companies, dates, and achievements

6. **Contact Section** (`src/components/ContactSection.vue`):
   - Update email, phone, and location
   - Replace social media links with your profiles

### Colors & Theme

All colors are defined in `src/assets/styles/main.css` using CSS custom properties:

```css
:root {
  --color-accent-primary: #8b5cf6; /* Purple */
  --color-accent-secondary: #06b6d4; /* Cyan */
  --color-accent-tertiary: #a855f7; /* Violet */
}
```

### Meta Tags

Update SEO information in `index.html`:

- `<title>` tag
- Meta description
- Meta author
- Social media preview images (add Open Graph tags)

## 🎯 Design System

### Glassmorphism Classes

- `.glass` - Standard glass effect
- `.glass-strong` - Stronger glass effect
- `.glass-card` - Glass card with padding and hover effects

### Spacing

Uses a consistent spacing scale:

- `--spacing-xs`: 0.5rem
- `--spacing-sm`: 1rem
- `--spacing-md`: 1.5rem
- `--spacing-lg`: 2rem
- `--spacing-xl`: 3rem
- `--spacing-2xl`: 4rem
- `--spacing-3xl`: 6rem

### Typography

- **Display Font**: Outfit (headings)
- **Body Font**: Inter (paragraphs)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🛠️ Tech Stack

- **Framework**: Vue.js 3
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS Custom Properties
- **Fonts**: Google Fonts (Inter, Outfit)

## 📝 License

Feel free to use this template for your personal portfolio!

---

Built with ❤️ and Vue.js
