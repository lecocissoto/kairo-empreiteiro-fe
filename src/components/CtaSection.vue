<script setup>
import content from '../data/content.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'

defineEmits(['open-quote'])

const { cta } = content
const { openWithIntro } = useWhatsApp()
</script>

<template>
  <section class="cta-section" id="orcamento">
    <v-container style="max-width: 900px; position: relative; z-index: 1">
      <div class="text-center" data-aos="fade-up">
        <div class="accent-line mx-auto mb-4" style="background: rgba(245,155,10,0.7)" />

        <h2 class="cta-headline" data-aos="fade-up" data-aos-delay="50">
          {{ cta.headline }}
        </h2>

        <p
          class="mt-3 mb-8"
          style="color: rgba(255,255,255,0.7); font-size: 1.05rem; line-height: 1.7; max-width: 560px; margin-left: auto; margin-right: auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {{ cta.subheadline }}
        </p>

        <div
          class="d-flex flex-wrap justify-center"
          style="gap: 16px"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <v-btn
            color="secondary"
            size="x-large"
            class="font-weight-bold px-8"
            style="font-size: 1rem; height: 56px"
            @click="$emit('open-quote')"
          >
            <v-icon start>mdi-file-document-edit-outline</v-icon>
            {{ cta.ctaPrimary.label }}
          </v-btn>

          <v-btn
            variant="outlined"
            size="x-large"
            class="font-weight-bold px-8"
            style="color: white; border-color: rgba(255,255,255,0.5); font-size: 1rem; height: 56px"
            @click="openWithIntro"
          >
            <v-icon start>mdi-whatsapp</v-icon>
            {{ cta.ctaSecondary.label }}
          </v-btn>
        </div>

        <!-- Trust indicators -->
        <div
          class="d-flex flex-wrap justify-center mt-8"
          style="gap: 24px; color: rgba(255,255,255,0.5); font-size: 0.82rem"
          data-aos="fade-up"
          data-aos-delay="220"
        >
          <span class="d-flex align-center" style="gap: 6px">
            <v-icon size="14" color="secondary">mdi-check-circle</v-icon>
            Orçamento 100% gratuito
          </span>
          <span class="d-flex align-center" style="gap: 6px">
            <v-icon size="14" color="secondary">mdi-check-circle</v-icon>
            Sem compromisso
          </span>
          <span class="d-flex align-center" style="gap: 6px">
            <v-icon size="14" color="secondary">mdi-check-circle</v-icon>
            Resposta em até 24h
          </span>
        </div>
      </div>
    </v-container>
  </section>
</template>
