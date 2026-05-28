<script setup>
import content from '../data/content.js'

const emit = defineEmits(['open-quote'])
const { brand, footer } = content

function handleLink(link) {
  if (link.action === 'openQuote') {
    emit('open-quote')
  } else if (link.href) {
    const el = document.querySelector(link.href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="app-footer" id="rodape">
    <v-container style="max-width: 1200px">
      <v-row>
        <!-- Brand column -->
        <v-col cols="12" md="4" class="mb-6 mb-md-0">
          <div class="footer-logo-text mb-3" style="font-size: 1.5rem">
            <span class="accent">K</span>airo
            <span style="font-size: 0.6rem; letter-spacing: 3px; opacity: 0.6; display: block; margin-top: 2px">
              EMPREITEIRO
            </span>
          </div>
          <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.7; max-width: 260px; margin-bottom: 20px">
            {{ footer.tagline }}
          </p>
          <a
            :href="`https://wa.me/${brand.phone}`"
            target="_blank"
            rel="noopener"
            class="d-flex align-center"
            style="color: #25D366; text-decoration: none; font-weight: 600; font-size: 0.95rem; width: fit-content"
          >
            <v-icon size="20" class="mr-2" style="color: #25D366">mdi-whatsapp</v-icon>
            {{ brand.whatsappDisplay }}
          </a>
        </v-col>

        <!-- Quick links -->
        <v-col cols="6" md="4" class="mb-6 mb-md-0">
          <h4 style="color: white; font-family: Montserrat, sans-serif; font-weight: 700; margin-bottom: 20px; font-size: 0.95rem; letter-spacing: 0.5px; text-transform: uppercase">
            Links Rápidos
          </h4>
          <div class="d-flex flex-column" style="gap: 10px">
            <span
              v-for="link in footer.quickLinks"
              :key="link.label"
              class="footer-link"
              @click="handleLink(link)"
            >
              {{ link.label }}
            </span>
          </div>
        </v-col>

        <!-- Contact info -->
        <v-col cols="6" md="4">
          <h4 style="color: white; font-family: Montserrat, sans-serif; font-weight: 700; margin-bottom: 20px; font-size: 0.95rem; letter-spacing: 0.5px; text-transform: uppercase">
            Contato
          </h4>
          <div class="d-flex flex-column" style="gap: 12px">
            <a
              :href="`https://wa.me/${brand.phone}`"
              target="_blank"
              rel="noopener"
              class="d-flex align-center footer-link"
              style="text-decoration: none"
            >
              <v-icon size="17" class="mr-2" style="color: rgba(245,155,10,0.9)">mdi-whatsapp</v-icon>
              {{ brand.whatsappDisplay }}
            </a>
            <a
              :href="`mailto:${brand.email}`"
              class="d-flex align-center footer-link"
              style="text-decoration: none"
            >
              <v-icon size="17" class="mr-2" style="color: rgba(245,155,10,0.9)">mdi-email-outline</v-icon>
              {{ brand.email }}
            </a>
            <div class="d-flex align-center footer-link">
              <v-icon size="17" class="mr-2" style="color: rgba(245,155,10,0.9)">mdi-map-marker-outline</v-icon>
              {{ brand.address }}
            </div>
            <div class="d-flex align-center footer-link" style="font-size: 0.8rem">
              <v-icon size="16" class="mr-2" style="color: rgba(245,155,10,0.9)">mdi-map-radius</v-icon>
              {{ brand.areaAtendimento }}
            </div>
          </div>
        </v-col>
      </v-row>

      <v-divider class="footer-divider" />

      <div class="d-flex flex-column flex-sm-row justify-space-between align-center" style="gap: 8px">
        <p style="color: rgba(255,255,255,0.4); font-size: 0.8rem; margin: 0">
          {{ footer.copyright }}
        </p>
        <p style="color: rgba(255,255,255,0.3); font-size: 0.75rem; margin: 0">
          São Paulo e Grande SP
        </p>
      </div>
    </v-container>
  </footer>
</template>
