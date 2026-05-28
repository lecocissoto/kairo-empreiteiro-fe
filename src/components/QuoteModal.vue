<script setup>
import { ref, reactive, computed } from 'vue'
import content from '../data/content.js'
import { useWhatsApp } from '../composables/useWhatsApp.js'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const { quote } = content
const { sendQuote } = useWhatsApp()

const step = ref(1)
const error = ref('')
const form = reactive({
  services: [],
  sqm: '',
  description: '',
  name: '',
  phone: '',
})

const stepTitle = computed(() => quote.stepTitles[step.value - 1])
const stepSubtitle = computed(() => quote.stepSubtitles[step.value - 1])

function getStepClass(n) {
  if (step.value > n) return 'done'
  if (step.value === n) return 'active'
  return 'pending'
}

function getLineClass(n) {
  return step.value > n ? 'done' : 'pending'
}

function handleNext() {
  error.value = ''
  if (step.value === 1) {
    if (form.services.length === 0) {
      error.value = 'Selecione ao menos um serviço para continuar.'
      return
    }
    step.value = 2
    return
  }
  if (step.value === 2) {
    step.value = 3
    return
  }
  if (step.value === 3) {
    if (!form.name.trim()) {
      error.value = 'Informe seu nome para continuar.'
      return
    }
    sendQuote({ ...form })
    closeAndReset()
  }
}

function handleBack() {
  if (step.value > 1) {
    step.value--
    error.value = ''
  }
}

function closeAndReset() {
  emit('update:modelValue', false)
  setTimeout(() => {
    step.value = 1
    error.value = ''
    Object.assign(form, {
      services: [],
      sqm: '',
      description: '',
      name: '',
      phone: '',
    })
  }, 350)
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="580"
    persistent
    scrollable
  >
    <v-card style="border-radius: 16px !important; overflow: hidden">
      <!-- Header -->
      <div
        style="
          background: linear-gradient(135deg, #1E3A47 0%, #2E5266 100%);
          padding: 24px 24px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <h2
            style="
              font-family: Montserrat, sans-serif;
              font-weight: 800;
              font-size: 1.15rem;
              color: white;
              margin: 0 0 4px;
            "
          >
            {{ quote.title }}
          </h2>
          <p style="color: rgba(255,255,255,0.65); font-size: 0.82rem; margin: 0">
            Gratuito e sem compromisso
          </p>
        </div>
        <v-btn
          icon
          variant="text"
          size="small"
          style="color: rgba(255,255,255,0.7)"
          @click="closeAndReset"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <!-- Step indicator -->
      <div style="padding: 20px 24px 0">
        <div class="step-indicator">
          <div
            v-for="n in 3"
            :key="n"
            class="d-flex align-center"
            :style="n < 3 ? 'flex: 1' : ''"
          >
            <div :class="['step-dot', getStepClass(n)]">
              <v-icon v-if="step > n" size="14">mdi-check</v-icon>
              <span v-else>{{ n }}</span>
            </div>
            <div
              v-if="n < 3"
              :class="['step-line', getLineClass(n)]"
              style="flex: 1"
            />
          </div>
        </div>

        <!-- Step labels -->
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            padding: 0 2px;
          "
        >
          <span
            v-for="(label, i) in quote.stepLabels"
            :key="i"
            :style="{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: step === i + 1 ? '#1E3A47' : '#9CA3AF',
              transition: 'color 0.3s',
              flex: i === 1 ? '1' : 'none',
              textAlign: i === 1 ? 'center' : i === 2 ? 'right' : 'left',
            }"
          >
            {{ label }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <v-card-text style="padding: 20px 24px">
        <div class="mb-4">
          <h3
            style="
              font-family: Montserrat, sans-serif;
              font-weight: 700;
              font-size: 1rem;
              color: #1E3A47;
              margin-bottom: 4px;
            "
          >
            {{ stepTitle }}
          </h3>
          <p style="color: #6B7280; font-size: 0.85rem; margin: 0">{{ stepSubtitle }}</p>
        </div>

        <!-- Step 1: Services -->
        <div v-if="step === 1">
          <v-row>
            <v-col
              v-for="opt in quote.serviceOptions"
              :key="opt.id"
              cols="6"
            >
              <v-checkbox
                v-model="form.services"
                :value="opt.id"
                :label="opt.label"
                color="primary"
                density="comfortable"
                hide-details
                style="font-size: 0.9rem"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Step 2: Details -->
        <div v-else-if="step === 2" class="d-flex flex-column" style="gap: 16px">
          <v-text-field
            v-model="form.sqm"
            label="Área aproximada (m²)"
            type="number"
            min="1"
            prefix="m²"
            placeholder="Ex: 50"
            color="primary"
            hide-details="auto"
          >
            <template #prepend-inner>
              <v-icon size="18" color="primary">mdi-ruler-square</v-icon>
            </template>
          </v-text-field>

          <v-textarea
            v-model="form.description"
            label="Descreva o projeto"
            :placeholder="'Ex: Reforma completa de apartamento de 60m², incluindo banheiro, cozinha e dois quartos...'"
            rows="4"
            color="primary"
            hide-details="auto"
          />
        </div>

        <!-- Step 3: Contact -->
        <div v-else class="d-flex flex-column" style="gap: 16px">
          <v-text-field
            v-model="form.name"
            label="Seu nome completo"
            placeholder="Ex: João Silva"
            color="primary"
            required
            hide-details="auto"
          >
            <template #prepend-inner>
              <v-icon size="18" color="primary">mdi-account-outline</v-icon>
            </template>
          </v-text-field>

          <v-text-field
            v-model="form.phone"
            label="Seu WhatsApp (opcional)"
            type="tel"
            placeholder="Ex: (11) 98765-4321"
            color="primary"
            hide-details="auto"
          >
            <template #prepend-inner>
              <v-icon size="18" color="primary">mdi-whatsapp</v-icon>
            </template>
          </v-text-field>

          <div
            style="
              background: rgba(245,155,10,0.08);
              border: 1px solid rgba(245,155,10,0.25);
              border-radius: 10px;
              padding: 12px 14px;
              display: flex;
              align-items: flex-start;
              gap: 10px;
            "
          >
            <v-icon size="18" color="secondary" style="margin-top: 1px; flex-shrink: 0">mdi-information-outline</v-icon>
            <p style="font-size: 0.8rem; color: #6B7280; margin: 0; line-height: 1.6">
              Ao clicar em <strong>"Enviar via WhatsApp"</strong>, abriremos o WhatsApp com uma mensagem pré-preenchida com todos os detalhes do seu pedido para o Kairo.
            </p>
          </div>
        </div>

        <!-- Error message -->
        <v-alert
          v-if="error"
          type="error"
          variant="tonal"
          density="compact"
          class="mt-4"
          style="font-size: 0.85rem"
        >
          {{ error }}
        </v-alert>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions style="padding: 0 24px 24px; gap: 12px">
        <v-btn
          v-if="step > 1"
          variant="text"
          color="primary"
          class="font-weight-bold"
          @click="handleBack"
        >
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>

        <v-spacer />

        <v-btn
          color="primary"
          size="large"
          class="font-weight-bold px-6"
          style="min-width: 160px"
          @click="handleNext"
        >
          <template v-if="step < 3">
            Continuar
            <v-icon end>mdi-arrow-right</v-icon>
          </template>
          <template v-else>
            <v-icon start>mdi-whatsapp</v-icon>
            Enviar via WhatsApp
          </template>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
