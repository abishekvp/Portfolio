import localData from '../data/portfolio.json';

class PortfolioService {
  constructor() {
    this.data = { ...localData };
    this.isLoaded = false;
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    if (this.isLoaded) {
      callback(this.data);
    }
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try {
        cb(this.data);
      } catch (err) {
        console.error('PortfolioService subscriber error:', err);
      }
    });
  }

  async init() {
    const fetchApi = async () => {
      if (typeof window !== 'undefined' && typeof window.getPortfolioData === 'function') {
        return window.getPortfolioData();
      }
      if (typeof window !== 'undefined' && window.PortfolioManager && typeof window.PortfolioManager.getPortfolioData === 'function') {
        return window.PortfolioManager.getPortfolioData();
      }
      return null;
    };

    let apiResult = null;
    try {
      apiResult = await fetchApi();
    } catch (e) {
      // Ignored
    }

    // If script is still downloading async, poll briefly for up to 3 seconds
    if (!apiResult && typeof window !== 'undefined') {
      for (let i = 0; i < 6; i++) {
        await new Promise(r => setTimeout(r, 500));
        try {
          apiResult = await fetchApi();
          if (apiResult) break;
        } catch (e) {
          // Ignored
        }
      }
    }

    if (apiResult && apiResult.data) {
      this.mergeApiData(apiResult.data);
    }

    this.isLoaded = true;
    this.notify();
    return this.data;
  }

  mergeApiData(apiData) {
    if (apiData.profile && Object.keys(apiData.profile).length > 0) {
      const p = apiData.profile;
      if (p.full_name) this.data.hero = { ...this.data.hero, name: p.full_name };
      if (p.headline) this.data.hero = { ...this.data.hero, title: p.headline };
      if (p.bio && this.data.about) {
        this.data.about.bio = this.data.about.bio || {};
        this.data.about.bio.paragraphs = [p.bio, ...(this.data.about.bio.paragraphs || []).slice(1)];
      }
      if (p.resume_url) {
        this.data.resumeUrl = p.resume_url;
      }
    }

    if (Array.isArray(apiData.projects) && apiData.projects.length > 0) {
      this.data.projects = this.data.projects || { items: [] };
      const mappedProjects = apiData.projects.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        tags: Array.isArray(item.tech_stack) ? item.tech_stack : (item.tech_stack ? item.tech_stack.split(',').map(s => s.trim()) : []),
        demo: item.demo_url,
        github: item.github_url,
        featured: item.is_featured,
        order: item.order
      }));
      this.data.apiProjects = mappedProjects;
    }

    if (Array.isArray(apiData.experience) && apiData.experience.length > 0) {
      this.data.apiExperience = apiData.experience;
    }

    if (Array.isArray(apiData.skills) && apiData.skills.length > 0) {
      this.data.apiSkills = apiData.skills;
    }

    if (Array.isArray(apiData.testimonials) && apiData.testimonials.length > 0) {
      this.data.apiTestimonials = apiData.testimonials.map(t => ({
        name: t.name,
        title: `${t.role || ''}${t.company ? ' at ' + t.company : ''}`.trim() || 'Colleague / Client',
        text: t.content,
        rating: t.rating || 5,
        photo: t.photo_url
      }));
    }
  }

  getData() {
    return this.data;
  }
}

export const portfolioService = new PortfolioService();
