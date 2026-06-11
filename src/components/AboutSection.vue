<script setup>
import content from '../data/content.js'
const { about } = content
</script>

<template>
  <section class="section-padding" id="sobre" style="background: #FFFFFF">
    <v-container style="max-width: 1200px">
      <v-row align="center" style="gap: 0">
        <!-- Photo column -->
        <v-col
          cols="12"
          md="5"
          class="mb-8 mb-md-0 d-flex justify-center justify-md-start"
          data-aos="fade-right"
        >
          <div class="about-photo-wrapper" style="width: 100%; max-width: 360px">
            <v-img
              :src="about.photo"
              :alt="about.photoAlt"
              :aspect-ratio="4/5"
              cover
              rounded="lg"
              style="border-radius: 12px"
            />
          </div>
        </v-col>

        <!-- Content column -->
        <v-col cols="12" md="7" class="pl-md-10" data-aos="fade-left">
          <div class="accent-line" />
          <h2 class="section-title">{{ about.sectionTitle }}</h2>

          <p
            v-for="(para, i) in about.paragraphs"
            :key="i"
            style="color: #4B5563; line-height: 1.8; font-size: 1.02rem; margin-bottom: 16px"
          >
            {{ para }}
          </p>

          <div class="mt-6">
            <div
              v-for="(hl, i) in about.highlights"
              :key="i"
              class="about-highlight"
            >
              <div
                style="
                  width: 38px;
                  height: 38px;
                  border-radius: 10px;
                  background: rgba(245,155,10,0.12);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-shrink: 0;
                "
              >
                <v-icon size="20" color="secondary">{{ hl.icon }}</v-icon>
              </div>
              <span style="font-weight: 600; color: #374151; font-size: 0.95rem">
                {{ hl.text }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Momentos: polaroids dele dentro e fora da obra -->
      <div class="about-moments" data-aos="fade-up">
        <span class="about-moments-title">{{ about.momentsTitle }}</span>
        <div class="about-moments-row">
          <figure
            v-for="(moment, i) in about.moments"
            :key="moment.src"
            class="about-polaroid"
            :style="{ '--rotate': moment.rotate + 'deg' }"
            data-aos="zoom-in"
            :data-aos-delay="100 + i * 100"
          >
            <img :src="moment.src" :alt="moment.caption" loading="lazy" />
            <figcaption>{{ moment.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </v-container>
  </section>
</template>
