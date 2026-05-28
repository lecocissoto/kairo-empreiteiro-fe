<script setup>
import content from '../data/content.js'

defineEmits(['open-quote'])

const { hero } = content

function scrollToGallery() {
  const el = document.querySelector(hero.ctaSecondary.href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    class="hero-section"
    :style="{
      backgroundImage: `url('${hero.backgroundImage}'), url('${hero.backgroundImageFallback}')`,
    }"
    id="inicio"
  >
    <div class="hero-overlay" />

    <v-container class="hero-content" style="max-width: 1200px">
      <v-row justify="start" align="center">
        <v-col cols="12" md="8" lg="7">
          <!-- Badge -->
          <div data-aos="fade-down" data-aos-delay="0">
            <v-chip
              color="secondary"
              size="small"
              class="mb-5 font-weight-bold"
              style="letter-spacing: 1px; font-size: 0.7rem"
            >
              <v-icon start size="14">mdi-map-marker</v-icon>
              SÃO PAULO E GRANDE SP
            </v-chip>
          </div>

          <!-- Headline -->
          <h1 class="hero-headline" data-aos="fade-up" data-aos-delay="100">
            {{ hero.headline }}<br />
            <span class="accent">{{ hero.headlineAccent }}</span>
          </h1>

          <!-- Subheadline -->
          <p class="hero-subheadline" data-aos="fade-up" data-aos-delay="220">
            {{ hero.subheadline }}
          </p>

          <!-- CTAs -->
          <div
            class="d-flex flex-wrap align-center"
            style="gap: 16px"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <v-btn
              color="secondary"
              size="large"
              class="font-weight-bold px-7"
              style="font-size: 0.95rem; height: 52px; letter-spacing: 0.4px"
              @click="$emit('open-quote')"
            >
              <v-icon start>mdi-file-document-edit-outline</v-icon>
              {{ hero.ctaPrimary.label }}
            </v-btn>

            <v-btn
              variant="outlined"
              size="large"
              class="font-weight-bold px-6"
              style="color: white; border-color: rgba(255,255,255,0.6); font-size: 0.95rem; height: 52px"
              @click="scrollToGallery"
            >
              <v-icon start>mdi-image-multiple-outline</v-icon>
              {{ hero.ctaSecondary.label }}
            </v-btn>
          </div>

          <!-- Social proof mini -->
          <div
            class="d-flex align-center mt-8"
            style="gap: 24px"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <div class="d-flex align-center" style="gap: 6px">
              <v-icon size="16" color="secondary">mdi-star</v-icon>
              <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem; font-weight: 600">
                200+ obras entregues
              </span>
            </div>
            <div
              style="width: 1px; height: 16px; background: rgba(255,255,255,0.3)"
            />
            <div class="d-flex align-center" style="gap: 6px">
              <v-icon size="16" color="secondary">mdi-shield-check</v-icon>
              <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem; font-weight: 600">
                Garantia total
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Scroll indicator -->
    <div
      class="scroll-indicator"
      style="position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 2"
    >
      <v-icon size="32" style="color: rgba(255,255,255,0.5)">mdi-chevron-double-down</v-icon>
    </div>
  </section>
</template>
