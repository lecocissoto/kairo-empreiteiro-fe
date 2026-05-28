<script setup>
import content from '../data/content.js'
const { testimonials } = content
</script>

<template>
  <section class="section-padding" id="depoimentos" style="background: #F5F7F8">
    <v-container style="max-width: 1200px">
      <div class="text-center" data-aos="fade-up">
        <div class="accent-line mx-auto" />
        <h2 class="section-title">{{ testimonials.sectionTitle }}</h2>
        <p class="section-subtitle">{{ testimonials.sectionSubtitle }}</p>
      </div>

      <v-row>
        <v-col
          v-for="(item, i) in testimonials.items"
          :key="i"
          cols="12"
          md="4"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <v-card class="testimonial-card pa-6 h-100" elevation="0" style="border: 1px solid #E5E7EB; background: white">
            <!-- Quote mark -->
            <span class="testimonial-quote">"</span>

            <!-- Stars -->
            <div class="d-flex mb-3" style="gap: 2px; margin-top: -4px">
              <v-icon
                v-for="n in item.rating"
                :key="n"
                size="16"
                color="secondary"
              >
                mdi-star
              </v-icon>
            </div>

            <!-- Text -->
            <p
              style="
                color: #4B5563;
                font-size: 0.92rem;
                line-height: 1.75;
                font-style: italic;
                margin-bottom: 20px;
                flex: 1;
              "
            >
              {{ item.text }}
            </p>

            <!-- Author -->
            <div class="d-flex align-center" style="gap: 12px">
              <v-avatar
                size="42"
                :style="{ background: item.color }"
              >
                <span style="color: white; font-weight: 700; font-size: 0.85rem; font-family: Montserrat, sans-serif">
                  {{ item.initials }}
                </span>
              </v-avatar>
              <div>
                <div style="font-weight: 700; font-size: 0.9rem; color: #1E3A47; font-family: Montserrat, sans-serif">
                  {{ item.name }}
                </div>
                <div style="font-size: 0.78rem; color: #9CA3AF; display: flex; align-items: center; gap: 4px">
                  <v-icon size="12" color="secondary">mdi-map-marker</v-icon>
                  {{ item.location }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
