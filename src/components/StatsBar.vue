<script setup>
import content from '../data/content.js'
const { stats } = content
</script>

<template>
  <section class="stats-bar">
    <v-container style="max-width: 1200px">
      <v-row justify="center" align="center">
        <v-col
          v-for="(stat, i) in stats"
          :key="i"
          cols="6"
          sm="3"
          class="text-center py-2"
          data-aos="zoom-in"
          :data-aos-delay="i * 80"
        >
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
