<script setup>
import { useWhatsApp } from '../composables/useWhatsApp.js'
const { openDirect } = useWhatsApp()
</script>

<template>
  <v-tooltip location="left" text="Falar no WhatsApp">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="whatsapp-float"
        icon
        @click="openDirect"
        aria-label="Falar com Kairo no WhatsApp"
      >
        <v-icon size="28" style="color: white">mdi-whatsapp</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>
