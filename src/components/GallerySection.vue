<script setup>
import { ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import content from '../data/content.js'

const { gallery } = content

const activeTab = ref(0)
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)
const lightboxImgs = ref([])

const scrollRefs = ref({})

function setScrollRef(index, el) {
  if (el) scrollRefs.value[index] = el
}

function scrollLeft(index) {
  scrollRefs.value[index]?.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollRight(index) {
  scrollRefs.value[index]?.scrollBy({ left: 300, behavior: 'smooth' })
}

function openLightbox(catIndex, photoIndex) {
  lightboxImgs.value = gallery.categories[catIndex].photos.map(p => ({
    src: p.src,
    title: p.alt,
  }))
  lightboxIndex.value = photoIndex
  lightboxVisible.value = true
}
</script>

<template>
  <section class="section-padding gallery-section" id="galeria">
    <v-container style="max-width: 1200px">
      <div class="text-center mb-8" data-aos="fade-up">
        <div class="accent-line mx-auto" />
        <h2 class="section-title section-title--light">{{ gallery.sectionTitle }}</h2>
        <p class="section-subtitle section-subtitle--light">{{ gallery.sectionSubtitle }}</p>
      </div>

      <!-- Category tabs -->
      <v-tabs
        v-model="activeTab"
        class="gallery-tabs mb-6"
        align-tabs="center"
        slider-color="secondary"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <v-tab
          v-for="(cat, i) in gallery.categories"
          :key="cat.id"
          :value="i"
        >
          {{ cat.label }}
        </v-tab>
      </v-tabs>

      <!-- Gallery per category -->
      <div
        v-for="(cat, catIndex) in gallery.categories"
        :key="cat.id"
        v-show="activeTab === catIndex"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div class="gallery-scroll-wrap">
          <!-- Left arrow -->
          <button
            class="gallery-arrow gallery-arrow-left d-none d-sm-flex"
            @click="scrollLeft(catIndex)"
            aria-label="Rolar para esquerda"
          >
            <v-icon size="20">mdi-chevron-left</v-icon>
          </button>

          <!-- Scrollable photos -->
          <div
            :ref="el => setScrollRef(catIndex, el)"
            class="gallery-scroll"
          >
            <div
              v-for="(photo, photoIndex) in cat.photos"
              :key="photo.src"
              class="gallery-item"
              @click="openLightbox(catIndex, photoIndex)"
            >
              <img
                :src="photo.src"
                :alt="photo.alt"
                loading="lazy"
              />
              <div class="gallery-item-overlay">
                <v-icon class="gallery-zoom-icon" size="32">mdi-magnify-plus-outline</v-icon>
              </div>
            </div>
          </div>

          <!-- Right arrow -->
          <button
            class="gallery-arrow gallery-arrow-right d-none d-sm-flex"
            @click="scrollRight(catIndex)"
            aria-label="Rolar para direita"
          >
            <v-icon size="20">mdi-chevron-right</v-icon>
          </button>
        </div>

        <!-- Photo count -->
        <div class="text-center mt-4">
          <span style="color: rgba(255,255,255,0.45); font-size: 0.8rem">
            {{ cat.photos.length }} foto{{ cat.photos.length !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>
    </v-container>

    <!-- Lightbox -->
    <VueEasyLightbox
      :visible="lightboxVisible"
      :imgs="lightboxImgs"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
    />
  </section>
</template>
