<script setup>
import content from '../data/content.js'
const { process } = content
</script>

<template>
  <section class="section-padding process-section" id="processo">
    <v-container style="max-width: 1200px">
      <div class="text-center" data-aos="fade-up">
        <div class="accent-line mx-auto" />
        <h2 class="section-title">{{ process.sectionTitle }}</h2>
        <p class="section-subtitle">{{ process.sectionSubtitle }}</p>
      </div>

      <v-row class="mt-4">
        <v-col
          v-for="(step, i) in process.steps"
          :key="i"
          cols="12"
          sm="6"
          md="3"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <div class="process-step" style="padding-top: 32px; position: relative">
            <!-- Ghost number -->
            <div class="process-number">{{ step.step }}</div>

            <!-- Icon circle -->
            <div class="process-icon-circle mx-auto mb-5">
              <v-icon size="34" color="white">{{ step.icon }}</v-icon>
            </div>

            <!-- Connector line (not on last item, only md+) -->
            <div
              v-if="i < process.steps.length - 1"
              class="process-connector d-none d-md-block"
            />

            <div class="text-center">
              <h3
                style="
                  font-family: Montserrat, sans-serif;
                  font-weight: 700;
                  font-size: 1rem;
                  color: #1E3A47;
                  margin-bottom: 10px;
                "
              >
                {{ step.title }}
              </h3>
              <p style="color: #6B7280; font-size: 0.88rem; line-height: 1.7; margin: 0">
                {{ step.description }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
