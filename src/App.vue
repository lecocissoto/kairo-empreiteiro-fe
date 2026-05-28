<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import AppNavBar from './components/AppNavBar.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ProcessSection from './components/ProcessSection.vue'
import GallerySection from './components/GallerySection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import CtaSection from './components/CtaSection.vue'
import AppFooter from './components/AppFooter.vue'
import QuoteModal from './components/QuoteModal.vue'
import FloatingWhatsApp from './components/FloatingWhatsApp.vue'

const quoteOpen = ref(false)

function openQuote() {
  quoteOpen.value = true
}

onMounted(() => {
  AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
  })
})
</script>

<template>
  <v-app>
    <AppNavBar @open-quote="openQuote" />
    <v-main>
      <HeroSection @open-quote="openQuote" />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />
      <CtaSection @open-quote="openQuote" />
      <AppFooter @open-quote="openQuote" />
    </v-main>
    <QuoteModal v-model="quoteOpen" />
    <FloatingWhatsApp />
  </v-app>
</template>
