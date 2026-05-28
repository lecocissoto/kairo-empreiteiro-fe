<script setup>
import content from '../data/content.js'
const { services } = content
</script>

<template>
  <section class="section-padding" id="servicos" style="background: #F5F7F8">
    <v-container style="max-width: 1200px">
      <div class="text-center" data-aos="fade-up">
        <div class="accent-line mx-auto" />
        <h2 class="section-title">{{ services.sectionTitle }}</h2>
        <p class="section-subtitle">{{ services.sectionSubtitle }}</p>
      </div>

      <v-row>
        <v-col
          v-for="(service, i) in services.items"
          :key="service.id"
          cols="12"
          sm="6"
          md="4"
          data-aos="fade-up"
          :data-aos-delay="(i % 3) * 100"
        >
          <v-card
            class="service-card pa-6 h-100"
            elevation="0"
            style="border: 1px solid #E5E7EB; background: white"
          >
            <div class="service-icon-wrap">
              <v-icon size="32" color="primary">{{ service.icon }}</v-icon>
            </div>

            <h3
              style="
                font-family: Montserrat, sans-serif;
                font-weight: 700;
                font-size: 1.05rem;
                color: #1E3A47;
                margin-bottom: 10px;
              "
            >
              {{ service.title }}
            </h3>

            <p style="color: #6B7280; font-size: 0.9rem; line-height: 1.7; margin: 0">
              {{ service.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
