<template>
  <div class="hero-wrapper">
    <!-- Switch between HeroGlass and HeroSpotlight by changing the component name below -->
    <HeroSpotlight />
    <!-- To use the previous glass design, swap HeroSpotlight with HeroGlass -->
  </div>
</template>

<script>
import HeroGlass from './templates/HeroGlass.vue'
import HeroSpotlight from './templates/HeroSpotlight.vue'

export default {
  name: 'HeroSection',
  components: {
    HeroGlass,
    HeroSpotlight
  }
}
</script>

<style scoped>
.hero-wrapper {
  width: 100%;
}
</style>
