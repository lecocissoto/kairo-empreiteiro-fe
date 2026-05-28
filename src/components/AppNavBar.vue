<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import content from '../data/content.js'

defineEmits(['open-quote'])

const { nav, brand } = content
const isScrolled = ref(false)
const drawer = ref(false)

let handleScroll
onMounted(() => {
  handleScroll = () => { isScrolled.value = window.scrollY > 60 }
  window.addEventListener('scroll', handleScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function scrollTo(href) {
  drawer.value = false
  const el = document.querySelector(href)
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, drawer.value ? 300 : 0)
  }
}
</script>

<template>
  <v-app-bar
    class="app-navbar"
    :color="isScrolled ? 'primary' : undefined"
    :elevation="isScrolled ? 3 : 0"
    :style="!isScrolled ? { background: 'linear-gradient(180deg, rgba(15,32,48,0.72) 0%, transparent 100%)' } : {}"
    height="68"
  >
    <v-container class="d-flex align-center pa-0" style="max-width: 1200px">
      <!-- Logo -->
      <a href="#" class="text-decoration-none d-flex align-center" style="gap: 4px">
        <span class="footer-logo-text" style="font-size: 1.35rem">
          <span class="accent">K</span>airo
        </span>
        <span
          :style="{
            color: isScrolled ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.7)',
            fontSize: '0.6rem',
            letterSpacing: '3px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            marginLeft: '6px',
            marginTop: '2px',
            display: 'block',
          }"
        >
          EMPREITEIRO
        </span>
      </a>

      <v-spacer />

      <!-- Desktop nav -->
      <nav class="d-none d-md-flex align-center" style="gap: 8px">
        <a
          v-for="link in nav.links"
          :key="link.href"
          class="nav-link px-3 py-1"
          :style="{ color: isScrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.9)' }"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
        <v-btn
          color="secondary"
          size="small"
          class="ml-3 font-weight-bold"
          style="letter-spacing: 0.4px"
          @click="$emit('open-quote')"
        >
          {{ nav.ctaLabel }}
        </v-btn>
      </nav>

      <!-- Mobile hamburger -->
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        :color="'white'"
        @click="drawer = true"
      />
    </v-container>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    width="280"
  >
    <div class="pa-6" style="background: #1E3A47; min-height: 100%">
      <div class="d-flex justify-space-between align-center mb-8">
        <span class="footer-logo-text">
          <span class="accent">K</span>airo
          <span style="font-size: 0.6rem; letter-spacing: 3px; opacity: 0.7; display: block">EMPREITEIRO</span>
        </span>
        <v-btn icon variant="text" color="white" @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="d-flex flex-column" style="gap: 8px">
        <a
          v-for="link in nav.links"
          :key="link.href"
          class="nav-link py-3"
          style="color: rgba(255,255,255,0.85); font-size: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1)"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
      </div>

      <v-btn
        color="secondary"
        block
        size="large"
        class="mt-8 font-weight-bold"
        @click="$emit('open-quote'); drawer = false"
      >
        {{ nav.ctaLabel }}
      </v-btn>

      <div class="mt-6 text-center">
        <a
          :href="`https://wa.me/${content.brand.phone}`"
          target="_blank"
          rel="noopener"
          style="color: #25D366; text-decoration: none; font-size: 0.9rem; font-weight: 600"
        >
          <v-icon size="18" style="color: #25D366" class="mr-1">mdi-whatsapp</v-icon>
          {{ brand.whatsappDisplay }}
        </a>
      </div>
    </div>
  </v-navigation-drawer>
</template>
